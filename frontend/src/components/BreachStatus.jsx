import React from 'react';
import { Card } from './ui/card';
import { ShieldAlert, ShieldCheck, Database, CheckCircle2, Loader2, ExternalLink } from 'lucide-react';
import { Alert, AlertDescription } from './ui/alert';

export const BreachStatus = ({ analysis, breachData, isCheckingBreach }) => {
  // List of breach databases being checked via HaveIBeenPwned
  const breachSources = [
    { name: 'HaveIBeenPwned', count: '850M+', description: 'Main pwned passwords database' },
    { name: 'RockYou', count: '32M', description: '2009 breach database' },
    { name: 'LinkedIn', count: '117M', description: '2012 breach' },
    { name: 'Adobe', count: '153M', description: '2013 breach' },
    { name: 'Yahoo', count: '3B', description: '2013-2014 breaches' },
    { name: 'MySpace', count: '360M', description: '2008 breach' },
    { name: 'Dropbox', count: '68M', description: '2012 breach' },
    { name: 'Collection #1-5', count: '2.2B', description: 'Aggregated breach collections' },
    { name: 'Anti Public', count: '458M', description: 'Combo list compilation' },
    { name: 'Exploit.in', count: '593M', description: 'Russian forum compilation' },
  ];

  // Determine breach status from breach data or analysis fallback
  const isBreached = breachData ? breachData.is_breached : analysis?.isBreached || false;
  const breachCount = breachData ? breachData.breach_count : 0;
  const apiChecked = breachData?.api_checked ?? false;
  const source = breachData?.source || 'Local';

  return (
    <Card className={`p-6 border-2 ${isBreached ? 'border-red-500/50 bg-red-500/5' : 'border-green-500/50 bg-green-500/5'} shadow-lg`}>
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <div className={`w-12 h-12 rounded-lg ${isCheckingBreach ? 'bg-blue-500/20' : isBreached ? 'bg-red-500/20' : 'bg-green-500/20'} flex items-center justify-center`}>
            {isCheckingBreach ? (
              <Loader2 className="w-7 h-7 text-blue-500 animate-spin" />
            ) : isBreached ? (
              <ShieldAlert className="w-7 h-7 text-red-500" />
            ) : (
              <ShieldCheck className="w-7 h-7 text-green-500" />
            )}
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-foreground flex items-center gap-2 flex-wrap">
              Breach Database Check
              <Database className="w-4 h-4 text-muted-foreground" />
              {apiChecked && (
                <span className="text-xs px-2 py-0.5 bg-green-500/20 text-green-600 dark:text-green-400 rounded-full font-normal">
                  ✓ Live API Check
                </span>
              )}
              {!apiChecked && breachData && (
                <span className="text-xs px-2 py-0.5 bg-yellow-500/20 text-yellow-600 dark:text-yellow-400 rounded-full font-normal">
                  Local Database
                </span>
              )}
            </h3>
            <p className="text-sm text-muted-foreground">
              {isCheckingBreach 
                ? 'Checking against HaveIBeenPwned API...' 
                : apiChecked 
                  ? 'Checked against HaveIBeenPwned (850M+ passwords)' 
                  : 'Checked against local breach database'}
            </p>
          </div>
        </div>

        {isCheckingBreach ? (
          <Alert className="border-blue-500/50 bg-blue-500/10">
            <Loader2 className="h-5 w-5 text-blue-500 animate-spin" />
            <AlertDescription className="text-foreground">
              <div className="space-y-2">
                <p className="font-medium">
                  Securely checking password...
                </p>
                <p className="text-sm text-muted-foreground">
                  Using k-Anonymity model - your password is never sent over the network. Only a partial hash is used for lookup.
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
                    <li>Enable two-factor authentication (2FA) where possible</li>
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
                  {apiChecked 
                    ? "This password was not found in the HaveIBeenPwned database of over 850 million breached passwords."
                    : "This password was not found in our breach database."}
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
            {breachSources.map((src, index) => (
              <div key={index} className="flex items-start gap-2 text-xs">
                <CheckCircle2 className="w-3 h-3 text-accent flex-shrink-0 mt-0.5" />
                <div>
                  <span className="font-medium text-foreground">{src.name}</span>
                  <span className="text-muted-foreground"> ({src.count})</span>
                  <div className="text-muted-foreground">{src.description}</div>
                </div>
              </div>
            ))}
          </div>
          <p className="text-xs text-muted-foreground mt-3 italic">
            Powered by HaveIBeenPwned API - checking against 850+ million breached passwords
          </p>
        </div>

        <div className="grid grid-cols-3 gap-3 pt-2">
          <div className="flex flex-col items-center justify-center p-3 rounded-lg bg-muted/50">
            <div className="text-xl font-bold text-foreground">850M+</div>
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
            <div className={`text-xl font-bold ${isCheckingBreach ? 'text-blue-500' : isBreached ? 'text-red-500' : 'text-green-500'}`}>
              {isCheckingBreach ? '...' : isBreached ? 'PWNED' : 'SAFE'}
            </div>
            <div className="text-xs text-muted-foreground text-center">Status</div>
          </div>
        </div>

        {/* Attribution */}
        <div className="text-xs text-muted-foreground text-center pt-2 border-t border-border/50 flex items-center justify-center gap-1">
          Data provided by{' '}
          <a 
            href="https://haveibeenpwned.com" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="text-primary hover:underline inline-flex items-center gap-1"
          >
            HaveIBeenPwned.com
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      </div>
    </Card>
  );
};

export default BreachStatus;
