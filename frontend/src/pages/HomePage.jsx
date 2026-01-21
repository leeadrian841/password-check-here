import React, { useState } from 'react';
import Header from '../components/Header';
import PasswordChecker from '../components/PasswordChecker';
import FeatureCards from '../components/FeatureCards';
import HowItWorks from '../components/HowItWorks';
import Footer from '../components/Footer';

export default function HomePage() {
  const [isDark, setIsDark] = useState(false);

  React.useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted">
      <Header isDark={isDark} toggleTheme={() => setIsDark(!isDark)} />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-24 pb-16 px-4">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="container mx-auto max-w-6xl relative z-10">
          <div className="text-center mb-12">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-foreground via-primary to-accent bg-clip-text text-transparent leading-tight">
              Test Your Password
              <br />
              <span className="text-primary">Strength Instantly</span>
            </h1>
            
            <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Advanced real-time analysis using AI patterns, breach detection, and character diversity scoring. 
              See how long it would take AI to crack your password.
            </p>
          </div>
          
          {/* Main Password Checker Component */}
          <PasswordChecker />
        </div>
      </section>

      {/* Features Section */}
      <FeatureCards />

      {/* How It Works */}
      <HowItWorks />

      {/* Footer */}
      <Footer />
    </div>
  );
}