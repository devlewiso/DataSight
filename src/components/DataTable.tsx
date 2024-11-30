import React, { useState, useMemo } from 'react';
import { FileData, SortConfig, SortDirection } from '../types';
import { ArrowUpDown, ArrowUp, ArrowDown, Filter } from 'lucide-react';

interface Props {
  data: FileData;
}

export const DataTable: React.FC<Props> = ({ data }) => {
  const [sortConfig, setSortConfig] = useState<SortConfig>({ column: '', direction: null });
  const [columnFilters, setColumnFilters] = useState<Record<string, { value: string, type: string }>>({});

  const handleSort = (column: string) => {
    let direction: SortDirection = 'asc';
    
    if (sortConfig.column === column) {
      if (sortConfig.direction === 'asc') direction = 'desc';
      else if (sortConfig.direction === 'desc') direction = null;
    }
    
    setSortConfig({ column, direction });
  };

  const getSortIcon = (column: string) => {
    if (sortConfig.column !== column) return <ArrowUpDown className="h-4 w-4" />;
    if (sortConfig.direction === 'asc') return <ArrowUp className="h-4 w-4" />;
    if (sortConfig.direction === 'desc') return <ArrowDown className="h-4 w-4" />;
    return <ArrowUpDown className="h-4 w-4" />;
  };

  const sortedData = useMemo(() => {
    if (!sortConfig.direction) return data.content;

    return [...data.content].sort((a, b) => {
      const aVal = a[data.headers.indexOf(sortConfig.column)];
      const bVal = b[data.headers.indexOf(sortConfig.column)];

      if (aVal === bVal) return 0;
      if (aVal === null || aVal === '') return 1;
      if (bVal === null || bVal === '') return -1;

      const comparison = aVal < bVal ? -1 : 1;
      return sortConfig.direction === 'asc' ? comparison : -comparison;
    });
  }, [data, sortConfig]);

  const handleFilterChange = (column: string, value: string, type: string) => {
    setColumnFilters(prev => ({
      ...prev,
      [column]: { value, type }
    }));
  };

  const filteredData = useMemo(() => {
    return sortedData.filter(row => {
      return Object.entries(columnFilters).every(([column, filter]) => {
        const value = row[data.headers.indexOf(column)]?.toString().toLowerCase();
        const filterValue = filter.value.toLowerCase();
        
        if (!filterValue) return true;
        
        switch (filter.type) {
          case 'contains':
            return value?.includes(filterValue);
          case 'equals':
            return value === filterValue;
          case 'starts':
            return value?.startsWith(filterValue);
          case 'ends':
            return value?.endsWith(filterValue);
          case 'greater':
            return Number(value) > Number(filterValue);
          case 'less':
            return Number(value) < Number(filterValue);
          default:
            return true;
        }
      });
    });
  }, [sortedData, columnFilters, data.headers]);

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            {data.headers.map((header, i) => (
              <th key={i} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                <div className="flex flex-col space-y-2">
                  <button
                    onClick={() => handleSort(header)}
                    className="flex items-center gap-1 hover:text-gray-700"
                  >
                    {header}
                    {getSortIcon(header)}
                  </button>
                  <div className="flex items-center gap-2">
                    <select
                      className="text-xs border rounded px-1 py-0.5"
                      onChange={(e) => handleFilterChange(header, columnFilters[header]?.value || '', e.target.value)}
                      value={columnFilters[header]?.type || 'contains'}
                    >
                      <option value="contains">Contains</option>
                      <option value="equals">Equals</option>
                      <option value="starts">Starts with</option>
                      <option value="ends">Ends with</option>
                      <option value="greater">Greater than</option>
                      <option value="less">Less than</option>
                    </select>
                    <input
                      type="text"
                      placeholder="Filter..."
                      className="w-full text-xs border rounded px-2 py-1"
                      value={columnFilters[header]?.value || ''}
                      onChange={(e) => handleFilterChange(header, e.target.value, columnFilters[header]?.type || 'contains')}
                    />
                  </div>
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {filteredData.slice(0, 100).map((row, i) => (
            <tr key={i} className="hover:bg-gray-50">
              {row.map((cell: any, j: number) => (
                <td key={j} className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {cell?.toString() || '-'}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <div className="bg-gray-50 px-6 py-4 border-t">
        <p className="text-sm text-gray-500">
          Showing {Math.min(100, filteredData.length)} of {filteredData.length} rows
        </p>
      </div>
    </div>
  );
};