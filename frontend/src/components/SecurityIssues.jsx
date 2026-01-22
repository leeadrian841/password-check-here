import React from 'react';
import { Card } from './ui/card';
import { AlertCircle, Lightbulb, CheckCircle } from 'lucide-react';

export const SecurityIssues = ({ analysis }) => {
  return (
    <Card className="p-6 border-border/50 bg-card shadow-lg">
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-accent/10 flex items-center justify-center">
            <AlertCircle className="w-5 h-5 text-accent" />
          </div>
          Security Issues
        </h3>
        
        {/* Vulnerabilities */}
        {analysis.vulnerabilities.length > 0 ? (
          <div className="space-y-3">
            <h4 className="text-sm font-semibold text-foreground">Vulnerabilities Found:</h4>
            {analysis.vulnerabilities.map((vuln, index) => (
              <div key={index} className="flex items-start gap-3 p-3 rounded-lg bg-red-500/5 border border-red-500/10">
                <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                <span className="text-sm text-foreground">{vuln}</span>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex items-start gap-3 p-3 rounded-lg bg-green-500/5 border border-green-500/10">
            <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
            <span className="text-sm text-foreground">No major vulnerabilities detected!</span>
          </div>
        )}

        {/* Suggestions */}
        {analysis.suggestions.length > 0 && (
          <div className="space-y-3 pt-4 border-t border-border">
            <h4 className="text-sm font-semibold text-foreground flex items-center gap-2">
              <Lightbulb className="w-4 h-4 text-accent" />
              Suggestions for Improvement
            </h4>
            {analysis.suggestions.map((suggestion, index) => (
              <div key={index} className="flex items-start gap-3 p-3 rounded-lg bg-accent/5 border border-accent/10">
                <div className="w-1.5 h-1.5 rounded-full bg-accent flex-shrink-0 mt-2"></div>
                <span className="text-sm text-foreground">{suggestion}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </Card>
  );
};

export default SecurityIssues;
