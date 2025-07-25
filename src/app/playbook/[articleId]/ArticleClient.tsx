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
}

export default function ArticleClient({ article }: Props) {
  const [showEmailModal, setShowEmailModal] = useState(false);

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
          <div 
            className="prose prose-lg max-w-none"
            dangerouslySetInnerHTML={{ __html: renderMarkdown(article.content) }}
          />
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
            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <h4 className="text-lg font-semibold text-gray-900 mb-2">
                  The Ultimate College Application Timeline
                </h4>
                <p className="text-gray-600 mb-4">
                  A month-by-month guide to staying organized and ahead of deadlines throughout your college application journey.
                </p>
                <Link href="/playbook/application-timeline">
                  <Button variant="ghost" className="p-0 h-auto text-blue-600 hover:text-blue-700">
                    Read More →
                  </Button>
                </Link>
              </CardContent>
            </Card>
            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <h4 className="text-lg font-semibold text-gray-900 mb-2">
                  Navigating Financial Aid: Scholarships, Grants, and More
                </h4>
                <p className="text-gray-600 mb-4">
                  Everything you need to know about securing financial aid and making college affordable.
                </p>
                <Link href="/playbook/financial-aid-guide">
                  <Button variant="ghost" className="p-0 h-auto text-blue-600 hover:text-blue-700">
                    Read More →
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Email Capture Modal */}
      <EmailCaptureModal 
        isOpen={showEmailModal}
        onClose={() => setShowEmailModal(false)}
        onSubmit={handleEmailSubmit}
      />
    </div>
  );
} 