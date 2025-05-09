'use client';

import type React from 'react';

import { forwardRef, useState, useRef } from 'react';
import { sendEmail, type EmailResponse } from '@/app/actions/email';

const Contact = forwardRef<HTMLDivElement>((props, ref) => {
  // Contact form state
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formStatus, setFormStatus] = useState<null | EmailResponse>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const formRef = useRef<HTMLFormElement>(null);

  // Validate individual fields
  const validateField = (field: string, value: string) => {
    const errors: Record<string, string> = {};

    if (field === 'name' && !value.trim()) {
      errors.name = 'Name is required';
    }

    if (field === 'email') {
      if (!value.trim()) {
        errors.email = 'Email is required';
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
        errors.email = 'Please enter a valid email address';
      }
    }

    if (field === 'message' && value.trim().length < 10) {
      errors.message = 'Message must be at least 10 characters';
    }

    setFieldErrors(prev => ({ ...prev, ...errors }));
    return Object.keys(errors).length === 0;
  };

  // Handle field changes with validation
  const handleFieldChange = (field: string, value: string) => {
    switch (field) {
      case 'name':
        setName(value);
        break;
      case 'email':
        setEmail(value);
        break;
      case 'message':
        setMessage(value);
        break;
    }
    validateField(field, value);
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFieldErrors({});

    // Validate all fields
    const nameValid = validateField('name', name);
    const emailValid = validateField('email', email);
    const messageValid = validateField('message', message);

    if (!nameValid || !emailValid || !messageValid) {
      setFormStatus({
        success: false,
        message: 'Please fix the errors in the form before submitting.',
      });
      return;
    }

    try {
      setIsSubmitting(true);
      setFormStatus(null);

      const form = e.currentTarget;
      const formData = new FormData(form);
      const response = await sendEmail(formData);

      setFormStatus(response);

      if (response.success) {
        setName('');
        setEmail('');
        setMessage('');
        setFieldErrors({});

        setTimeout(() => {
          setFormStatus(null);
        }, 5000);
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setFormStatus({
        success: false,
        message: 'An unexpected error occurred. Please try again later.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div ref={ref} className="min-h-screen bg-black px-6 py-24 animate-fade-in-delayed">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold mb-8 bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
          Contact
        </h2>

        <div className="mt-12">
          <form ref={formRef} role="form" onSubmit={handleSubmit} className="space-y-8">
            <div className="space-y-6">
              {/* Name field */}
              <div>
                <label htmlFor="name" className="block text-lg font-medium mb-2">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={name}
                  onChange={e => handleFieldChange('name', e.target.value)}
                  className={`w-full px-4 py-3 bg-black border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 ${
                    fieldErrors.name ? 'border-red-500' : 'border-gray-800'
                  }`}
                  placeholder="Your name"
                  required
                  disabled={isSubmitting}
                />
                {fieldErrors.name && (
                  <p className="mt-2 text-sm text-red-500">{fieldErrors.name}</p>
                )}
              </div>

              {/* Email field */}
              <div>
                <label htmlFor="email" className="block text-lg font-medium mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={email}
                  onChange={e => handleFieldChange('email', e.target.value)}
                  className={`w-full px-4 py-3 bg-black border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 ${
                    fieldErrors.email ? 'border-red-500' : 'border-gray-800'
                  }`}
                  placeholder="your.email@example.com"
                  required
                  disabled={isSubmitting}
                />
                {fieldErrors.email && (
                  <p className="mt-2 text-sm text-red-500">{fieldErrors.email}</p>
                )}
              </div>

              {/* Message field */}
              <div>
                <label htmlFor="message" className="block text-lg font-medium mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={message}
                  onChange={e => handleFieldChange('message', e.target.value)}
                  rows={6}
                  className={`w-full px-4 py-3 bg-black border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 resize-none ${
                    fieldErrors.message ? 'border-red-500' : 'border-gray-800'
                  }`}
                  placeholder="Your message..."
                  required
                  disabled={isSubmitting}
                ></textarea>
                {fieldErrors.message && (
                  <p className="mt-2 text-sm text-red-500">{fieldErrors.message}</p>
                )}
              </div>

              {/* Honeypot field (anti-spam) - hidden from users */}
              <div className="hidden">
                <input type="text" name="website" id="website" tabIndex={-1} autoComplete="off" />
              </div>
            </div>

            {/* Submit button */}
            <div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 rounded-lg text-lg font-medium transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-black disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <span className="flex items-center">
                    <svg
                      className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Sending...
                  </span>
                ) : (
                  'Send Message'
                )}
              </button>
            </div>

            {/* Form status messages */}
            {formStatus && (
              <div
                className={`p-4 bg-gradient-to-r ${
                  formStatus.success
                    ? 'from-purple-900/30 to-pink-900/30 border border-green-500'
                    : 'from-red-900/30 to-pink-900/30 border border-red-500'
                } rounded-lg`}
              >
                <p className={formStatus.success ? 'text-green-400' : 'text-red-400'}>
                  {formStatus.message}
                </p>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
});

Contact.displayName = 'Contact';

export default Contact;
