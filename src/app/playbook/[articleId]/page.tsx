import { Metadata } from "next";
import { notFound } from "next/navigation";
import ArticleClient from "./ArticleClient";
import { getArticleData, getAllArticleIds } from "../utils/articles";

interface Props {
  params: Promise<{
    articleId: string;
  }>;
}

export async function generateStaticParams() {
  const articleIds = getAllArticleIds();
  return articleIds.map((id) => ({
    articleId: id,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { articleId } = await params;
  const article = getArticleData(articleId);
  
  if (!article) {
    return {
      title: "Article Not Found",
    };
  }

  return {
    title: `${article.title} | S4S Playbook`,
    description: article.description,
    openGraph: {
      title: article.title,
      description: article.description,
      url: `https://trys4s.com/playbook/${articleId}`,
    },
  };
}

export default async function ArticlePage({ params }: Props) {
  const { articleId } = await params;
  const article = getArticleData(articleId);

  if (!article) {
    notFound();
  }

  return <ArticleClient article={article} />;
} 