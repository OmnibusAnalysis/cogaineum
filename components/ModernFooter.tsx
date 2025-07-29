'use client';

import { useState, useEffect } from 'react';
import type { FC } from 'react';

const ModernFooter: FC = () => {
  const [mounted, setMounted] = useState(false);
  const currentYear = new Date().getFullYear();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <footer className="bg-slate-950 border-t border-slate-800 py-16">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* Brand Section */}
          <div className="space-y-4">
            <h3 className="text-2xl font-light text-white">
              Cogaineum
            </h3>
            <p className="text-slate-400 leading-relaxed max-w-sm">
              Where artistic vision meets digital innovation. Creating works that challenge 
              conventions and celebrate individual expression.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="font-medium text-white">Quick Links</h4>
            <ul className="space-y-2">
              {[
                { label: 'About', href: '#about' },
                { label: 'Portfolio', href: '#portfolio' },
                { label: 'Contact', href: '#contact' },
                { label: 'Monopowerly', href: '/monopowerly_image_set' },
              ].map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-slate-400 hover:text-white transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Philosophy */}
          <div className="space-y-4">
            <h4 className="font-medium text-white">Philosophy</h4>
            <p className="text-slate-400 text-sm leading-relaxed">
              Anti-corporate. Pro-individual. Celebrating the absurdity and vibrancy of life 
              through face-to-face interaction and authentic artistic expression.
            </p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-slate-800 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-slate-500 text-sm">
            © {currentYear} Robert Maxwell Remlinger. All rights reserved.
          </p>
          
          <div className="text-sm text-slate-500">
            Made with passion in Cincinnati, OH
          </div>
        </div>
      </div>
    </footer>
  );
};

export default ModernFooter;