import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const articlesDirectory = path.join(process.cwd(), 'src/app/playbook/articles');

export interface TableOfContentsItem {
  id: string;
  title: string;
  level: number;
}

export interface MentorTip {
  id: string;
  section: string;
  content: string;
  title?: string;
}

export interface ArticleData {
  id: string;
  title: string;
  description: string;
  date: string;
  readTime: string;
  content: string;
  premium?: boolean;
  tableOfContents?: TableOfContentsItem[];
  mentorTips?: MentorTip[];
}

function generateTableOfContents(content: string): TableOfContentsItem[] {
  const headingRegex = /^(#{2,4})\s+(.+)$/gm;
  const toc: TableOfContentsItem[] = [];
  let match;

  while ((match = headingRegex.exec(content)) !== null) {
    const level = match[1].length;
    const title = match[2].trim();
    const id = title.toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .replace(/^-|-$/g, '');

    toc.push({
      id,
      title,
      level
    });
  }

  return toc;
}

function extractMentorTips(content: string, frontmatter: any): { tips: MentorTip[], cleanContent: string } {
  const mentorTips: MentorTip[] = [];
  let cleanContent = content;
  
  // Extract from frontmatter if available (legacy support)
  if (frontmatter.mentorTips && Array.isArray(frontmatter.mentorTips)) {
    frontmatter.mentorTips.forEach((tip: any, index: number) => {
      mentorTips.push({
        id: `tip-${index}`,
        section: tip.section || '',
        content: tip.content || '',
        title: tip.title
      });
    });
  }

  // Extract embedded mentor tips using syntax: [MENTOR_TIP: title | content]
  const mentorTipRegex = /\[MENTOR_TIP:\s*([^|]+)\s*\|\s*([^\]]+)\]/g;
  let match;
  let tipIndex = mentorTips.length;

  while ((match = mentorTipRegex.exec(content)) !== null) {
    const title = match[1].trim();
    const tipContent = match[2].trim();
    
    mentorTips.push({
      id: `tip-${tipIndex}`,
      section: '', // Will be determined by position in content
      content: tipContent,
      title: title
    });
    
    // Replace tip with placeholder that includes the tip content for mobile rendering
    const tipHtml = `
      <div class="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-r-lg my-4">
        <div class="flex items-start mb-3">
          <div class="w-4 h-4 text-yellow-500 mr-2 mt-1 flex-shrink-0">💡</div>
          <div class="flex-1">
            ${title ? `<h4 class="font-medium text-yellow-800 text-sm mb-2">${title}</h4>` : ''}
          </div>
        </div>
        <p class="text-sm text-yellow-700 leading-relaxed">${tipContent}</p>
      </div>
    `;
    cleanContent = cleanContent.replace(match[0], `<mentor-tip-placeholder data-tip-id="tip-${tipIndex}">${tipHtml}</mentor-tip-placeholder>`);
    tipIndex++;
  }

  return { tips: mentorTips, cleanContent };
}

export function getAllArticleIds(): string[] {
  const fileNames = fs.readdirSync(articlesDirectory);
  return fileNames.map((fileName) => fileName.replace(/\.md$/, ''));
}

export function getArticleData(id: string): ArticleData | null {
  try {
    const fullPath = path.join(articlesDirectory, `${id}.md`);
    const fileContents = fs.readFileSync(fullPath, 'utf8');

    // Use gray-matter to parse the post metadata section
    const matterResult = matter(fileContents);

    // Extract title from the first heading
    const titleMatch = matterResult.content.match(/^# (.+)$/m);
    const title = titleMatch ? titleMatch[1] : id;

    // Extract date and read time from the first line
    const dateMatch = matterResult.content.match(/Last updated on (.+?) • (.+?) read/);
    const date = dateMatch ? dateMatch[1] : 'July 2025';
    const readTime = dateMatch ? dateMatch[2] : '10 min';
    
    // Generate excerpt from first paragraph
    const paragraphs = matterResult.content.split('\n\n');

    // Generate description from excerpt
    const description = paragraphs[2].substring(0, 130) + '...' || `Read our comprehensive guide on ${title.toLowerCase()}.`;

    // Check if article is premium (from frontmatter)
    const premium = matterResult.data.premium || false;

    // Extract mentor tips and get clean content
    const { tips: mentorTips, cleanContent } = extractMentorTips(matterResult.content, matterResult.data);

    // Generate table of contents from clean content
    const tableOfContents = generateTableOfContents(cleanContent);

    return {
      id,
      title,
      description,
      date,
      readTime,
      content: cleanContent,
      premium,
      tableOfContents,
      mentorTips,
    };
  } catch (error) {
    console.error(`Error reading article ${id}:`, error);
    return null;
  }
}

export function getAllArticles(): ArticleData[] {
  const articleIds = getAllArticleIds();
  const articles = articleIds
    .map((id) => getArticleData(id))
    .filter((article): article is ArticleData => article !== null)
    .sort((a, b) => a.title.localeCompare(b.title));

  return articles;
}

export function getRelatedArticles(currentArticleId: string, limit: number = 2): ArticleData[] {
  const allArticles = getAllArticles();
  return allArticles
    .filter(article => article.id !== currentArticleId)
    .slice(0, limit);
} 