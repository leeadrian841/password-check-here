import React from 'react';
import { Shield, Globe } from 'lucide-react';

// LinkedIn icon from Simple Icons (https://simpleicons.org/)
const LinkedinIcon = ({ className }) => (
  <svg 
    role="img" 
    viewBox="0 0 24 24" 
    fill="currentColor"
    className={className}
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
  </svg>
);

export const Footer = () => {
  return (
    <footer className="border-t border-border/40 bg-muted/30 py-12 px-4 mt-16">
      <div className="container mx-auto max-w-6xl">
        <div className="grid gap-8 md:grid-cols-2">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-lg">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-foreground">PasswordCheckHere</h3>
                <p className="text-xs text-muted-foreground">Security First</p>
              </div>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Advanced password strength checker. Check your passwords securely and privately in your browser.
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-foreground mb-4">Privacy & Security</h4>
            <p className="text-sm text-muted-foreground leading-relaxed mb-4">
              Everything happens in your browser. No passwords are stored or transmitted to any server. Your data remains 100% private.
            </p>
            <div className="flex gap-3">
              <a href="https://leeadrian841.github.io/" className="w-10 h-10 rounded-lg bg-muted hover:bg-primary/10 flex items-center justify-center transition-colors group">
                <Globe className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
              </a>
              <a href="https://www.linkedin.com/in/leeadrian841/" className="w-10 h-10 rounded-lg bg-muted hover:bg-primary/10 flex items-center justify-center transition-colors group">
                <LinkedinIcon className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-border/40 mt-8 pt-8 text-center text-sm text-muted-foreground">
          <p>© 2026 PasswordCheckHere. Built with security in mind. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
