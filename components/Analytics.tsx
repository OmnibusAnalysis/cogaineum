'use client';

import type React from 'react';

import { useEffect } from 'react';
import Script from 'next/script';

interface GtagEvent {
  event_category: string;
  event_label: string;
  value?: number;
}

declare global {
  interface Window {
    gtag: (command: string, ...args: (string | GtagEvent)[]) => void;
    dataLayer: unknown[];
  }
}

export default function Analytics() {
  useEffect(() => {
    // Track custom events
    const trackEvent = (action: string, category: string, label: string, value?: number) => {
      window.gtag('event', action, {
        event_category: category,
        event_label: label,
        ...(value !== undefined && { value }),
      });
    };

    // Track form submissions
    const handleFormSubmit = (e: SubmitEvent) => {
      const form = e.target as HTMLFormElement;
      if (form.id) {
        trackEvent('form_submit', 'form', form.id);
      }
    };

    // Track button clicks
    const handleButtonClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const button = target.closest('button');
      if (button?.id) {
        trackEvent('button_click', 'button', button.id);
      }
    };

    // Add event listeners
    document.addEventListener('submit', handleFormSubmit);
    document.addEventListener('click', handleButtonClick);

    // Cleanup
    return () => {
      document.removeEventListener('submit', handleFormSubmit);
      document.removeEventListener('click', handleButtonClick);
    };
  }, []);

  return (
    <>
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID}`}
      />
      <Script
        id="google-analytics"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID}', {
              page_path: window.location.pathname,
            });
          `,
        }}
      />
    </>
  );
}
