import React from 'react';
import { Card } from './ui/card';
import { Check, X, AlertCircle, Lightbulb } from 'lucide-react';
import { Badge } from './ui/badge';

export const AnalysisDetails = ({ analysis, password }) => {
  return (
    <div className="grid gap-6 md:grid-cols-2">
      {/* Character Analysis */}
      <Card className="p-6 border-border/50 bg-card shadow-lg">
        <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
            <Check className="w-5 h-5 text-primary" />
          </div>
          Character Analysis
        </h3>
        <div className="space-y-3">
          {[
            { label: 'Lowercase letters', value: analysis.hasLowercase, key: 'lowercase' },
            { label: 'Uppercase letters', value: analysis.hasUppercase, key: 'uppercase' },
            { label: 'Numbers', value: analysis.hasNumbers, key: 'numbers' },
            { label: 'Special characters', value: analysis.hasSpecial, key: 'special' },
            { label: 'Minimum length (12+)', value: analysis.length >= 12, key: 'length' },
          ].map((item) => (
            <div key={item.key} className="flex items-center justify-between p-3 rounded-lg bg-muted/50 transition-colors hover:bg-muted">
              <span className="text-sm text-foreground">{item.label}</span>
              {item.value ? (
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="bg-green-500/10 text-green-600 dark:text-green-400 border-green-500/20">
                    <Check className="w-3 h-3 mr-1" />
                    Yes
                  </Badge>
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="bg-red-500/10 text-red-600 dark:text-red-400 border-red-500/20">
                    <X className="w-3 h-3 mr-1" />
                    No
                  </Badge>
                </div>
              )}
            </div>
          ))}
        </div>
      </Card>

      {/* Vulnerabilities & Suggestions */}
      <Card className="p-6 border-border/50 bg-card shadow-lg">
        <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-accent/10 flex items-center justify-center">
            <AlertCircle className="w-5 h-5 text-accent" />
          </div>
          Security Issues
        </h3>
        
        {analysis.vulnerabilities.length > 0 ? (
          <div className="space-y-3 mb-6">
            {analysis.vulnerabilities.map((vuln, index) => (
              <div key={index} className="flex items-start gap-3 p-3 rounded-lg bg-red-500/5 border border-red-500/10">
                <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                <span className="text-sm text-foreground">{vuln}</span>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex items-start gap-3 p-3 rounded-lg bg-green-500/5 border border-green-500/10 mb-6">
            <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
            <span className="text-sm text-foreground">No major vulnerabilities detected!</span>
          </div>
        )}

        {analysis.suggestions.length > 0 && (
          <div className="space-y-3">
            <h4 className="text-sm font-semibold text-foreground flex items-center gap-2">
              <Lightbulb className="w-4 h-4 text-accent" />
              Suggestions
            </h4>
            {analysis.suggestions.map((suggestion, index) => (
              <div key={index} className="flex items-start gap-3 p-3 rounded-lg bg-accent/5 border border-accent/10">
                <div className="w-1.5 h-1.5 rounded-full bg-accent flex-shrink-0 mt-2"></div>
                <span className="text-sm text-foreground">{suggestion}</span>
              </div>
            ))}
          </div>
        )}
      </Card>
    </div>
  );
};

export default AnalysisDetails;