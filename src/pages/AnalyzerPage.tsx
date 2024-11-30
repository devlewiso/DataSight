import React, { useState } from 'react';
import { FileUploader } from '../components/FileUploader';
import { DataTable } from '../components/DataTable';
import { AnalysisPanel } from '../components/AnalysisPanel';
import { FileData, AnalysisResult } from '../types';
import { analyzeColumn } from '../utils/analysis';
import { FileSpreadsheet } from 'lucide-react';
import { Link } from 'react-router-dom';

export const AnalyzerPage: React.FC = () => {
  const [fileData, setFileData] = useState<FileData | null>(null);
  const [analysis, setAnalysis] = useState<AnalysisResult[]>([]);

  const handleFileLoad = (data: FileData) => {
    setFileData(data);
    const columnAnalysis = data.headers.map((header, index) =>
      analyzeColumn(data.content, index, header)
    );
    setAnalysis(columnAnalysis);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <Link to="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
            <FileSpreadsheet className="h-8 w-8 text-blue-600" />
            <h1 className="text-3xl font-bold text-gray-900">DataSight</h1>
          </Link>
        </div>

        {!fileData ? (
          <FileUploader onFileLoad={handleFileLoad} />
        ) : (
          <div className="space-y-8">
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="p-6 border-b">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h2 className="text-xl font-semibold text-gray-900">
                      {fileData.fileName}
                    </h2>
                    <p className="text-sm text-gray-500 mt-1">
                      {fileData.content.length} rows × {fileData.headers.length} columns
                    </p>
                  </div>
                  <button
                    onClick={() => setFileData(null)}
                    className="px-4 py-2 text-sm text-gray-600 hover:text-gray-900 transition-colors"
                  >
                    Upload New File
                  </button>
                </div>
              </div>
              <DataTable data={fileData} />
            </div>

            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Column Analysis</h2>
              <AnalysisPanel analysis={analysis} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};