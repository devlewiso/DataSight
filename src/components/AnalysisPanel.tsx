import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { AnalysisResult } from '../types';

interface Props {
  analysis: AnalysisResult[];
}

export const AnalysisPanel: React.FC<Props> = ({ analysis }) => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {analysis.map((result, index) => (
          <div key={index} className="bg-white p-4 rounded-lg shadow">
            <h3 className="font-semibold text-lg mb-2">{result.columnName}</h3>
            <dl className="space-y-1">
              <div className="flex justify-between">
                <dt className="text-gray-500">Type:</dt>
                <dd>{result.type}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-gray-500">Unique Values:</dt>
                <dd>{result.uniqueValues}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-gray-500">Null Count:</dt>
                <dd>{result.nullCount}</dd>
              </div>
              {result.average !== undefined && (
                <div className="flex justify-between">
                  <dt className="text-gray-500">Average:</dt>
                  <dd>{result.average.toFixed(2)}</dd>
                </div>
              )}
              {result.min !== undefined && (
                <div className="flex justify-between">
                  <dt className="text-gray-500">Min:</dt>
                  <dd>{result.min}</dd>
                </div>
              )}
              {result.max !== undefined && (
                <div className="flex justify-between">
                  <dt className="text-gray-500">Max:</dt>
                  <dd>{result.max}</dd>
                </div>
              )}
            </dl>
          </div>
        ))}
      </div>
      
      <div className="h-64 bg-white p-4 rounded-lg shadow">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={analysis}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="columnName" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="uniqueValues" fill="#8884d8" name="Unique Values" />
            <Bar dataKey="nullCount" fill="#82ca9d" name="Null Count" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};