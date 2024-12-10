import React, { useState, useEffect } from 'react';
import { IconWasteBin } from "./assets/Icon";
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar } from 'recharts'; // Import thêm ResponsiveContainer


function Dashboard() {
  const [wasteBinData, setWasteBinData] = useState(null);
  const [exponential, setExponential] = useState([]);
  const [svmData, setSvmData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentFill, setCurrentFill] = useState('');
  const [weight, setWeight] = useState('');

  const fixedId = '0193859c-1606-7a06-8d73-a0b456a33b3a';

  const fetchWasteBinData = async () => {
    try {
      const response = await fetch(`/api/wastebins/${fixedId}/info`);
      const data = await response.json();
      setWasteBinData(data.data);
      setCurrentFill(data.data.remaining_fill);
      setWeight(data.data.weight); 
    } catch (error) {
      console.error('Error fetching WasteBin data:', error);
    }
  };

  useEffect(() => {
    const fetchExponential = async () => {
      try {
        const response = await fetch('/api/models/expo');
        const result = await response.json();
        if (result.success && result.data) {
          setExponential(result.data);
        }
      } catch (error) {
        console.error('Error fetching exponential data:', error);
      }
    };
    fetchExponential();
  }, []);

  const getColor = (currentFill) => {
    if (currentFill >= 0 && currentFill < 20) {
      return '#32CD32';
    } else if (currentFill >= 20 && currentFill < 80) {
      return '#FFD700';
    } else if (currentFill >= 80 && currentFill <= 100) {
      return '#FF4500';
    }
    return '#2196f3';
  };

  const getWeightColor = (weight) => {
    if (weight >= 0 && weight < 10) {
      return '#ADD8E6';
    } else if (weight >= 10 && weight < 15) {
      return '#87CEEB';
    } else if (weight >= 15 && weight <= 20) {
      return '#00008B';
    }
    return '#2196f3';
  };

  const getStatusColor = (svmClassification) => {
    if (svmClassification == 'Unfilled') {
      return '#008000';
    } else if (svmClassification == 'Half-Filled') {
      return '#FFA500';
    } else if (svmClassification == 'Filled') {
      return '#FF0000';
    }
    return '#F5F5F5';
  };

  useEffect(() => {
    const fetchSVMData = async () => {
      try {
        const response = await fetch(`/api/models/svm/${fixedId}`);
        const result = await response.json();
        if (result.success && result.data) {
          setSvmData(result.data);
        } else {
          throw new Error('No data found in the response');
        }
      } finally {
        setLoading(false);
      }
    };
    fetchSVMData();
  }, []);

  useEffect(() => {
    fetchWasteBinData();
  }, []);

  const center = {
    lat: wasteBinData ? wasteBinData.latitude : 0,
    lng: wasteBinData ? wasteBinData.longitude : 0,
  };

  // Dữ liệu cho đồ thị
// Dữ liệu cho đồ thị
const chartData = [
  { time: 'Hiện tại', percentage: 100 - currentFill }, // Hiện tại
  ...exponential.map((value, index) => ({
    time: `${(index + 1) * 0.5} giờ`, // Thời gian: 30 phút, 1 giờ, 1.5 giờ, ...
    percentage: value,
  })),
];


  return (
    <div className="p-8 bg-gradient-to-r from-blue-100 to-teal-100 min-h-screen">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div className="bg-white p-6 rounded-lg shadow-lg border-l-4 border-teal-500">
        <div className="flex items-center space-x-4">
            <IconWasteBin className="w-12 h-8 text-teal-500" />
            {wasteBinData ? (
              <div>
                <p className="text-2xl font-semibold text-gray-700 mb-2"><strong>Cân nặng:</strong> {wasteBinData.weight} kg</p>
                <p className="text-2xl font-semibold text-gray-700 mb-2"><strong>Còn trống:</strong> {wasteBinData.remaining_fill} %</p>
                <p className="text-2xl font-semibold text-gray-700"><strong>H2S:</strong> {wasteBinData.air_quality}</p>
              </div>
            ) : (
              <p className="text-xl font-semibold text-gray-600">Loading WasteBin data...</p>
            )}
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-lg border-l-4 border-teal-500">
          <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 mr-2 text-teal-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m2 0H7a2 2 0 110-4h2a2 2 0 110 4h6zm4 4h2m0 0v2m0-2h-2"></path>
            </svg>
            Location Details
          </h3>
          <div className="space-y-2">
            <p className="text-gray-700"><strong>Address:</strong> {wasteBinData ? wasteBinData.address : 'Loading...'}</p>
            <p className="text-gray-700"><strong>Latitude:</strong> {wasteBinData ? wasteBinData.latitude : 'Loading...'}</p>
            <p className="text-gray-700"><strong>Longitude:</strong> {wasteBinData ? wasteBinData.longitude : 'Loading...'}</p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-lg border-l-4 border-teal-500">
          <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 mr-2 text-teal-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v4M12 16v4m4-4h4m-4 0H8M4 12h4m4 4h4M4 4l16 16"></path>
            </svg>
            Last Update
          </h3>
          <div className="space-y-2">
            <p className="text-gray-700"><strong>Last Updated:</strong> {wasteBinData ? new Date(wasteBinData.timestamp).toLocaleString() : 'Loading...'}</p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-lg border-l-4 border-teal-500">
          <h3 className="text-xl font-semibold mb-6">Exponential Prediction</h3>
          {exponential.length > 0 ? (
            <ResponsiveContainer width="100%" height={550}>
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="time" />
                <YAxis />
                <Tooltip />
                <Legend />
                
                <Line type="monotone" dataKey="percentage" stroke="#8884d8" activeDot={{ r: 8 }} />
                
                <BarChart data={chartData}>
                  <Bar 
                    dataKey="percentage" 
                    radius={[8, 8, 0, 0]} // Cạnh tròn của cột
                    fill={(data) => getColor(data.percentage)}
                  />
                </BarChart>
              </LineChart>
            </ResponsiveContainer>
          ) : (
            <p>Loading exponential data...</p>
          )}
        </div>


        <div className="bg-white p-6 rounded-lg shadow-lg border-l-4 border-teal-500">
          <h2 className="text-xl font-bold mb-4 text-center">SVM Trash Classification</h2>
          <div className="flex justify-center space-x-6">
            <div className="flex flex-col items-center">
              <div className="relative w-48 h-48 rounded-full border-8" style={{ borderColor: getWeightColor(weight) }}>
                <div className="absolute inset-2">
                  <CircularProgressbar
                    value={weight}
                    maxValue={20}
                    text={`${weight} kg`}
                    styles={buildStyles({
                      pathColor: getWeightColor(weight),
                      textColor: getWeightColor(weight),
                      trailColor: '#F5F5F5',
                    })}
                  />
                </div>
              </div>
            </div>

            <div className="flex flex-col items-center">
              <div className="relative w-48 h-48 rounded-full border-8" style={{ borderColor: getColor(100 - currentFill) }}>
                <div className="absolute inset-2">
                  <CircularProgressbar
                    value={100 - currentFill}
                    maxValue={100}
                    text={`${100 - currentFill} %`}
                    styles={buildStyles({
                      pathColor: getColor(100 - currentFill),
                      textColor: getColor(100 - currentFill),
                      trailColor: '#F5F5F5',
                    })}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Status Indicator */}
          <div className="mt-8">
            {loading ? (
              <p className="text-center text-xl font-semibold">Loading...</p>
            ) : (
              <div className="flex flex-col items-center">
                <h3 className="text-lg font-semibold">Current Bin Status:</h3>
                <div className="w-64 h-64">
                  <CircularProgressbar
                    value={100}
                    maxValue={100}
                    text={`${svmData}`}
                    styles={buildStyles({
                      pathColor: getStatusColor(svmData),
                      textColor: getStatusColor(svmData),
                      trailColor: '#d6d6d6',
                      textSize: '18px',
                    })}
                  />
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-lg border-l-4 border-teal-500">
          <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 mr-2 text-teal-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v4m0 0V4M4 12v4m4-4h4m4 0h4m-4 0h4"></path>
            </svg>
            Air Quality
          </h3>
          <div className="space-y-2">
            <p className="text-gray-700"><strong>Air Quality Index:</strong> {wasteBinData ? wasteBinData.air_quality : 'Loading...'}</p>
            {/* <p className="text-gray-600">{wasteBinData && wasteBinData.air_quality <= 0.5 ? "Good" : wasteBinData.air_quality <= 0.75 ? "Moderate" : "Poor"}</p> */}
          </div>
        </div>

      </div>
    </div>
  );
}

export default Dashboard;
