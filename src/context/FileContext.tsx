import React, { createContext, useContext, useState, ReactNode } from 'react';
import { FileData, AnalysisResult } from '../types';

interface FileContextType {
    fileData: FileData | null;
    setFileData: (data: FileData | null) => void;
    analysis: AnalysisResult[];
    setAnalysis: (analysis: AnalysisResult[]) => void;
    isChatOpen: boolean;
    setIsChatOpen: (isOpen: boolean) => void;
}

const FileContext = createContext<FileContextType | undefined>(undefined);

export const FileProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [fileData, setFileData] = useState<FileData | null>(null);
    const [analysis, setAnalysis] = useState<AnalysisResult[]>([]);
    const [isChatOpen, setIsChatOpen] = useState(false);

    return (
        <FileContext.Provider value={{
            fileData,
            setFileData,
            analysis,
            setAnalysis,
            isChatOpen,
            setIsChatOpen
        }}>
            {children}
        </FileContext.Provider>
    );
};

export const useFileContext = () => {
    const context = useContext(FileContext);
    if (context === undefined) {
        throw new Error('useFileContext must be used within a FileProvider');
    }
    return context;
};
