import { FileSpreadsheet, ArrowRight, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Hero = () => {
  return (
    <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
      <div className="max-w-7xl mx-auto px-4 py-24 sm:px-6 lg:px-8">
        <div className="text-center">
          <div className="flex items-center justify-center mb-6">
            <FileSpreadsheet className="h-16 w-16 text-blue-200" />
          </div>

          {/* Version Badge */}
          <div className="inline-flex items-center px-4 py-2 bg-blue-500/30 backdrop-blur-sm border border-blue-400/50 rounded-full mb-6">
            <Sparkles className="w-4 h-4 mr-2 text-yellow-300" />
            <span className="text-sm font-semibold text-blue-100">Version 2.0 - Now with AI Chat Assistant</span>
          </div>

          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            DataSight <span className="text-blue-200">v2</span>
          </h1>

          <p className="text-xl md:text-2xl text-blue-100 mb-4 font-semibold">
            AI-Powered Data Analysis Made Simple
          </p>

          <p className="text-lg text-blue-100 mb-8 max-w-3xl mx-auto">
            Upload your CSV or Excel files and get instant insights with our advanced analytics tools.
            Now featuring an AI chatbot powered by your own OpenAI API key.
          </p>

          {/* Key Features Highlight */}
          <div className="flex flex-wrap justify-center gap-4 mb-12 max-w-4xl mx-auto">
            <div className="px-4 py-2 bg-white/10 backdrop-blur-sm rounded-lg border border-white/20">
              <span className="text-sm font-medium">✨ Free Forever</span>
            </div>
            <div className="px-4 py-2 bg-white/10 backdrop-blur-sm rounded-lg border border-white/20">
              <span className="text-sm font-medium">🔒 Your API Key, Your Data</span>
            </div>
            <div className="px-4 py-2 bg-white/10 backdrop-blur-sm rounded-lg border border-white/20">
              <span className="text-sm font-medium">🤖 AI Chat Assistant</span>
            </div>
            <div className="px-4 py-2 bg-white/10 backdrop-blur-sm rounded-lg border border-white/20">
              <span className="text-sm font-medium">📊 Advanced Analytics</span>
            </div>
          </div>

          <Link
            to="/analyze"
            className="inline-flex items-center px-8 py-4 bg-white text-blue-600 rounded-lg font-semibold text-lg hover:bg-blue-50 transition-all hover:scale-105 shadow-xl"
          >
            Start Analyzing Free
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>

          <p className="mt-4 text-sm text-blue-200">
            No credit card required • API key stored locally • Deleted on page close
          </p>
        </div>
      </div>
    </div>
  );
};