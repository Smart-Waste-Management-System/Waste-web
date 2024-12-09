import React, { useState, useEffect } from 'react';
import { BarChart, LineChart, AreaChart, Bar, Line, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import Papa from 'papaparse';
import moment from 'moment';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

function HomeContent() {
  const today = new Date();
  const [trashData, setTrashData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [selectedDay, setSelectedDay] = useState(today); 
  const [chartType, setChartType] = useState('BarChart'); // Dạng biểu đồ mặc định

  const fetchCSVData = async () => {
    try {
      const response = await fetch('https://raw.githubusercontent.com/congmanh18/Waste-backend/master/machine_learning/Processed_Trash_Fill_Data2.csv');
      if (!response.ok) {
        throw new Error('Failed to fetch CSV');
      }
      const reader = response.body.getReader();
      const result = await reader.read();
      const decoder = new TextDecoder('utf-8');
      const csvData = decoder.decode(result.value);
      return csvData;
    } catch (error) {
      console.error("Error fetching the CSV data", error);
      alert("Failed to load data, please try again later.");
      return null;
    }
  };

  const processCSV = async () => {
    const csv = await fetchCSVData();
    if (csv) {
      Papa.parse(csv, {
        header: true,
        complete: (result) => {
          const parsedData = result.data
            .filter(item => item.Timestamp && item["FilledLevel(%)"] && item["Weight(kg)"] && item["AirQuality"] && item["RemainingFill(%)"])
            .map((item) => ({
              ...item,
              Timestamp: moment(item.Timestamp).format('YYYY-MM-DD HH:mm'),
            }));
          setTrashData(parsedData);

          const todayFormatted = moment(today).format('YYYY-MM-DD');
          const dataForToday = parsedData.filter(item => item.Timestamp.startsWith(todayFormatted));
          setFilteredData(dataForToday);
        },
      });
    }
  };

  useEffect(() => {
    processCSV();
  }, []);

  const handleDayChange = (date) => {
    setSelectedDay(date);
    const day = moment(date).format('YYYY-MM-DD');
    const dataForDay = trashData.filter(item => item.Timestamp.startsWith(day));
    setFilteredData(dataForDay);
  };

  const renderChart = (dataKey, fill, chartTitle) => {
    let ChartComponent;
    let ChartElement;

    switch (chartType) {
      case 'LineChart':
        ChartComponent = LineChart;
        ChartElement = <Line dataKey={dataKey} stroke={fill} />;
        break;
      case 'AreaChart':
        ChartComponent = AreaChart;
        ChartElement = <Area dataKey={dataKey} fill={fill} stroke={fill} />;
        break;
      case 'BarChart':
      default:
        ChartComponent = BarChart;
        ChartElement = <Bar dataKey={dataKey} fill={fill} />;
    }

    return (
      <div className="h-96">
        <h3 className="text-center text-lg font-semibold">{chartTitle}</h3>
        <ResponsiveContainer width="100%" height="100%">
          <ChartComponent data={filteredData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey={(item) => moment(item.Timestamp).format('HH:mm')} /> 
            {chartTitle === "Filled Level" ? <YAxis domain={[0, 100]} /> : <YAxis />}
            {chartTitle === "Air Quality" ? <YAxis domain={[0, 12]} /> : <YAxis />}
            {chartTitle === "Weight" ? <YAxis domain={[0, 20]} /> : <YAxis />}
            {chartTitle === "Remaining Fill Level" ? <YAxis domain={[0, 100]} /> : <YAxis />}
            <YAxis />
            <Tooltip />
            <Legend />
            {ChartElement}
          </ChartComponent>
        </ResponsiveContainer>
      </div>
    );
  };

  return (
    <div className="flex flex-col w-full h-full p-4">
      <div className="flex flex-row justify-start items-center space-x-4 mt-4">
        <label className="text-lg">Select Day: </label>
        <DatePicker
          selected={selectedDay}
          onChange={handleDayChange}
          dateFormat="yyyy-MM-dd"
          className="border border-gray-300 rounded px-2 py-1"
          placeholderText="-- Select Day --"
        />
      </div>

      <div className="flex flex-row justify-start items-center space-x-4 mt-4">
        <label className="text-lg">Select Chart Type: </label>
        <select 
          value={chartType}
          onChange={(e) => setChartType(e.target.value)}
          className="border border-gray-300 rounded px-2 py-1"
        >
          <option value="BarChart">Bar Chart</option>
          <option value="LineChart">Line Chart</option>
          <option value="AreaChart">Area Chart</option>
        </select>
      </div>

      {selectedDay && (
        <div className="grid grid-cols-2 gap-4 w-full mt-8">
          {renderChart("FilledLevel(%)", "#82ca9d", "Filled Level")}
          {renderChart("Weight(kg)", "#0088FE", "Weight")}
          {renderChart("AirQuality", "#FFBB28", "Air Quality")}
          {renderChart("RemainingFill(%)", "#FF8042", "Remaining Fill Level")}
        </div>
      )}
    </div>
  );
}

export default HomeContent;
