import React from 'react';
import { Card } from './ui/card';
import { ShieldAlert, ShieldCheck, Database } from 'lucide-react';
import { Alert, AlertDescription } from './ui/alert';

export const BreachStatus = ({ analysis }) => {
  return (
    <Card className={`p-6 border-2 ${analysis.isBreached ? 'border-red-500/50 bg-red-500/5' : 'border-green-500/50 bg-green-500/5'} shadow-lg`}>
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <div className={`w-12 h-12 rounded-lg ${analysis.isBreached ? 'bg-red-500/20' : 'bg-green-500/20'} flex items-center justify-center`}>
            {analysis.isBreached ? (
              <ShieldAlert className="w-7 h-7 text-red-500" />
            ) : (
              <ShieldCheck className="w-7 h-7 text-green-500" />
            )}
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
              Breach Database Check
              <Database className="w-4 h-4 text-muted-foreground" />
            </h3>
            <p className="text-sm text-muted-foreground">
              Checked against millions of known breached passwords
            </p>
          </div>
        </div>

        {analysis.isBreached ? (
          <Alert className="border-red-500/50 bg-red-500/10">
            <ShieldAlert className="h-5 w-5 text-red-500" />
            <AlertDescription className="text-foreground font-medium">
              <div className="space-y-2">
                <p className="text-red-600 dark:text-red-400 font-bold text-lg">
                  ⚠️ PASSWORD COMPROMISED
                </p>
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
                  This password was not found in our database of over 10 million compromised passwords 
                  from known data breaches. This is a good sign, but remember to still follow best 
                  practices for password security.
                </p>
              </div>
            </AlertDescription>
          </Alert>
        )}

        <div className="grid grid-cols-2 gap-3 pt-2">
          <div className="flex flex-col items-center justify-center p-3 rounded-lg bg-muted/50">
            <div className="text-xl font-bold text-foreground">10M+</div>
            <div className="text-xs text-muted-foreground text-center">Breached Passwords</div>
          </div>
          <div className="flex flex-col items-center justify-center p-3 rounded-lg bg-muted/50">
            <div className={`text-xl font-bold ${analysis.isBreached ? 'text-red-500' : 'text-green-500'}`}>
              {analysis.isBreached ? 'FOUND' : 'SAFE'}
            </div>
            <div className="text-xs text-muted-foreground text-center">Status</div>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default BreachStatus;
