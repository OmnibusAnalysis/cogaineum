'use client';

import { useState, useEffect } from 'react';
import type { FC } from 'react';

interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

const ModernContact: FC = () => {
  const [mounted, setMounted] = useState(false);
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      // Simulate form submission
      await new Promise(resolve => setTimeout(resolve, 1000));
      setSubmitStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (_error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!mounted) return null;

  return (
    <div className="py-24 px-6 gradient-bg-dark">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-light gradient-text-animated mb-6">
            Contact
          </h2>
          <div className="w-24 h-px gradient-bg mx-auto mb-8"></div>
          <p className="text-slate-400 max-w-2xl mx-auto">
            Ready to collaborate or discuss a project? Let&apos;s connect and explore creative possibilities.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16">
          {/* Contact Information */}
          <div className="space-y-12">
            <div>
              <h3 className="text-2xl font-light gradient-text-animated mb-8">
                Get in Touch
              </h3>
              
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 gradient-card flex items-center justify-center flex-shrink-0 rounded">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-white font-medium mb-1 gradient-text">Email</h4>
                    <p className="text-slate-400">hello@cogaineum.art</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 gradient-card flex items-center justify-center flex-shrink-0 rounded">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-white font-medium mb-1 gradient-text">Location</h4>
                    <p className="text-slate-400">Digital Realm</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 gradient-card flex items-center justify-center flex-shrink-0 rounded">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-white font-medium mb-1 gradient-text">Response Time</h4>
                    <p className="text-slate-400">Within 24 hours</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="gradient-card p-6 rounded-lg">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium gradient-text mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 text-white focus:outline-none focus:border-orange-400 transition-colors rounded"
                    placeholder="Your name"
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium gradient-text mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 text-white focus:outline-none focus:border-orange-400 transition-colors rounded"
                    placeholder="your@email.com"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="subject" className="block text-sm font-medium gradient-text mb-2">
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 text-white focus:outline-none focus:border-orange-400 transition-colors rounded"
                  placeholder="Project inquiry, collaboration, etc."
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium gradient-text mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  rows={6}
                  className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 text-white focus:outline-none focus:border-orange-400 transition-colors resize-none rounded"
                  placeholder="Tell me about your project or idea..."
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full px-8 py-4 gradient-button font-medium transition-all duration-200 rounded ${
                  isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              >
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </button>

              {submitStatus === 'success' && (
                <p className="text-green-400 text-center">Message sent successfully!</p>
              )}
              {submitStatus === 'error' && (
                <p className="text-red-400 text-center">Failed to send message. Please try again.</p>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModernContact;