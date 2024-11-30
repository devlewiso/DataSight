import React from 'react';
import { FileType, BarChart2, Table, FileSearch, Shield, Zap } from 'lucide-react';
import { Feature } from '../../types';

const features: Feature[] = [
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
  FileType, BarChart2, Table, FileSearch, Shield, Zap
};

export const Features: React.FC = () => {
  return (
    <div className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Everything You Need for Data Analysis
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Our powerful tools help you understand your data better and make informed decisions.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = IconComponent[feature.icon];
            return (
              <div
                key={index}
                className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                  <Icon className="h-6 w-6 text-blue-600" />
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
      </div>
    </div>
  );
};