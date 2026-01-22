import React from 'react';
import { Shield, Moon, Sun } from 'lucide-react';
import { Button } from './ui/button';

export const Header = ({ isDark, toggleTheme }) => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-border/40 bg-background/80 backdrop-blur-md">
      <div className="container mx-auto max-w-6xl px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-lg">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-foreground">PasswordCheckHere</h1>
              <p className="text-xs text-muted-foreground">Security First</p>
            </div>
          </div>
          
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            className="rounded-full hover:bg-primary/10 transition-colors"
          >
            {isDark ? (
              <Sun className="w-5 h-5 text-accent" />
            ) : (
              <Moon className="w-5 h-5 text-primary" />
            )}
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;