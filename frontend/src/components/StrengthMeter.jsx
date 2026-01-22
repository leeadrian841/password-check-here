import React from 'react';
import { Card } from './ui/card';
import { Progress } from './ui/progress';
import { Check, X } from 'lucide-react';
import { Badge } from './ui/badge';

export const StrengthMeter = ({ analysis }) => {
  const strengthConfig = {
    weak: {
      label: 'Weak',
      color: 'hsl(var(--strength-weak))',
      bgColor: 'bg-red-500/10',
      textColor: 'text-red-600 dark:text-red-400',
      gradient: 'from-red-500 to-red-600',
    },
    fair: {
      label: 'Fair',
      color: 'hsl(var(--strength-fair))',
      bgColor: 'bg-orange-500/10',
      textColor: 'text-orange-600 dark:text-orange-400',
      gradient: 'from-orange-500 to-orange-600',
    },
    good: {
      label: 'Good',
      color: 'hsl(var(--strength-good))',
      bgColor: 'bg-yellow-500/10',
      textColor: 'text-yellow-600 dark:text-yellow-400',
      gradient: 'from-yellow-500 to-yellow-600',
    },
    strong: {
      label: 'Strong',
      color: 'hsl(var(--strength-strong))',
      bgColor: 'bg-green-500/10',
      textColor: 'text-green-600 dark:text-green-400',
      gradient: 'from-green-500 to-green-600',
    },
    excellent: {
      label: 'Excellent',
      color: 'hsl(var(--strength-excellent))',
      bgColor: 'bg-emerald-500/10',
      textColor: 'text-emerald-600 dark:text-emerald-400',
      gradient: 'from-emerald-500 to-emerald-600',
    },
  };

  const config = strengthConfig[analysis.strength];
  const percentage = Math.min(Math.round((analysis.score / 100) * 100), 100);

  return (
    <Card className="p-6 border-border/50 bg-card shadow-lg">
      <div className="space-y-6">
        {/* Strength Score */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-foreground">Password Strength</h3>
            <div className={`px-4 py-1.5 rounded-full ${config.bgColor} ${config.textColor} font-semibold text-sm`}>
              {config.label}
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Score</span>
              <span className="font-bold text-foreground">{percentage}%</span>
            </div>
            <div className="relative h-3 bg-muted rounded-full overflow-hidden">
              <div
                className={`absolute inset-y-0 left-0 bg-gradient-to-r ${config.gradient} strength-progress rounded-full`}
                style={{ width: `${percentage}%` }}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
            <div className="flex flex-col items-center justify-center p-3 rounded-lg bg-muted/50">
              <div className="text-2xl font-bold text-foreground">{analysis.length}</div>
              <div className="text-xs text-muted-foreground">Characters</div>
            </div>
            <div className="flex flex-col items-center justify-center p-3 rounded-lg bg-muted/50">
              <div className="text-2xl font-bold text-foreground">{analysis.characterTypes}</div>
              <div className="text-xs text-muted-foreground">Char Types</div>
            </div>
            <div className="flex flex-col items-center justify-center p-3 rounded-lg bg-muted/50">
              <div className="text-2xl font-bold text-foreground">{analysis.entropy.toFixed(0)}</div>
              <div className="text-xs text-muted-foreground">Entropy</div>
            </div>
            <div className="flex flex-col items-center justify-center p-3 rounded-lg bg-muted/50">
              <div className="text-2xl font-bold text-foreground">{analysis.uniqueChars}</div>
              <div className="text-xs text-muted-foreground">Unique</div>
            </div>
          </div>
        </div>

        {/* Character Analysis */}
        <div className="pt-4 border-t border-border">
          <h4 className="text-base font-semibold text-foreground mb-4 flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
              <Check className="w-5 h-5 text-primary" />
            </div>
            Character Analysis
          </h4>
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
        </div>
      </div>
    </Card>
  );
};

export default StrengthMeter;