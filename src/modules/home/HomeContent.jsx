import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import Papa from 'papaparse';
import moment from 'moment';

function HomeContent() {
  const [trashData, setTrashData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [months, setMonths] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState('');
  const [days, setDays] = useState([]);
  const [selectedDay, setSelectedDay] = useState('');

  const fetchCSVData = async () => {
    const response = await fetch('https://raw.githubusercontent.com/congmanh18/Waste-backend/master/machine_learning/Processed_Trash_Fill_Data.csv');
    const reader = response.body.getReader();
    const result = await reader.read();
    const decoder = new TextDecoder('utf-8');
    const csvData = decoder.decode(result.value);
    return csvData;
  };

  const processCSV = async () => {
    const csv = await fetchCSVData();
    Papa.parse(csv, {
      header: true,
      complete: (result) => {
        const parsedData = result.data.map((item) => ({
          ...item,
          Timestamp: moment(item.Timestamp).format('YYYY-MM-DD HH:mm'),
        }));
        setTrashData(parsedData);

        const uniqueMonths = [...new Set(parsedData.map(item => moment(item.Timestamp).format('YYYY-MM')))];
        setMonths(uniqueMonths);
      },
    });
  };

  useEffect(() => {
    processCSV();
  }, []);

  const handleMonthChange = (event) => {
    const month = event.target.value;
    setSelectedMonth(month);

    const daysInMonth = trashData
      .filter(item => moment(item.Timestamp).format('YYYY-MM') === month)
      .map(item => moment(item.Timestamp).format('YYYY-MM-DD'));

    const uniqueDays = [...new Set(daysInMonth)];
    setDays(uniqueDays);
    setFilteredData([]);
    setSelectedDay('');
  };

  const handleDayChange = (event) => {
    const day = event.target.value;
    setSelectedDay(day);

    const dataForDay = trashData.filter(item => item.Timestamp.startsWith(day));
    setFilteredData(dataForDay);
  };

  return (
    <div className="flex flex-col w-full h-full p-4">
      {/* <h2 className="text-center text-2xl font-bold">Thống kê thùng rác</h2> */}

      <div className="flex flex-row justify-start items-center space-x-4 mt-4">
        <label className="text-lg">Month: </label>
        <select 
          className="border border-gray-300 rounded px-2 py-1"
          value={selectedMonth} 
          onChange={handleMonthChange}
        >
          <option value="">-- Month --</option>
          {months.map((month) => (
            <option key={month} value={month}>{month}</option>
          ))}
        </select>

        {selectedMonth && (
          <>
            <label className="text-lg">Day: </label>
            <select 
              className="border border-gray-300 rounded px-2 py-1"
              value={selectedDay} 
              onChange={handleDayChange}
            >
              <option value="">-- Day --</option>
              {days.map((day) => (
                <option key={day} value={day}>{day}</option>
              ))}
            </select>
          </>
        )}
      </div>

      {selectedDay && (
        <div className="flex flex-col w-full mt-8 space-y-10">
          <div className="w-full h-96">
            <h3 className="text-center text-lg font-semibold">Filled Level</h3>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={filteredData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey={(item) => moment(item.Timestamp).format('HH:mm')} />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="FilledLevel(%)" fill="#82ca9d" />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="w-full h-96">
            <h3 className="text-center text-lg font-semibold">Weight</h3>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={filteredData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey={(item) => moment(item.Timestamp).format('HH:mm')} />
                <YAxis domain={[0, 20]} />
                <Tooltip />
                <Legend />
                <Bar dataKey="Weight(kg)" fill="#0088FE" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}
    </div>
  );
}

export default HomeContent;
