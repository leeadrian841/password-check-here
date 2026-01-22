import React from 'react';
import { Card } from './ui/card';
import { Clock, Zap, AlertTriangle } from 'lucide-react';

export const BreachTimer = ({ analysis }) => {
  const getIconForTime = () => {
    if (analysis.timeToCrack.seconds < 60) {
      return <AlertTriangle className="w-6 h-6 text-red-500" />;
    } else if (analysis.timeToCrack.seconds < 3600) {
      return <Zap className="w-6 h-6 text-orange-500" />;
    } else {
      return <Clock className="w-6 h-6 text-accent" />;
    }
  };

  const getColorClass = () => {
    if (analysis.timeToCrack.seconds < 60) {
      return 'from-red-500 to-red-600';
    } else if (analysis.timeToCrack.seconds < 3600) {
      return 'from-orange-500 to-orange-600';
    } else if (analysis.timeToCrack.seconds < 86400) {
      return 'from-yellow-500 to-yellow-600';
    } else if (analysis.timeToCrack.seconds < 2592000) {
      return 'from-green-500 to-green-600';
    } else {
      return 'from-emerald-500 to-emerald-600';
    }
  };

  return (
    <Card className="p-6 border-border/50 bg-card shadow-lg overflow-hidden relative">
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-primary/10 to-accent/10 rounded-full blur-3xl"></div>
      
      <div className="relative z-10 space-y-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
            {getIconForTime()}
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground">Estimated Breach Time</h3>
            <p className="text-sm text-muted-foreground">How fast could AI crack this password?</p>
          </div>
        </div>

        <div className="bg-gradient-to-r p-6 rounded-xl ${getColorClass()} bg-muted/30 border border-border">
          <div className="text-center space-y-2">
            <div className={`text-4xl sm:text-5xl font-bold bg-gradient-to-r ${getColorClass()} bg-clip-text text-transparent`}>
              {analysis.timeToCrack.display}
            </div>
            <p className="text-sm text-muted-foreground">
              Using modern AI and GPU-accelerated attacks
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="flex items-center gap-2 p-3 rounded-lg bg-muted/50">
            <div className="w-2 h-2 rounded-full bg-primary"></div>
            <div>
              <div className="text-xs text-muted-foreground">Dictionary Attack</div>
              <div className="text-sm font-semibold text-foreground">
                {analysis.vulnerabilities.includes('Common password pattern') ? 'Vulnerable' : 'Protected'}
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2 p-3 rounded-lg bg-muted/50">
            <div className="w-2 h-2 rounded-full bg-accent"></div>
            <div>
              <div className="text-xs text-muted-foreground">Brute Force</div>
              <div className="text-sm font-semibold text-foreground">
                {analysis.length < 12 ? 'At Risk' : 'Secure'}
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2 p-3 rounded-lg bg-muted/50">
            <div className="w-2 h-2 rounded-full bg-primary"></div>
            <div>
              <div className="text-xs text-muted-foreground">AI Pattern</div>
              <div className="text-sm font-semibold text-foreground">
                {analysis.hasPatterns ? 'Detected' : 'None'}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default BreachTimer;