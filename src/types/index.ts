export interface FileData {
  fileName: string;
  content: any[];
  headers: string[];
}

export interface AnalysisResult {
  columnName: string;
  type: string;
  uniqueValues: number;
  nullCount: number;
  average?: number;
  min?: number | string;
  max?: number | string;
}

export interface Feature {
  title: string;
  description: string;
  icon: string;
}

export interface Testimonial {
  content: string;
  author: string;
  role: string;
  avatar: string;
}

export type SortDirection = 'asc' | 'desc' | null;

export interface SortConfig {
  column: string;
  direction: SortDirection;
}