import React, { useEffect, useState } from "react";
import Papa from "papaparse";
import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  PieChart,
  Pie,
  Cell,
} from "recharts";

function Test() {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [dateRange, setDateRange] = useState({
    start: "2024-12-21 06:00:00",
    end: "2024-12-23 11:00:00",
  });

  const COLORS = ["#8884d8", "#82ca9d", "#ff7300"];

  // Function to load and parse CSV
  const loadCSV = () => {
    Papa.parse("/Processed_Trash_Fill_Data_Updated_Scaled.csv", {
      download: true,
      header: true,
      complete: (result) => {
        const processedData = result.data.map((row) => ({
          timestamp: row.Timestamp,
          remainingFill: parseFloat(row["RemainingFill(%)"]),
          weight: parseFloat(row["Weight(kg)"]),
          binStatus: getBinStatus(
            parseFloat(row["RemainingFill(%)"]),
            parseFloat(row["Weight(kg)"])
          ),
        }));
        setData(processedData);
      },
    });
  };

  // Function to determine bin status
  const getBinStatus = (remainingFill, weight) => {
    if (remainingFill <= 20 && weight <= 14) return "Unfilled";
    if (remainingFill <= 20 && weight < 14) return "Half-Filled";
    if (remainingFill > 20 && remainingFill <= 80 && weight <= 7) return "Unfilled";
    if (remainingFill > 20 && remainingFill <= 80 && weight < 14) return "Half-Filled";
    if (remainingFill > 20 && remainingFill <= 80 && weight > 14) return "Filled";
    if (remainingFill > 80 && weight <= 7) return "Half-Filled";
    if (remainingFill > 80 && weight > 7) return "Filled";
    return "Unknown";
  };

  // Filter data based on date range
  useEffect(() => {
    const filtered = data.filter(
      (item) => item.timestamp >= dateRange.start && item.timestamp <= dateRange.end
    );
    setFilteredData(filtered);
  }, [data, dateRange]);

  useEffect(() => {
    loadCSV();
  }, []);

  // Handle date range change
  const handleDateRangeChange = (start, end) => {
    setDateRange({ start, end });
  };

  return (
    <div className="flex flex-col gap-3 p-6 bg-gray-50">
      <h1 className="text-3xl font-semibold text-center text-gray-800 mb-6"><strong>Biểu đồ phân loại</strong></h1>

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
          className="p-2 border rounded"
        />
      </div>

      {/* Charts */}
      <div className="flex gap-5 min-w-full p-6 bg-white rounded-md shadow-inner justify-center items-center">
  {/* Scatter Chart */}
  <ScatterChart
    width={1000}
    height={300} // Reduced height
    margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
  >
    <CartesianGrid />
    <XAxis
      type="number"
      dataKey="remainingFill"
      name="Remaining Fill (%)"
      unit="%"
      domain={[25, 100]}
    />
    <YAxis
      type="number"
      dataKey="weight"
      name="Weight (kg)"
      unit="kg"
      domain={[0, 20]}
    />
    <Tooltip cursor={{ strokeDasharray: "3 3" }} />
    <Legend />

    {/* Scatter Points with Colors */}
    <Scatter
      name="Unfilled"
      data={filteredData.filter((d) => d.binStatus === "Unfilled")}
      fill="#8884d8"
    />
    <Scatter
      name="Half-Filled"
      data={filteredData.filter((d) => d.binStatus === "Half-Filled")}
      fill="#82ca9d"
    />
    <Scatter
      name="Filled"
      data={filteredData.filter((d) => d.binStatus === "Filled")}
      fill="#ff7300"
    />
  </ScatterChart>

  {/* Pie Chart */}
  <PieChart width={350} height={350}> {/* Adjusted size */}
    <Pie
      data={[
        {
          name: "Unfilled",
          value: filteredData.filter((d) => d.binStatus === "Unfilled").length,
        },
        {
          name: "Half-Filled",
          value: filteredData.filter((d) => d.binStatus === "Half-Filled").length,
        },
        {
          name: "Filled",
          value: filteredData.filter((d) => d.binStatus === "Filled").length,
        },
      ]}
      cx="50%"
      cy="50%"
      outerRadius={100} // Adjusted radius
      label
    >
      {COLORS.map((color, index) => (
        <Cell key={`cell-${index}`} fill={color} />
      ))}
    </Pie>
    <Tooltip />
  </PieChart>
</div>


      {/* Table for Bin Status Rules */}
      <div className="min-w-full p-6 bg-gray-50">
        <h1 className="text-2xl font-semibold text-center text-gray-800 mb-6"><strong>Bảng quy ước</strong></h1>
        <div className="overflow-x-auto shadow-lg rounded-lg border border-gray-200 mb-6">
          <div className="overflow-y-auto max-h-[500px]">
            <table className="min-w-full table-auto">
              <thead className="bg-blue-300 text-sm font-bold text-black sticky top-0 z-10">
                <tr>
                  <th className="py-2 text-left">Remaining Fill (%)</th>
                  <th className="py-2 text-left">Weight (kg)</th>
                  <th className="py-2 text-left">Bin Status</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="py-2 text-left">0% - 20% (ít khoảng trống)</td>
                  <td className="py-2 text-left">0kg - 7kg (nhẹ)</td>
                  <td className="py-2 text-left">Unfilled</td>
                </tr>
                <tr className="bg-blue-100">
                  <td className="py-2 text-left">0% - 20% (ít khoảng trống)</td>
                  <td className="py-2 text-left">7kg - 14kg (trung bình)</td>
                  <td className="py-2 text-left">Unfilled</td>
                </tr>
                <tr>
                  <td className="py-2 text-left">0% - 20% (ít khoảng trống)</td>
                  <td className="py-2 text-left">14kg - 20kg (nặng)</td>
                  <td className="py-2 text-left">Half-Filled</td>
                </tr>
                <tr className="bg-blue-100">
                  <td className="py-2 text-left">20% - 80% (vừa phải)</td>
                  <td className="py-2 text-left">0kg - 7kg (nhẹ)</td>
                  <td className="py-2 text-left">Unfilled</td>
                </tr>
                <tr>
                  <td className="py-2 text-left">20% - 80% (vừa phải)</td>
                  <td className="py-2 text-left">7kg - 14kg (trung bình)</td>
                  <td className="py-2 text-left">Half-Filled</td>
                </tr>
                <tr className="bg-blue-100">
                  <td className="py-2 text-left">20% - 80% (vừa phải)</td>
                  <td className="py-2 text-left">14kg - 20kg (nặng)</td>
                  <td className="py-2 text-left">Filled</td>
                </tr>
                <tr>
                  <td className="py-2 text-left">80% - 100% (nhiều khoảng trống)</td>
                  <td className="py-2 text-left">0kg - 7kg (nhẹ)</td>
                  <td className="py-2 text-left">Half-Filled</td>
                </tr>
                <tr className="bg-blue-100">
                  <td className="py-2 text-left">80% - 100% (nhiều khoảng trống)</td>
                  <td className="py-2 text-left">7kg - 14kg (trung bình)</td>
                  <td className="py-2 text-left">Filled</td>
                </tr>
                <tr>
                  <td className="py-2 text-left">80% - 100% (nhiều khoảng trống)</td>
                  <td className="py-2 text-left">14kg - 20kg (nặng)</td>
                  <td className="py-2 text-left">Filled</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Test;
