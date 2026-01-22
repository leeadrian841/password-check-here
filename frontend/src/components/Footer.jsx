import React from 'react';
import { Shield, Github, Linkedin, Globe } from 'lucide-react';

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
                <Linkedin className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
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
