import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles } from 'lucide-react';

export const CTA = () => {
  return (
    <div className="bg-gradient-to-r from-blue-600 to-indigo-700">
      <div className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8 text-center">
        <div className="inline-flex items-center px-4 py-2 bg-white/20 backdrop-blur-sm border border-white/30 rounded-full mb-6">
          <Sparkles className="w-4 h-4 mr-2 text-yellow-300" />
          <span className="text-sm font-semibold text-white">DataSight v2 - Now with AI Chat</span>
        </div>

        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
          Ready to Transform Your Data Analysis?
        </h2>

        <p className="text-xl text-blue-100 mb-4 max-w-2xl mx-auto">
          Start using our powerful AI-powered analysis tools today. Completely free with your own API key.
        </p>

        <p className="text-blue-200 mb-8 max-w-2xl mx-auto">
          No sign-up required • No credit card needed • Your data stays private
        </p>

        <Link
          to="/analyze"
          className="inline-flex items-center px-8 py-4 bg-white text-blue-600 rounded-lg font-semibold text-lg hover:bg-blue-50 transition-all hover:scale-105 shadow-xl"
        >
          Get Started Free
          <ArrowRight className="ml-2 h-5 w-5" />
        </Link>

        <div className="mt-12 pt-8 border-t border-white/20">
          <p className="text-blue-100 text-sm mb-2">
            Need enterprise features or custom solutions?
          </p>
          <a
            href="#pricing"
            className="text-white hover:underline font-semibold text-lg"
          >
            Contact Sales →
          </a>
        </div>

        <p className="text-blue-200 text-sm mt-8">
          Powered by{' '}
          <a
            href="https://neuralcodelab.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white hover:underline font-semibold"
          >
            neuralcodelab.com
          </a>
        </p>
      </div>
    </div>
  );
};