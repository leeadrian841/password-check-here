import React, { useState, useEffect } from 'react';
import { Eye, EyeOff, RefreshCw, Copy, Check } from 'lucide-react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Progress } from './ui/progress';
import StrengthMeter from './StrengthMeter';
import AnalysisDetails from './AnalysisDetails';
import BreachTimer from './BreachTimer';
import { analyzePassword } from '../utils/passwordAnalyzer';
import { toast } from 'sonner';

export const PasswordChecker = () => {
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [analysis, setAnalysis] = useState(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (password) {
      const result = analyzePassword(password);
      setAnalysis(result);
    } else {
      setAnalysis(null);
    }
  }, [password]);

  const handleCopy = () => {
    navigator.clipboard.writeText(password);
    setCopied(true);
    toast.success('Password copied to clipboard!');
    setTimeout(() => setCopied(false), 2000);
  };

  const generateRandomPassword = () => {
    const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+-=[]{}|;:,.<>?';
    let newPassword = '';
    for (let i = 0; i < 16; i++) {
      newPassword += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setPassword(newPassword);
    toast.success('Random strong password generated!');
  };

  return (
    <div className="space-y-6">
      {/* Main Input Card */}
      <Card className="p-6 sm:p-8 shadow-2xl border-border/50 bg-card">
        <div className="space-y-4">
          <label className="text-sm font-medium text-foreground">
            Enter Your Password
          </label>
          
          <div className="relative">
            <Input
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Type or paste your password..."
              className="pr-24 h-14 text-lg font-mono bg-background border-2 focus:border-primary transition-colors"
            />
            <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1">
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={() => setShowPassword(!showPassword)}
                className="h-10 w-10 hover:bg-muted transition-colors"
              >
                {showPassword ? (
                  <EyeOff className="w-5 h-5 text-muted-foreground" />
                ) : (
                  <Eye className="w-5 h-5 text-muted-foreground" />
                )}
              </Button>
              {password && (
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={handleCopy}
                  className="h-10 w-10 hover:bg-muted transition-colors"
                >
                  {copied ? (
                    <Check className="w-5 h-5 text-accent" />
                  ) : (
                    <Copy className="w-5 h-5 text-muted-foreground" />
                  )}
                </Button>
              )}
            </div>
          </div>

          <div className="flex items-center justify-between">
            <p className="text-xs text-muted-foreground">
              {password.length} characters
            </p>
            <Button
              variant="outline"
              size="sm"
              onClick={generateRandomPassword}
              className="gap-2 hover:bg-primary/10 hover:text-primary hover:border-primary transition-colors"
            >
              <RefreshCw className="w-4 h-4" />
              Generate Strong Password
            </Button>
          </div>
        </div>
      </Card>

      {/* Analysis Results */}
      {analysis && (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
          {/* Strength Meter */}
          <StrengthMeter analysis={analysis} />

          {/* Breach Timer */}
          <BreachTimer analysis={analysis} />

          {/* Detailed Analysis */}
          <AnalysisDetails analysis={analysis} password={password} />
        </div>
      )}
    </div>
  );
};

export default PasswordChecker;