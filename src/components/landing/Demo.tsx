import React from 'react';
import { LineChart, Line, AreaChart, Area, ResponsiveContainer } from 'recharts';

const demoData = Array.from({ length: 12 }, (_, i) => ({
  name: `Month ${i + 1}`,
  value: Math.floor(Math.random() * 100) + 20,
  trend: Math.floor(Math.random() * 80) + 10
}));

export const Demo: React.FC = () => {
  return (
    <div className="bg-white py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Powerful Visualization Tools
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Transform your raw data into meaningful insights with our interactive charts and graphs.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <h3 className="text-lg font-semibold mb-4">Trend Analysis</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={demoData}>
                  <Line type="monotone" dataKey="value" stroke="#4F46E5" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-lg">
            <h3 className="text-lg font-semibold mb-4">Distribution Overview</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={demoData}>
                  <Area type="monotone" dataKey="trend" fill="#818CF8" fillOpacity={0.3} stroke="#4F46E5" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};