import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Eye, EyeOff, RefreshCw, Copy, Check } from 'lucide-react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Progress } from './ui/progress';
import StrengthMeter from './StrengthMeter';
import BreachStatus from './BreachStatus';
import SecurityIssues from './SecurityIssues';
import BreachTimer from './BreachTimer';
import { analyzePassword } from '../utils/passwordAnalyzer';
import { toast } from 'sonner';

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || '';

export const PasswordChecker = () => {
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [analysis, setAnalysis] = useState(null);
  const [copied, setCopied] = useState(false);
  const [breachData, setBreachData] = useState(null);
  const [isCheckingBreach, setIsCheckingBreach] = useState(false);
  const debounceTimerRef = useRef(null);

  // Check password against HaveIBeenPwned via backend API
  const checkPasswordBreach = useCallback(async (pwd) => {
    if (!pwd || pwd.length < 1) {
      setBreachData(null);
      return;
    }

    setIsCheckingBreach(true);
    try {
      const response = await fetch(`${BACKEND_URL}/api/check-password-breach`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ password: pwd }),
      });

      if (response.ok) {
        const data = await response.json();
        setBreachData(data);
      } else {
        console.error('Failed to check password breach');
        setBreachData(null);
      }
    } catch (error) {
      console.error('Error checking password breach:', error);
      setBreachData(null);
    } finally {
      setIsCheckingBreach(false);
    }
  }, []);

  useEffect(() => {
    if (password) {
      const result = analyzePassword(password);
      setAnalysis(result);
      
      // Debounce the backend breach check to avoid too many requests
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }
      debounceTimerRef.current = setTimeout(() => {
        checkPasswordBreach(password);
      }, 500); // Wait 500ms after user stops typing
    } else {
      setAnalysis(null);
      setBreachData(null);
    }

    return () => {
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }
    };
  }, [password, checkPasswordBreach]);

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
          {/* 1. Breach Status - Most Important (now with real backend data) */}
          <BreachStatus 
            analysis={analysis} 
            breachData={breachData} 
            isCheckingBreach={isCheckingBreach} 
          />

          {/* 2. Password Strength with Character Analysis */}
          <StrengthMeter analysis={analysis} />

          {/* 3. Security Issues */}
          <SecurityIssues analysis={analysis} />

          {/* 4. Estimated Breach Time */}
          <BreachTimer analysis={analysis} />
        </div>
      )}
    </div>
  );
};

export default PasswordChecker;