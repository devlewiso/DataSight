import { AnalysisResult } from '../types';

export const analyzeColumn = (data: any[], columnIndex: number, header: string): AnalysisResult => {
  const values = data.map(row => row[columnIndex]).filter(val => val !== undefined && val !== '');
  const type = inferColumnType(values);
  
  return {
    columnName: header,
    type,
    uniqueValues: new Set(values).size,
    nullCount: data.length - values.length,
    ...(type === 'number' && {
      average: calculateAverage(values),
      min: Math.min(...values),
      max: Math.max(...values)
    }),
    ...(type === 'string' && {
      min: values.sort()[0],
      max: values.sort()[values.length - 1]
    })
  };
};

const inferColumnType = (values: any[]): string => {
  const sample = values.find(v => v !== null && v !== undefined);
  if (typeof sample === 'number') return 'number';
  if (!isNaN(Date.parse(sample))) return 'date';
  return 'string';
};

const calculateAverage = (numbers: number[]): number => {
  return numbers.reduce((acc, val) => acc + val, 0) / numbers.length;
};