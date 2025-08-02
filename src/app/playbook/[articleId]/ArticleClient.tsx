"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

import { ArrowLeft, Calendar, Download, Mail } from "lucide-react";
import { ArticleData } from "../utils/articles";
import EmailCaptureModal from "../components/EmailCaptureModal";

interface Props {
  article: ArticleData;
  relatedArticles: ArticleData[];
}

export default function ArticleClient({ article, relatedArticles }: Props) {
  const [showEmailModal, setShowEmailModal] = useState(false);
  const [showPremiumModal, setShowPremiumModal] = useState(false);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  // Convert markdown to HTML (improved version)
  const renderMarkdown = (content: string) => {
    let html = content;
    
    // Remove the first line with date and read time
    html = html.replace(/^\*Published on .+?\*/, '');
    
    // Headers
    html = html.replace(/^# (.+)$/gm, '<h1 class="text-3xl font-bold text-gray-900 mb-6">$1</h1>');
    html = html.replace(/^## (.+)$/gm, '<h2 class="text-2xl font-bold text-gray-900 mt-8 mb-4">$1</h2>');
    html = html.replace(/^### (.+)$/gm, '<h3 class="text-xl font-bold text-gray-900 mt-6 mb-3">$1</h3>');
    
    // Bold and italic
    html = html.replace(/\*\*(.+?)\*\*/g, '<strong class="font-semibold">$1</strong>');
    html = html.replace(/\*(.+?)\*/g, '<em class="italic">$1</em>');
    
    // Lists - convert markdown lists to HTML
    // First, convert markdown list items to li elements
    html = html.replace(/^- (.+)$/gm, '<li class="ml-4 mb-1">$1</li>');
    // Then wrap li elements in ul tags (simplified approach)
    html = html.replace(/<li[^>]*>.*?<\/li>/g, (match) => {
      return `<ul class="list-disc ml-6 mb-4">${match}</ul>`;
    });
    
    // Links
    html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" class="text-blue-600 hover:text-blue-700 underline">$1</a>');
    
    // Paragraphs
    html = html.replace(/\n\n/g, '</p><p class="mb-4 text-gray-700 leading-relaxed">');
    
    // Wrap remaining text in paragraphs
    html = html.replace(/^([^<].+)$/gm, (match) => {
      if (match.trim() === '') return '';
      return `<p class="mb-4 text-gray-700 leading-relaxed">${match}</p>`;
    });
    
    // Clean up empty paragraphs
    html = html.replace(/<p class="mb-4 text-gray-700 leading-relaxed"><\/p>/g, '');
    html = html.replace(/<p><\/p>/g, '');
    
    return html;
  };

  const handleEmailSubmit = (email: string) => {
    // Here you would typically send the email to your backend
    console.log('Email captured:', email);
    setShowEmailModal(false);
    // You could also trigger a download of the PDF here
  };

  const handleGetPlaybookClick = () => {
    console.log('Opening email modal...');
    setShowEmailModal(true);
  };

  const handlePremiumArticleClick = () => {
    setShowPremiumModal(true);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <div className="bg-white border-b">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link href="/playbook" className="inline-flex items-center text-blue-600 hover:text-blue-700">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Playbook
          </Link>
        </div>
      </div>

      {/* Article Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <article className="bg-white rounded-lg shadow-sm p-8">
          {/* Article Header */}
          <header className="mb-8">
            <div className="flex items-center text-sm text-gray-500 mb-4">
              <span className="flex items-center mr-6">
                <Calendar className="h-4 w-4 mr-1" />
                {formatDate(article.date)}
              </span>
            </div>
          </header>

          {/* Article Body */}
          <div className="prose prose-lg max-w-none">
            {article.premium ? (
              <>
                {/* Sticky Premium Overlay */}
                <div className="sticky top-[30vh] z-10 mb-8 ">
                  <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg shadow-lg p-6">
                    <div className="text-center">
                      <div className="mb-4">
                        <div className="w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-4">
                          <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                          </svg>
                        </div>
                      </div>
                      <h3 className="text-xl font-bold mb-2">
                        Premium Content
                      </h3>
                      <p className="text-blue-100 mb-6 max-w-md mx-auto">
                        This article is part of our premium content. Enter your email to unlock the full article and get access to our complete playbook.
                      </p>
                      <Button 
                        onClick={handlePremiumArticleClick}
                        size="lg"
                        className="bg-white text-blue-600 hover:bg-gray-100"
                      >
                        <Mail className="h-4 w-4 mr-2" />
                        Unlock Article
                      </Button>
                    </div>
                  </div>
                </div>
                
                {/* Blurred Content */}
                <div 
                  className="blur-sm pointer-events-none opacity-50"
                  dangerouslySetInnerHTML={{ __html: renderMarkdown(article.content.substring(0, 500) + '...') }}
                />
              </>
            ) : (
              <div 
                dangerouslySetInnerHTML={{ __html: renderMarkdown(article.content) }}
              />
            )}
          </div>
        </article>

        {/* Email Capture Section */}
        <div className="mt-12">
          <Card className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
            <CardContent className="p-8 text-center">
              <div className="flex justify-center mb-4">
                <div className="p-3 bg-white bg-opacity-20 rounded-full">
                  <Download className="h-8 w-8" />
                </div>
              </div>
              <h3 className="text-2xl font-bold mb-4">
                Get the Complete S4S Playbook
              </h3>
                              <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
                  You&apos;ve just read one of our articles. Get our full 50+ page PDF playbook with 
                  exclusive content, templates, checklists, and strategies that aren&apos;t available online.
                </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
                <Button 
                  onClick={handleGetPlaybookClick}
                  size="lg" 
                  variant="secondary"
                  className="bg-white text-blue-600 hover:bg-gray-100"
                >
                  <Mail className="h-4 w-4 mr-2" />
                  Get Full Playbook
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Related Articles */}
        <div className="mt-12">
          <h3 className="text-2xl font-bold text-gray-900 mb-6">Continue Reading</h3>
          <div className="grid gap-6 md:grid-cols-2">
            {relatedArticles.map((relatedArticle) => (
              <Card key={relatedArticle.id} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="text-lg font-semibold text-gray-900">
                      {relatedArticle.title}
                    </h4>
                    {relatedArticle.premium && (
                      <div className="flex items-center text-xs text-blue-600 bg-blue-50 px-2 py-1 rounded-full">
                        <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                        </svg>
                        Premium
                      </div>
                    )}
                  </div>
                  <p className="text-gray-600 mb-4">
                    {relatedArticle.description}
                  </p>
                  <Link href={`/playbook/${relatedArticle.id}`}>
                    <Button variant="ghost" className="p-0 h-auto text-blue-600 hover:text-blue-700">
                      Read More →
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Email Capture Modal */}
      <EmailCaptureModal 
        isOpen={showEmailModal}
        onClose={() => setShowEmailModal(false)}
        onSubmit={handleEmailSubmit}
      />

      {/* Premium Article Modal */}
      <EmailCaptureModal 
        isOpen={showPremiumModal}
        onClose={() => setShowPremiumModal(false)}
        onSubmit={(email) => {
          handleEmailSubmit(email);
          setShowPremiumModal(false);
        }}
        title="Unlock Premium Article"
        description="Enter your email to unlock this premium article and get access to our complete playbook with exclusive content."
      />
    </div>
  );
} 