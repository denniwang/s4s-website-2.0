"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Download, Mail, CheckCircle } from "lucide-react";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSubmit?: (email: string) => void;
  title?: string;
  description?: string;
}

export default function EmailCaptureModal({ isOpen, onClose, onSubmit, title, description }: Props) {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address");
      return;
    }

    setIsSubmitting(true);

    try {
      // Collect metadata
      const page = window.location.pathname;
      const userAgent = navigator.userAgent;
      const referrer = document.referrer;
      // Send to API
      const res = await fetch("/api/submit-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, page, userAgent, referrer }),
      });
      const data = await res.json();
      if (!data.success) throw new Error(data.error || "Unknown error");
      if (onSubmit) onSubmit(email);
      setIsSubmitted(true);
      setTimeout(() => {
        setIsSubmitted(false);
        setEmail("");
        onClose();
      }, 3000);
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err));
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    if (!isSubmitting) {
      setEmail("");
      setError("");
      setIsSubmitted(false);
      onClose();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center">
            {isSubmitted ? (
              <div className="flex items-center justify-center">
                <CheckCircle className="h-6 w-6 text-green-600 mr-2" />
                Success!
              </div>
            ) : (
              <div className="flex items-center justify-center">
                <Download className="h-6 w-6 text-blue-600 mr-2" />
                {title || "Get Your Free Playbook"}
              </div>
            )}
          </DialogTitle>
        </DialogHeader>

        {isSubmitted ? (
          <div className="text-center py-6">
            <div className="mb-4">
              <CheckCircle className="h-16 w-16 text-green-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Check Your Email!
              </h3>
              <p className="text-gray-600">
                We&apos;ve sent the complete S4S Playbook to <strong>{email}</strong>
              </p>
            </div>
            <div className="bg-blue-50 p-4 rounded-lg">
              <p className="text-sm text-blue-800">
                💡 <strong>Pro tip:</strong> Check your spam folder if you don&apos;t see it in your inbox.
              </p>
            </div>
          </div>
        ) : (
          <div className="py-6">
            <Card className="mb-6">
              <CardContent className="p-4">
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                      <Download className="h-5 w-5 text-blue-600" />
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Complete S4S Playbook</h4>
                    <p className="text-sm text-gray-600 mt-1">
                      {description || "50+ pages of exclusive content, templates, and strategies"}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="email" className="text-sm font-medium text-gray-700">
                  Email Address
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
                  placeholder="your.email@example.com"
                  className="mt-1"
                  required
                  disabled={isSubmitting}
                />
                {error && (
                  <p className="text-red-600 text-sm mt-1">{error}</p>
                )}
              </div>

              <Button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700"
                disabled={isSubmitting || !email}
              >
                {isSubmitting ? (
                  <div className="flex items-center">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Sending...
                  </div>
                ) : (
                  <div className="flex items-center">
                    <Mail className="h-4 w-4 mr-2" />
                    Get Free Playbook
                  </div>
                )}
              </Button>
            </form>

            <div className="mt-4 text-center">
              <p className="text-xs text-gray-500">
                By downloading, you agree to receive occasional updates from S4S. 
                We respect your privacy and will never spam you.
              </p>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
} 