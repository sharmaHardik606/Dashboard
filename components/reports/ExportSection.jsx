'use client';

import { useState } from 'react';

export default function ExportSection({
  title = '',
  defaultStartDate,
  defaultEndDate,
  filters = [],
  onExport,
}) {
  const [startDate, setStartDate] = useState(defaultStartDate);
  const [endDate, setEndDate] = useState(defaultEndDate);
  const [format, setFormat] = useState('pdf');

  const [filterValues, setFilterValues] = useState(() =>
    filters.reduce((acc, f) => ({ ...acc, [f.name]: f.options[0] }), {})
  );

  const handleExport = () => {
    onExport({
      startDate,
      endDate,
      format,
      ...filterValues,
    });
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow space-y-6">
      <h2 className="text-xl font-semibold">{title}</h2>

      {/* Date Range */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block mb-1 font-medium">Start Date</label>
          <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} className="w-full border rounded px-3 py-2" />
        </div>
        <div>
          <label className="block mb-1 font-medium">End Date</label>
          <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} className="w-full border rounded px-3 py-2" />
        </div>
      </div>

      {/* Dynamic Filters */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filters.map((filter) => (
          <div key={filter.name}>
            <label className="block mb-1 font-medium">{filter.label}</label>
            <select
              value={filterValues[filter.name]}
              onChange={(e) => setFilterValues(prev => ({ ...prev, [filter.name]: e.target.value }))}
              className="w-full border rounded px-3 py-2"
            >
              {filter.options.map((opt) => (
                <option key={opt} value={opt}>{opt}</option>
              ))}
            </select>
          </div>
        ))}
      </div>

      {/* Format */}
      <div>
        <p className="font-medium mb-2">Output Format</p>
        <div className="flex items-center gap-4">
          <label className="flex items-center gap-2">
            <input type="radio" name="format" value="csv" onChange={() => setFormat('csv')} />
            Excel (CSV)
          </label>
          <label className="flex items-center gap-2">
            <input type="radio" name="format" value="pdf" checked={format === 'pdf'} onChange={() => setFormat('pdf')} />
            PDF
          </label>
        </div>
      </div>

      {/* Buttons */}
      <div className="flex justify-end gap-4">
        <button className="px-4 py-2 rounded border" onClick={() => window.location.reload()}>Reset</button>
        <button className="px-4 py-2 rounded bg-blue-600 text-white" onClick={handleExport}>Generate & Export</button>
      </div>
    </div>
  );
}
