import React from 'react';
import { Hero } from '../components/landing/Hero';
import { Features } from '../components/landing/Features';
import { Demo } from '../components/landing/Demo';
import { Pricing } from '../components/landing/Pricing';
import { CTA } from '../components/landing/CTA';

export const LandingPage: React.FC = () => {
  return (
    <div>
      <Hero />
      <Features />
      <Demo />
      <Pricing />
      <CTA />
    </div>
  );
};