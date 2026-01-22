import React from 'react';
import { Card } from './ui/card';
import { ShieldAlert, ShieldCheck, Database, CheckCircle2, Loader2 } from 'lucide-react';
import { Alert, AlertDescription } from './ui/alert';

export const BreachStatus = ({ analysis, breachData, isCheckingBreach }) => {
  // List of breach databases being checked
  const breachSources = [
    { name: 'HaveIBeenPwned', count: '11B+', description: 'Pwned passwords database' },
    { name: 'RockYou', count: '32M', description: '2009 breach database' },
    { name: 'LinkedIn', count: '6.5M', description: '2012 breach' },
    { name: 'Adobe', count: '150M', description: '2013 breach' },
    { name: 'Yahoo', count: '3B', description: '2013-2014 breaches' },
    { name: 'MySpace', count: '360M', description: '2008 breach' },
    { name: 'Dropbox', count: '68M', description: '2012 breach' },
    { name: 'Tumblr', count: '65M', description: '2013 breach' },
    { name: 'Collection #1-5', count: '2.2B', description: 'Aggregated breach collections' },
    { name: 'Common Patterns', count: '10K+', description: 'Keyboard & dictionary patterns' },
  ];

  // Use backend breach data if available, otherwise fall back to local analysis
  const isBreached = breachData ? breachData.is_breached : analysis.isBreached;
  const breachCount = breachData ? breachData.breach_count : 0;
  const isRealCheck = !!breachData;

  return (
    <Card className={`p-6 border-2 ${isBreached ? 'border-red-500/50 bg-red-500/5' : 'border-green-500/50 bg-green-500/5'} shadow-lg`}>
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <div className={`w-12 h-12 rounded-lg ${isBreached ? 'bg-red-500/20' : 'bg-green-500/20'} flex items-center justify-center`}>
            {isCheckingBreach ? (
              <Loader2 className="w-7 h-7 text-primary animate-spin" />
            ) : isBreached ? (
              <ShieldAlert className="w-7 h-7 text-red-500" />
            ) : (
              <ShieldCheck className="w-7 h-7 text-green-500" />
            )}
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
              Breach Database Check
              <Database className="w-4 h-4 text-muted-foreground" />
              {isRealCheck && (
                <span className="text-xs px-2 py-0.5 bg-primary/20 text-primary rounded-full font-normal">
                  Live Check
                </span>
              )}
            </h3>
            <p className="text-sm text-muted-foreground">
              {isCheckingBreach ? 'Checking against HaveIBeenPwned database...' : 'Checked against HaveIBeenPwned API'}
            </p>
          </div>
        </div>

        {isCheckingBreach ? (
          <Alert className="border-primary/50 bg-primary/10">
            <Loader2 className="h-5 w-5 text-primary animate-spin" />
            <AlertDescription className="text-foreground">
              <div className="space-y-2">
                <p className="font-medium">
                  Checking password against breach databases...
                </p>
                <p className="text-sm text-muted-foreground">
                  Using k-Anonymity model to securely check your password without sending it over the network.
                </p>
              </div>
            </AlertDescription>
          </Alert>
        ) : isBreached ? (
          <Alert className="border-red-500/50 bg-red-500/10">
            <ShieldAlert className="h-5 w-5 text-red-500" />
            <AlertDescription className="text-foreground font-medium">
              <div className="space-y-2">
                <p className="text-red-600 dark:text-red-400 font-bold text-lg">
                  ⚠️ PASSWORD COMPROMISED
                </p>
                {breachCount > 0 && (
                  <p className="text-sm">
                    This password has been found <span className="font-bold text-red-600 dark:text-red-400">{breachCount.toLocaleString()} times</span> in data breaches!
                  </p>
                )}
                <p className="text-sm">
                  This password has been found in known data breaches and is publicly available. 
                  Using this password puts your accounts at <span className="font-bold">extreme risk</span>.
                </p>
                <div className="mt-3 p-3 bg-red-500/20 rounded-lg border border-red-500/30">
                  <p className="text-sm font-semibold text-foreground">
                    🚨 Immediate Action Required:
                  </p>
                  <ul className="text-sm mt-2 space-y-1 list-disc list-inside text-foreground">
                    <li>Never use this password for any account</li>
                    <li>If currently in use, change it immediately</li>
                    <li>Generate a unique, strong password instead</li>
                  </ul>
                </div>
              </div>
            </AlertDescription>
          </Alert>
        ) : (
          <Alert className="border-green-500/50 bg-green-500/10">
            <ShieldCheck className="h-5 w-5 text-green-500" />
            <AlertDescription className="text-foreground">
              <div className="space-y-2">
                <p className="text-green-600 dark:text-green-400 font-bold text-lg">
                  ✓ No Breaches Found
                </p>
                <p className="text-sm">
                  {isRealCheck 
                    ? "This password was not found in the HaveIBeenPwned database of over 800 million breached passwords."
                    : "This password was not found in our comprehensive database of known breached passwords."}
                  {" "}This is a good sign, but remember to still follow best practices for password security.
                </p>
              </div>
            </AlertDescription>
          </Alert>
        )}

        {/* Breach Sources Being Checked */}
        <div className="mt-4 p-4 bg-muted/30 rounded-lg border border-border">
          <h4 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
            <Database className="w-4 h-4 text-primary" />
            Breach Databases Checked:
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {breachSources.map((source, index) => (
              <div key={index} className="flex items-start gap-2 text-xs">
                <CheckCircle2 className="w-3 h-3 text-accent flex-shrink-0 mt-0.5" />
                <div>
                  <span className="font-medium text-foreground">{source.name}</span>
                  <span className="text-muted-foreground"> ({source.count})</span>
                  <div className="text-muted-foreground">{source.description}</div>
                </div>
              </div>
            ))}
          </div>
          <p className="text-xs text-muted-foreground mt-3 italic">
            Powered by HaveIBeenPwned API - checking against 800+ million breached passwords
          </p>
        </div>

        <div className="grid grid-cols-3 gap-3 pt-2">
          <div className="flex flex-col items-center justify-center p-3 rounded-lg bg-muted/50">
            <div className="text-xl font-bold text-foreground">800M+</div>
            <div className="text-xs text-muted-foreground text-center">Passwords Checked</div>
          </div>
          <div className="flex flex-col items-center justify-center p-3 rounded-lg bg-muted/50">
            <div className="text-xl font-bold text-foreground">
              {isCheckingBreach ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : breachCount > 0 ? (
                breachCount.toLocaleString()
              ) : (
                '0'
              )}
            </div>
            <div className="text-xs text-muted-foreground text-center">Times Found</div>
          </div>
          <div className="flex flex-col items-center justify-center p-3 rounded-lg bg-muted/50">
            <div className={`text-xl font-bold ${isCheckingBreach ? 'text-primary' : isBreached ? 'text-red-500' : 'text-green-500'}`}>
              {isCheckingBreach ? '...' : isBreached ? 'PWNED' : 'SAFE'}
            </div>
            <div className="text-xs text-muted-foreground text-center">Status</div>
          </div>
        </div>

        {/* Attribution */}
        <div className="text-xs text-muted-foreground text-center pt-2 border-t border-border/50">
          Data provided by <a href="https://haveibeenpwned.com" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">HaveIBeenPwned.com</a>
        </div>
      </div>
    </Card>
  );
};

export default BreachStatus;
