import Papa from 'papaparse';
import * as XLSX from 'xlsx';
import { FileData } from '../types';
import toast from 'react-hot-toast';

const MAX_FILE_SIZE = 50 * 1024 * 1024; // 50MB

export const validateFile = (file: File): boolean => {
  if (!file) {
    toast.error('No file selected');
    return false;
  }

  if (file.size > MAX_FILE_SIZE) {
    toast.error('File size exceeds 50MB limit');
    return false;
  }

  const extension = file.name.toLowerCase().split('.').pop();
  if (!['csv', 'xlsx', 'xls'].includes(extension || '')) {
    toast.error('Unsupported file format. Please use CSV, XLSX, or XLS files');
    return false;
  }

  return true;
};

export const parseCSV = (file: File): Promise<FileData> => {
  return new Promise((resolve, reject) => {
    Papa.parse(file, {
      complete: (results) => {
        try {
          if (results.errors && results.errors.length > 0) {
            throw new Error(results.errors[0].message || 'Error parsing CSV file');
          }
        
          const data = results.data as string[][];
          if (!data || data.length < 2) {
            throw new Error('File is empty or has no data rows');
          }

          // Filter out empty rows and validate headers
          const headers = data[0].map(header => header?.trim() || '');
          if (headers.some(header => !header)) {
            throw new Error('Invalid or empty column headers detected');
          }

          const content = data.slice(1).filter(row => 
            row.length === headers.length && row.some(cell => cell !== '')
          );

          if (content.length === 0) {
            throw new Error('No valid data rows found');
          }

          resolve({
            fileName: file.name,
            headers,
            content
          });
        } catch (error) {
          reject(error);
        }
      },
      error: (error) => reject(new Error(error.message || 'Failed to parse CSV file')),
      skipEmptyLines: true,
      transformHeader: (header) => header?.trim() || ''
    });
  });
};

export const parseExcel = async (file: File): Promise<FileData> => {
  try {
    const buffer = await file.arrayBuffer();
    const workbook = XLSX.read(buffer, { type: 'array' });
    
    if (!workbook || workbook.SheetNames.length === 0) {
      throw new Error('No sheets found in the workbook');
    }
    
    const firstSheet = workbook.Sheets[workbook.SheetNames[0]];
    if (!firstSheet) {
      throw new Error('First sheet is empty');
    }

    const data = XLSX.utils.sheet_to_json(firstSheet, { 
      header: 1,
      defval: '',
      blankrows: false
    }) as any[][];
    
    if (!data || data.length < 2) {
      throw new Error('File is empty or has no data rows');
    }

    // Validate and clean headers
    const headers = data[0].map(header => String(header || '').trim());
    if (headers.some(header => !header)) {
      throw new Error('Invalid or empty column headers detected');
    }

    // Filter and validate content
    const content = data.slice(1).filter(row => 
      row.length === headers.length && row.some(cell => cell !== undefined && cell !== '')
    );

    if (content.length === 0) {
      throw new Error('No valid data rows found');
    }

    return {
      fileName: file.name,
      headers,
      content: content.map(row => 
        row.map(cell => (cell === undefined || cell === null) ? '' : String(cell))
      )
    };
  } catch (error) {
    console.error('Excel parsing error:', error);
    throw new Error(error instanceof Error ? error.message : 'Failed to parse Excel file');
  }
};