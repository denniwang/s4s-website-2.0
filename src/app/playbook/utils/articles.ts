import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const articlesDirectory = path.join(process.cwd(), 'src/app/playbook/articles');

export interface ArticleData {
  id: string;
  title: string;
  description: string;
  date: string;
  readTime: string;
  content: string;
  premium?: boolean;
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

    return {
      id,
      title,
      description,
      date,
      readTime,
      content: matterResult.content,
      premium,
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