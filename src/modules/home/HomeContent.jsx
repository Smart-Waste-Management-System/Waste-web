import React, { useState, useEffect } from 'react';
import Papa from 'papaparse';
import { LineChart, Line, BarChart, Bar, AreaChart, Area, ScatterChart, Scatter, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const HomeContent = () => {
  const [data, setData] = useState([]);
  const [chartType, setChartType] = useState('line'); // State to store the chart type (line, bar, area, scatter, pie)
  const [dateRange, setDateRange] = useState({ start: '2024-12-21 06:00:00', end: '2024-12-23 11:00:00' }); // Default date range
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    // Load CSV data
    Papa.parse('/Processed_Trash_Fill_Data_Updated_Scaled.csv', {
      download: true,
      complete: (result) => {
        setData(result.data);
      },
      header: true,
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
      <h1 className="text-3xl font-semibold text-center text-gray-800 mb-6"><strong>Dữ liệu thống kê thùng rác theo thời gian</strong></h1>

      {/* Options for chart type and date range */}
      <div className="flex justify-between mb-6">
        <div>
          <label className="font-bold mb-4 text-center">Loại biểu đồ: </label>
          <select onChange={handleChartTypeChange} value={chartType} className="p-2 border rounded">
            <option value="line">Line</option>
            <option value="bar">Bar</option>
            <option value="area">Area</option>
          </select>
        </div>
        <div>
          <label className="font-bold mb-4 text-center">Khoảng thời gian: </label>
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
                <th className="py-6 text-center">Thời gian</th>
                <th className="py-6 text-center">Trọng lượng (kg)</th>
                <th className="py-6 text-center">Mức độ đầy (%)</th>
                <th className="py-6 text-center">Chất lượng không khí</th>
                <th className="py-6 text-center">Mức độ còn lại (%)</th>
                <th className="py-6 text-center">Tốc độ lấp đầy (%)/(s)</th>  
                <th className="py-6 text-center">Thời gian lấp đầy ước tính (s)</th>         
              </tr>
            </thead>
            <tbody>
              {filteredData.map((row, index) => (
                <tr key={index} className="odd:bg-white even:bg-blue-100">
                  <td className="py-2 text-center">{row.Timestamp}</td>
                  <td className="py-2 text-center">{parseFloat(row['Weight(kg)']).toFixed(2)}</td>
                  <td className="py-2 text-center">{parseFloat(row['FilledLevel(%)']).toFixed(2)}</td>
                  <td className="py-2 text-center">{row['AirQuality']}</td>
                  <td className="py-2 text-center">{parseFloat(row['RemainingFill(%)']).toFixed(2)}</td>
                  <td className="py-2 text-center">~{parseFloat(row['FillRate(%)_per_second']).toFixed(5)}</td>
                  <td className="py-2 text-center">~{parseFloat(row['EstimatedTimeToFull(s)']).toFixed(5)}</td>                
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
          <h2 className="text-xl font-bold mb-4 text-center">Cân nặng (kg)</h2>
          {filteredData.length > 0 ? (
            <ResponsiveContainer width="100%" height={300}>
              {chartType === 'line' ? (
                <LineChart data={filteredData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="Timestamp" />
                  <YAxis domain={[0, 20]}/>
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="Weight(kg)" stroke="#8884d8" activeDot={{ r: 8 }} />
                </LineChart>
              ) : chartType === 'bar' ? (
                <BarChart data={filteredData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="Timestamp" />
                  <YAxis domain={[0, 20]}/>
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="Weight(kg)" fill="#8884d8" />
                </BarChart>
              ) : (
                <AreaChart data={filteredData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="Timestamp" />
                  <YAxis domain={[0, 20]}/>
                  <Tooltip />
                  <Legend />
                  <Area type="monotone" dataKey="Weight(kg)" stroke="#8884d8" fill="#8884d8" />
                </AreaChart>
              )}
            </ResponsiveContainer>
          ) : (
            <p>Loading data...</p>
          )}
        </div>

        {/* Filled Level Chart */}
        <div className="w-full">
          <h2 className="text-xl font-bold mb-4 text-center">Mức độ đầy (%)</h2>
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
              ) : chartType === 'bar' ? (
                <BarChart data={filteredData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="Timestamp" />
                  <YAxis domain={[0, 100]} />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="FilledLevel(%)" fill="#82ca9d" />
                </BarChart>
              ) : (
                <AreaChart data={filteredData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="Timestamp" />
                  <YAxis domain={[0, 100]} />
                  <Tooltip />
                  <Legend />
                  <Area type="monotone" dataKey="FilledLevel(%)" stroke="#82ca9d" fill="#82ca9d" />
                </AreaChart>
              )}
            </ResponsiveContainer>
          ) : (
            <p>Loading data...</p>
          )}
        </div>

        {/* Air Quality Chart */}
        <div className="w-full">
          <h2 className="text-xl font-bold mb-4 text-center">Chất lượng không khí</h2>
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
              ) : chartType === 'bar' ? (
                <BarChart data={filteredData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="Timestamp" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="AirQuality" fill="#ff7300" />
                </BarChart>
              ) : (
                <AreaChart data={filteredData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="Timestamp" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Area type="monotone" dataKey="AirQuality" stroke="#ff7300" fill="#ff7300" />
                </AreaChart>
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