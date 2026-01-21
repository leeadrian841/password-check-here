import React from 'react';
import { Card } from './ui/card';
import { Shield, Zap, Brain, Lock, TrendingUp, AlertTriangle } from 'lucide-react';

export const FeatureCards = () => {
  const features = [
    {
      icon: Brain,
      title: 'AI Pattern Detection',
      description: 'Advanced machine learning algorithms detect common password patterns and predictable sequences.',
      color: 'from-primary to-primary-glow',
    },
    {
      icon: Zap,
      title: 'Real-Time Analysis',
      description: 'Instant feedback as you type with comprehensive strength scoring and detailed metrics.',
      color: 'from-accent to-accent-glow',
    },
    {
      icon: Lock,
      title: 'Breach Database Check',
      description: 'Compares against millions of known breached passwords to ensure your password is unique.',
      color: 'from-primary to-secondary',
    },
    {
      icon: TrendingUp,
      title: 'Entropy Calculation',
      description: 'Mathematical analysis of password randomness and unpredictability for maximum security.',
      color: 'from-accent to-primary',
    },
    {
      icon: AlertTriangle,
      title: 'Vulnerability Detection',
      description: 'Identifies weak spots including common words, repeated characters, and sequential patterns.',
      color: 'from-primary to-accent',
    },
    {
      icon: Shield,
      title: 'Crack Time Estimation',
      description: 'Calculates how long modern AI and GPU-accelerated attacks would take to breach your password.',
      color: 'from-accent to-primary',
    },
  ];

  return (
    <section className="py-16 px-4 bg-muted/30">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Powerful Security Features
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Enterprise-grade password analysis tools at your fingertips
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <Card
              key={index}
              className="p-6 border-border/50 bg-card shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group"
            >
              <div className="space-y-4">
                <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                  <feature.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-foreground">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeatureCards;