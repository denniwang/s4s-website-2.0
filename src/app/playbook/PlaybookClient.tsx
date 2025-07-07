"use client";

import { useState } from "react";
import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BookOpen, ArrowRight, Calendar } from "lucide-react";
import { ArticleData } from "./utils/articles";
import EmailCaptureModal from "./components/EmailCaptureModal";

interface PlaybookClientProps {
  articles: ArticleData[];
}

export default function PlaybookClient({ articles }: PlaybookClientProps) {
  const [showEmailModal, setShowEmailModal] = useState(false);

  // Use the date string as-is
  const formatDate = (dateString: string) => dateString;

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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Hero Section */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <div className="flex justify-center mb-6">
              <div className="p-3 bg-blue-100 rounded-full">
                <BookOpen className="h-8 w-8 text-blue-600" />
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              The S4S Playbook
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              Your comprehensive guide to college admissions success. Written by students who got into top universities, 
              for students who want to do the same.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
                Start Reading
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                onClick={handleGetPlaybookClick}
              >
                Download Full PDF
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Articles Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {articles.map((article) => (
            <Link href={`/playbook/${article.id}`} key={article.id}>
              <Card className="hover:shadow-lg transition-shadow duration-300">
                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-500 flex items-center">
                      <Calendar className="h-4 w-4 mr-1" />
                      {article.date ? formatDate(article.date) : 'July 2025'}
                    </span>
                  </div>
                  <CardTitle className="text-xl font-bold text-gray-900 mb-2">
                    {article.title}
                  </CardTitle>
                  <CardDescription className="text-gray-600">
                    {article.description}
                  </CardDescription>
                </CardHeader>
                  <Button variant="ghost" className="p-0 h-auto w-auto text-blue-600 ">
                    Read More
                    <ArrowRight className="h-4 w-4 ml-1" />
                  </Button>
              </Card>
            </Link>
          ))}
        </div>

        {/* Call to Action */}
        <div className="mt-16 text-center">
          <Card className="max-w-2xl mx-auto bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold mb-4">
                Want the Complete Playbook?
              </h3>
              <p className="text-blue-100 mb-6">
                Get our full 50+ page PDF guide with exclusive content, templates, and checklists 
                that aren&apos;t available online.
              </p>
              <Button 
                size="lg" 
                variant="secondary"
                className="bg-white text-blue-600 hover:bg-gray-100"
                onClick={handleGetPlaybookClick}
              >
                Get Full Playbook PDF
              </Button>
            </CardContent>
          </Card>
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