import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, Shield, AlertCircle } from 'lucide-react';
import { FileData } from '../types';
import { parseCSV, parseExcel, validateFile } from '../utils/fileHandlers';
import toast from 'react-hot-toast';

interface Props {
  onFileLoad: (data: FileData) => void;
}

export const FileUploader: React.FC<Props> = ({ onFileLoad }) => {
  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (!file) return;

    try {
      if (!validateFile(file)) return;

      const toastId = toast.loading('Processing file securely...');
      const extension = file.name.toLowerCase().split('.').pop();
      let fileData: FileData | null = null;

      try {
        if (extension === 'csv') {
          fileData = await parseCSV(file);
        } else if (['xlsx', 'xls'].includes(extension || '')) {
          fileData = await parseExcel(file);
        }

        if (fileData) {
          toast.success('File processed securely', { id: toastId });
          onFileLoad(fileData);
        } else {
          throw new Error('Failed to process file');
        }
      } catch (error) {
        toast.error(
          error instanceof Error ? error.message : 'Failed to process file',
          { id: toastId }
        );
      }
    } catch (error) {
      console.error('Error processing file:', error);
      toast.error(error instanceof Error ? error.message : 'Error processing file');
    }
  }, [onFileLoad]);

  const { getRootProps, getInputProps, isDragActive, open } = useDropzone({
    onDrop,
    accept: {
      'text/csv': ['.csv'],
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': ['.xlsx'],
      'application/vnd.ms-excel': ['.xls']
    },
    multiple: false,
    noClick: true,
    noKeyboard: true
  });

  return (
    <div className="space-y-6">
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 flex items-start gap-3">
        <Shield className="h-5 w-5 text-blue-500 mt-0.5 flex-shrink-0" />
        <div>
          <h4 className="font-medium text-blue-900">Secure File Processing</h4>
          <p className="text-blue-700 text-sm mt-1">
            Your files are processed entirely in your browser. No data is ever uploaded to our servers,
            ensuring complete privacy and security of your information.
          </p>
        </div>
      </div>

      <div
        {...getRootProps()}
        className={`border-2 border-dashed rounded-lg p-12 text-center transition-colors
          ${isDragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300'}`}
      >
        <div className="max-w-xl mx-auto">
          <Upload className="mx-auto h-16 w-16 text-blue-500 mb-4" />
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            {isDragActive ? 'Drop your file here' : 'Upload your data file'}
          </h3>
          <p className="text-gray-600 mb-6">
            Support for CSV, XLSX, and XLS files (max 50MB)
          </p>
          <input {...getInputProps()} />
          <button
            onClick={open}
            type="button"
            className="px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Select File
          </button>
        </div>
      </div>

      <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 flex items-start gap-3">
        <AlertCircle className="h-5 w-5 text-amber-500 mt-0.5 flex-shrink-0" />
        <div>
          <h4 className="font-medium text-amber-900">File Safety Tips</h4>
          <ul className="text-amber-700 text-sm mt-1 list-disc list-inside space-y-1">
            <li>Only upload files from trusted sources</li>
            <li>Ensure your files don't contain sensitive personal information</li>
            <li>Keep your browser updated for optimal security</li>
          </ul>
        </div>
      </div>
    </div>
  );
};