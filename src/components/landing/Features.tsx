import { FileType, BarChart2, Table, FileSearch, Shield, Zap, Bot, Key, Trash2 } from 'lucide-react';
import { Feature } from '../../types';

const features: Feature[] = [
  {
    title: 'AI Chat Assistant (NEW)',
    description: 'Ask questions about your data using our intelligent AI chatbot powered by OpenAI GPT-4.',
    icon: 'Bot'
  },
  {
    title: 'Your Own API Key',
    description: 'Use your personal OpenAI API key for complete control and privacy. No hidden costs.',
    icon: 'Key'
  },
  {
    title: 'Auto-Delete on Close',
    description: 'Your API key is stored locally and automatically deleted when you close or refresh the page.',
    icon: 'Trash2'
  },
  {
    title: 'Multiple File Formats',
    description: 'Support for CSV, XLS, and XLSX files with automatic format detection.',
    icon: 'FileType'
  },
  {
    title: 'Advanced Analytics',
    description: 'Get detailed statistical analysis including averages, distributions, and outliers.',
    icon: 'BarChart2'
  },
  {
    title: 'Interactive Tables',
    description: 'View and sort your data in a clean, responsive table interface.',
    icon: 'Table'
  },
  {
    title: 'Smart Data Detection',
    description: 'Automatic detection of data types and formats in your columns.',
    icon: 'FileSearch'
  },
  {
    title: 'Secure Processing',
    description: 'All processing happens in your browser. Your data never leaves your device.',
    icon: 'Shield'
  },
  {
    title: 'Lightning Fast',
    description: 'Get instant analysis results with our optimized processing engine.',
    icon: 'Zap'
  }
];

const IconComponent: Record<string, React.FC<any>> = {
  FileType, BarChart2, Table, FileSearch, Shield, Zap, Bot, Key, Trash2
};

export const Features = () => {
  return (
    <div className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-block px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold mb-4">
            ✨ What's New in v2
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Everything You Need for Data Analysis
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Our powerful tools help you understand your data better and make informed decisions.
            Now with AI-powered insights using your own OpenAI API key.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = IconComponent[feature.icon];
            const isNew = index < 3; // First 3 features are new in v2
            return (
              <div
                key={index}
                className={`bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-all hover:scale-105 ${isNew ? 'ring-2 ring-blue-500 relative' : ''
                  }`}
              >
                {isNew && (
                  <div className="absolute -top-3 -right-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">
                    NEW
                  </div>
                )}
                <div className={`w-12 h-12 rounded-lg flex items-center justify-center mb-4 ${isNew ? 'bg-gradient-to-br from-blue-500 to-indigo-600' : 'bg-blue-100'
                  }`}>
                  <Icon className={`h-6 w-6 ${isNew ? 'text-white' : 'text-blue-600'}`} />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Privacy Notice */}
        <div className="mt-16 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-2xl p-8 text-center">
          <h3 className="text-2xl font-bold text-gray-900 mb-3">
            🔒 Your Privacy is Our Priority
          </h3>
          <p className="text-gray-700 max-w-3xl mx-auto text-lg">
            Your API key is stored only in your browser's local storage and is automatically deleted when you close or refresh the page.
            We never store or transmit your API key to our servers. Want enterprise features? <a href="#pricing" className="text-blue-600 font-semibold hover:underline">Contact us for custom solutions</a>.
          </p>
        </div>
      </div>
    </div>
  );
};