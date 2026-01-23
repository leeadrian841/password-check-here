import React from 'react';
import { Card } from './ui/card';

export const HowItWorks = () => {
  const steps = [
    {
      number: '01',
      title: 'Enter Your Password',
      description: 'Type or paste any password you want to test. Your data stays in your browser - nothing is sent to any server.',
    },
    {
      number: '02',
      title: 'Real-Time Analysis',
      description: 'Our algorithm instantly analyzes length, character diversity, entropy, common patterns and breach databases.',
    },
    {
      number: '03',
      title: 'Get Detailed Results',
      description: 'See your password strength score, estimated crack time, vulnerabilities and actionable suggestions for improvement.',
    },
    {
      number: '04',
      title: 'Improve & Secure',
      description: 'Use our recommendations to create stronger passwords or generate a random secure password instantly.',
    },
  ];

  return (
    <section className="py-16 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            How It Works
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Simple, fast and private password analysis
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, index) => (
            <div key={index} className="relative flex flex-col">
              <Card className="p-6 border-border/50 bg-card shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex flex-col h-full">
                <div className="space-y-4 flex-1 flex flex-col">
                  <div className="flex items-center gap-4">
                    <div className="text-5xl font-bold bg-gradient-to-br from-primary to-accent bg-clip-text text-transparent">
                      {step.number}
                    </div>
                  </div>
                  <h3 className="text-xl font-semibold text-foreground">
                    {step.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed mt-auto">
                    {step.description}
                  </p>
                </div>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
