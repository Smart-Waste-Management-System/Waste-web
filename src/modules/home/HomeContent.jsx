import React, { useState, useEffect } from 'react';
import Papa from 'papaparse';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const HomeContent = () => {
  const [data, setData] = useState([]);
  const [chartType, setChartType] = useState('line'); // State to store the chart type (line or bar)
  const [dateRange, setDateRange] = useState({ start: '2024-09-01 06:00:00', end: '2024-09-01 11:00:00' }); // Default date range
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    // Load CSV data
    Papa.parse('../../../public/Processed_Trash_Fill_Data.csv', {
      download: true,
      complete: (result) => {
        setData(result.data);
      },
      header: true, // Use header from CSV file for column names
    });
  }, []);

  useEffect(() => {
    // Filter data based on the selected date range
    const filtered = data.filter(row => {
      const timestamp = new Date(row.Timestamp);
      const startDate = new Date(dateRange.start);
      const endDate = new Date(dateRange.end);
      return timestamp >= startDate && timestamp <= endDate;
    });
    setFilteredData(filtered);
  }, [data, dateRange]);

  const handleChartTypeChange = (e) => {
    setChartType(e.target.value); // Update chart type
  };

  const handleDateRangeChange = (start, end) => {
    setDateRange({ start, end }); // Update date range
  };

  return (
    <div className="mx-auto p-6 bg-gray-50">
      <h1 className="text-3xl font-semibold text-center text-gray-800 mb-6">Dữ liệu thống kế thùng rác theo thời gian</h1>

      {/* Options for chart type and date range */}
      <div className="flex justify-between mb-6">
        <div>
          <label className="mr-2">Chart Type:</label>
          <select onChange={handleChartTypeChange} value={chartType} className="p-2 border rounded">
            <option value="line">Line Chart</option>
            <option value="bar">Bar Chart</option>
          </select>
        </div>
        <div>
          <label className="mr-2">Date Range:</label>
          <input 
            type="datetime-local" 
            value={dateRange.start}
            onChange={(e) => handleDateRangeChange(e.target.value, dateRange.end)} 
            className="p-2 border rounded"
          />
          <input 
            type="datetime-local" 
            value={dateRange.end}
            onChange={(e) => handleDateRangeChange(dateRange.start, e.target.value)} 
            className="p-2 border rounded ml-2"
          />
        </div>
      </div>

      {/* Table to display data */}
      <div className="overflow-x-auto shadow-lg rounded-lg border border-gray-200 mb-6">
        <div className="overflow-y-auto max-h-[500px]">
          <table className="min-w-full table-auto">
            <thead className="bg-blue-300 text-sm font-bold text-black sticky top-0 z-10">
              <tr>
                <th className="py-6 text-center">Timestamp</th>
                <th className="py-6 text-center">Weight(kg)</th>
                <th className="py-6 text-center">FilledLevel(%)</th>
                <th className="py-6 text-center">AirQuality</th>
                <th className="py-6 text-center">RemainingFill(%)</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.map((row, index) => (
                <tr key={index} className="odd:bg-white even:bg-blue-100">
                  <td className="py-2 text-center">{row.Timestamp}</td>
                  <td className="py-2 text-center">{row['Weight(kg)']}</td>
                  <td className="py-2 text-center">{row['FilledLevel(%)']}</td>
                  <td className="py-2 text-center">{row['AirQuality']}</td>
                  <td className="py-2 text-center">{row['RemainingFill(%)']}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Container for the three charts */}
      <div className="flex justify-between space-x-6">
        {/* Weight Chart */}
        <div className="w-full">
          <h2 className="text-xl font-bold mb-4 text-center">Weight(kg)</h2>
          {filteredData.length > 0 ? (
            <ResponsiveContainer width="100%" height={300}>
              {chartType === 'line' ? (
                <LineChart data={filteredData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="Timestamp" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="Weight(kg)" stroke="#8884d8" activeDot={{ r: 8 }} />
                </LineChart>
              ) : (
                <BarChart data={filteredData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="Timestamp" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="Weight(kg)" fill="#8884d8" />
                </BarChart>
              )}
            </ResponsiveContainer>
          ) : (
            <p>Loading data...</p>
          )}
        </div>

        {/* Filled Level Chart */}
        <div className="w-full">
          <h2 className="text-xl font-bold mb-4 text-center">Filled Level (%)</h2>
          {filteredData.length > 0 ? (
            <ResponsiveContainer width="100%" height={300}>
              {chartType === 'line' ? (
                <LineChart data={filteredData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="Timestamp" />
                  <YAxis domain={[0, 100]} />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="FilledLevel(%)" stroke="#82ca9d" activeDot={{ r: 8 }} />
                </LineChart>
              ) : (
                <BarChart data={filteredData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="Timestamp" />
                  <YAxis domain={[0, 100]} />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="FilledLevel(%)" fill="#82ca9d" />
                </BarChart>
              )}
            </ResponsiveContainer>
          ) : (
            <p>Loading data...</p>
          )}
        </div>

        {/* Air Quality Chart */}
        <div className="w-full">
          <h2 className="text-xl font-bold mb-4 text-center">Air Quality</h2>
          {filteredData.length > 0 ? (
            <ResponsiveContainer width="100%" height={300}>
              {chartType === 'line' ? (
                <LineChart data={filteredData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="Timestamp" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="AirQuality" stroke="#ff7300" activeDot={{ r: 8 }} />
                </LineChart>
              ) : (
                <BarChart data={filteredData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="Timestamp" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="AirQuality" fill="#ff7300" />
                </BarChart>
              )}
            </ResponsiveContainer>
          ) : (
            <p>Loading data...</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default HomeContent;
