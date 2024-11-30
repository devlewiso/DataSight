import React from 'react';
import { FileSpreadsheet, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Hero: React.FC = () => {
  return (
    <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
      <div className="max-w-7xl mx-auto px-4 py-24 sm:px-6 lg:px-8">
        <div className="text-center">
          <FileSpreadsheet className="h-16 w-16 mx-auto mb-8 text-blue-200" />
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            DataSight
          </h1>
          <p className="text-xl md:text-2xl text-blue-100 mb-4">
            Powerful Data Analysis Made Simple
          </p>
          <p className="text-lg text-blue-100 mb-12 max-w-3xl mx-auto">
            Upload your CSV or Excel files and get instant insights with our advanced analytics tools.
            No coding required.
          </p>
          <Link
            to="/analyze"
            className="inline-flex items-center px-8 py-4 bg-white text-blue-600 rounded-lg font-semibold text-lg hover:bg-blue-50 transition-colors"
          >
            Start Analyzing
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </div>
      </div>
    </div>
  );
};