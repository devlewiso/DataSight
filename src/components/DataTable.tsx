import React, { useState, useMemo } from 'react';
import { FileData, SortConfig, SortDirection } from '../types';
import { ArrowUpDown, ArrowUp, ArrowDown, Filter, X, Plus, ChevronDown } from 'lucide-react';

interface Props {
  data: FileData;
}

export const DataTable: React.FC<Props> = ({ data }) => {
  const [sortConfig, setSortConfig] = useState<SortConfig>({ column: '', direction: null });
  const [columnFilters, setColumnFilters] = useState<Record<string, { value: string, type: string }>>({});
  const [visibleColumns, setVisibleColumns] = useState<Set<string>>(new Set(data.headers));
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(100);
  const [showColumnSelector, setShowColumnSelector] = useState(false);

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
    setCurrentPage(1); // Reset to first page on filter change
  };

  const toggleColumn = (column: string) => {
    const newVisible = new Set(visibleColumns);
    if (newVisible.has(column)) {
      newVisible.delete(column);
    } else {
      newVisible.add(column);
    }
    setVisibleColumns(newVisible);
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

  const paginatedData = useMemo(() => {
    const start = (currentPage - 1) * rowsPerPage;
    return filteredData.slice(start, start + rowsPerPage);
  }, [filteredData, currentPage, rowsPerPage]);

  const totalPages = Math.ceil(filteredData.length / rowsPerPage);

  return (
    <div className="space-y-4">
      {/* Filter Toolbar */}
      <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Filter className="h-5 w-5 text-blue-600" />
            <h3 className="font-medium text-gray-900">Filters & View Options</h3>
          </div>
          <div className="relative">
            <button
              onClick={() => setShowColumnSelector(!showColumnSelector)}
              className="px-3 py-1.5 text-sm border rounded-md hover:bg-gray-50 flex items-center gap-2"
            >
              Columns ({visibleColumns.size}/{data.headers.length})
              <ChevronDown className="h-4 w-4" />
            </button>
            {showColumnSelector && (
              <div className="absolute right-0 top-full mt-1 w-64 bg-white border rounded-lg shadow-xl z-20 p-2 max-h-60 overflow-y-auto">
                <div className="space-y-1">
                  {data.headers.map(header => (
                    <label key={header} className="flex items-center gap-2 px-2 py-1.5 hover:bg-gray-50 rounded cursor-pointer">
                      <input
                        type="checkbox"
                        checked={visibleColumns.has(header)}
                        onChange={() => toggleColumn(header)}
                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                      <span className="text-sm text-gray-700 truncate">{header}</span>
                    </label>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="flex flex-wrap gap-3 items-end">
          <div className="flex flex-col gap-1">
            <label className="text-xs font-medium text-gray-500">Column</label>
            <select
              className="text-sm border rounded-md px-3 py-2 bg-gray-50 focus:ring-2 focus:ring-blue-500 outline-none min-w-[150px]"
              id="filter-column-select"
            >
              {data.headers.map(header => (
                <option key={header} value={header}>{header}</option>
              ))}
            </select>
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-xs font-medium text-gray-500">Condition</label>
            <select
              className="text-sm border rounded-md px-3 py-2 bg-gray-50 focus:ring-2 focus:ring-blue-500 outline-none min-w-[120px]"
              id="filter-type-select"
            >
              <option value="contains">Contains</option>
              <option value="equals">Equals</option>
              <option value="starts">Starts with</option>
              <option value="ends">Ends with</option>
              <option value="greater">Greater than</option>
              <option value="less">Less than</option>
            </select>
          </div>

          <div className="flex flex-col gap-1 flex-1 min-w-[200px]">
            <label className="text-xs font-medium text-gray-500">Value</label>
            <input
              type="text"
              placeholder="Filter value..."
              className="text-sm border rounded-md px-3 py-2 bg-gray-50 focus:ring-2 focus:ring-blue-500 outline-none w-full"
              id="filter-value-input"
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  const col = (document.getElementById('filter-column-select') as HTMLSelectElement).value;
                  const type = (document.getElementById('filter-type-select') as HTMLSelectElement).value;
                  const val = (e.currentTarget as HTMLInputElement).value;
                  if (val) {
                    handleFilterChange(col, val, type);
                    (e.currentTarget as HTMLInputElement).value = '';
                  }
                }
              }}
            />
          </div>

          <button
            onClick={() => {
              const colSelect = document.getElementById('filter-column-select') as HTMLSelectElement;
              const typeSelect = document.getElementById('filter-type-select') as HTMLSelectElement;
              const valInput = document.getElementById('filter-value-input') as HTMLInputElement;

              if (valInput.value) {
                handleFilterChange(colSelect.value, valInput.value, typeSelect.value);
                valInput.value = '';
              }
            }}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors text-sm font-medium flex items-center gap-2"
          >
            <Plus className="h-4 w-4" />
            Add Filter
          </button>
        </div>

        {/* Active Filters */}
        {Object.entries(columnFilters).length > 0 && (
          <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-gray-100">
            {Object.entries(columnFilters).map(([column, filter]) => (
              <div key={column} className="flex items-center gap-2 bg-blue-50 text-blue-700 px-3 py-1.5 rounded-full text-sm border border-blue-100">
                <span className="font-medium">{column}</span>
                <span className="text-blue-400 text-xs">•</span>
                <span className="text-xs uppercase tracking-wide opacity-75">{filter.type}</span>
                <span className="text-blue-400 text-xs">•</span>
                <span className="font-medium">"{filter.value}"</span>
                <button
                  onClick={() => {
                    const newFilters = { ...columnFilters };
                    delete newFilters[column];
                    setColumnFilters(newFilters);
                  }}
                  className="ml-1 hover:bg-blue-100 rounded-full p-0.5 transition-colors"
                >
                  <X className="h-3 w-3" />
                </button>
              </div>
            ))}
            <button
              onClick={() => setColumnFilters({})}
              className="text-xs text-gray-500 hover:text-gray-700 underline ml-2"
            >
              Clear all
            </button>
          </div>
        )}
      </div>

      <div className="overflow-auto max-h-[70vh] border border-gray-200 rounded-lg shadow-sm bg-white">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50 sticky top-0 z-10 shadow-sm">
            <tr>
              {data.headers.map((header, i) => (
                visibleColumns.has(header) && (
                  <th key={i} className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider whitespace-nowrap bg-gray-50 hover:bg-gray-100 transition-colors cursor-pointer" onClick={() => handleSort(header)}>
                    <div className="flex items-center gap-2">
                      {header}
                      {getSortIcon(header)}
                    </div>
                  </th>
                )
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {paginatedData.map((row, i) => (
              <tr key={i} className="hover:bg-gray-50 transition-colors">
                {row.map((cell: any, j: number) => (
                  visibleColumns.has(data.headers[j]) && (
                    <td key={j} className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      {cell?.toString() || '-'}
                    </td>
                  )
                ))}
              </tr>
            ))}
          </tbody>
        </table>
        <div className="bg-gray-50 px-6 py-4 border-t sticky bottom-0 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <p className="text-sm text-gray-500">
              Showing {((currentPage - 1) * rowsPerPage) + 1} to {Math.min(currentPage * rowsPerPage, filteredData.length)} of {filteredData.length} rows
            </p>
            <select
              value={rowsPerPage}
              onChange={(e) => {
                setRowsPerPage(Number(e.target.value));
                setCurrentPage(1);
              }}
              className="text-sm border rounded px-2 py-1 bg-white"
            >
              <option value={10}>10 rows</option>
              <option value={25}>25 rows</option>
              <option value={50}>50 rows</option>
              <option value={100}>100 rows</option>
              <option value={500}>500 rows</option>
            </select>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="px-3 py-1 border rounded text-sm hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Previous
            </button>
            <span className="text-sm text-gray-600">
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="px-3 py-1 border rounded text-sm hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};