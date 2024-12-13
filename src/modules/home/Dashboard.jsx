import React, { useState, useEffect, useCallback } from 'react';
import { IconWasteBin, BinUnfill, BinHalfFill, BinFilled, IconRotten } from "./assets/Icon";
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar } from 'recharts'; // Import thêm ResponsiveContainer
import ReportDetail from "./components/ReportDetail"; // Giả sử bạn đã có component ReportDetail


function Dashboard() {
  const [wasteBinData, setWasteBinData] = useState(null);
  const [exponential, setExponential] = useState([]);
  const [svmData, setSvmData] = useState(null);
  const [report, setReport] = useState(null); // State để lưu báo cáo gần nhất
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentFill, setCurrentFill] = useState('');
  const [weight, setWeight] = useState('');
  const [showReportDetail, setShowReportDetail] = useState(false); // State để hiển thị báo cáo chi tiết


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

  const handleGetReport = useCallback(async () => {
    setError(""); 
    try {
      const response = await fetch(`/api/wastebins/${fixedId}/reports/last`);
      console.log(`/api/wastebins/${fixedId}/reports/last`);
      if (response.ok) {
        const rs = await response.json();
        setReport(rs.data);
        setShowReportDetail(true)
      } else {
        setError("Không thể lấy báo cáo gần nhất. Hãy thử lại sau!");
        console.error("Lỗi khi lấy báo cáo gần nhất.");
      }
    } catch (error) {
      setError("Có lỗi xảy ra trong quá trình gọi API.");
      console.error("Lỗi trong quá trình gọi API:", error);
    }
  }, [fixedId]);
  
  const fetchExponential = async () => {
    try {
      const response = await fetch(`/api/models/expo/${fixedId}`);
      const result = await response.json();
      if (result.success && result.data) {
        setExponential(result.data);
      }
    } catch (error) {
      console.error('Error fetching exponential data:', error);
    }
  };

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

  useEffect(() => {
    const intervalId = setInterval(() => {
      fetchWasteBinData(); // Gọi API fetchWasteBinData
      fetchExponential(); // Gọi API fetchExponential
      fetchSVMData(); // Gọi API fetchSVMData
    }, 5000); // 10 giây

    // Cleanup interval when component unmounts
    return () => clearInterval(intervalId);
  }, [handleGetReport]);

  useEffect(() => {
    fetchWasteBinData(); // Gọi API fetchWasteBinData
    fetchExponential(); // Gọi API fetchExponential
    fetchSVMData(); // Gọi API fetchSVMDat
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
    <div className="max-h-[1000px] overflow-y-auto justify-center p-8 bg-gradient-to-r from-blue-100 to-teal-100 min-h-screen">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div className="bg-white p-6 rounded-lg shadow-lg border-l-4 border-teal-500">
        <div className="flex items-center space-x-4">
            {svmData === "Unfilled" && <BinUnfill />}
            {svmData === "Half-Filled" && <BinHalfFill />}
            {svmData === "Filled" && <BinFilled />}
            {wasteBinData ? (
              <div>
                 {/* {wasteBinData.air_quality >= "10" && <IconRotten /> } */}
                <p className="text-2xl font-semibold text-gray-700 mb-2"><strong>Cân nặng:</strong> {wasteBinData.weight} kg</p>
                <p className="text-2xl font-semibold text-gray-700 mb-2"><strong>Còn trống:</strong> {wasteBinData.remaining_fill} %</p>
                <p className="text-2xl font-semibold text-gray-700 mb-2">
                  <strong>H2S:</strong> {wasteBinData.air_quality} 
                </p>
              </div>
            ) : (
              <p className="text-xl font-semibold text-gray-600">Loading WasteBin data...</p>
            )}
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-lg border-l-4 border-teal-500">
          <h2 className="text-xl font-bold mb-4 text-center">Thông tin mô hình</h2>
          <div className="flex space-x-6">
            {/* Phần Địa chỉ và Tọa độ */}
            <div className="flex flex-col space-y-4 w-full">
              <div className="flex items-center space-x-2">
                <svg width="50px" height="50px" viewBox="0 0 24 24" xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#" xmlns="http://www.w3.org/2000/svg" version="1.1" xmlns:cc="http://creativecommons.org/ns#" xmlns:dc="http://purl.org/dc/elements/1.1/">
                    <g transform="translate(0 -1028.4)">
                      <rect height="20" width="14" y="1031.4" x="5" fill="#bdc3c7"/>
                      <g transform="translate(0 2)">
                      <g fill="#3498db">
                        <rect transform="translate(0 1028.4)" height="3" width="2" y="3" x="7"/>
                        <rect height="3" width="2" y="1031.4" x="11"/>
                        <rect height="3" width="2" y="1031.4" x="15"/>
                      </g>
                      <g fill="#2980b9">
                        <rect transform="translate(0 1028.4)" height="1" width="2" y="3" x="7"/>
                        <rect transform="translate(0 1028.4)" height="1" width="2" y="3" x="11"/>
                        <rect transform="translate(0 1028.4)" height="1" width="2" y="3" x="15"/>
                      </g>
                      </g>
                      <g transform="translate(0 7)">
                      <g fill="#3498db">
                        <rect transform="translate(0 1028.4)" height="3" width="2" y="3" x="7"/>
                        <rect height="3" width="2" y="1031.4" x="11"/>
                        <rect height="3" width="2" y="1031.4" x="15"/>
                      </g>
                      <g fill="#2980b9">
                        <rect transform="translate(0 1028.4)" height="1" width="2" y="3" x="7"/>
                        <rect transform="translate(0 1028.4)" height="1" width="2" y="3" x="11"/>
                        <rect transform="translate(0 1028.4)" height="1" width="2" y="3" x="15"/>
                      </g>
                      </g>
                      <g transform="translate(0 12)">
                      <g fill="#3498db">
                        <rect transform="translate(0 1028.4)" height="3" width="2" y="3" x="7"/>
                        <rect height="3" width="2" y="1031.4" x="11"/>
                        <rect height="3" width="2" y="1031.4" x="15"/>
                      </g>
                      <g fill="#2980b9">
                        <rect transform="translate(0 1028.4)" height="1" width="2" y="3" x="7"/>
                        <rect transform="translate(0 1028.4)" height="1" width="2" y="3" x="11"/>
                        <rect transform="translate(0 1028.4)" height="1" width="2" y="3" x="15"/>
                      </g>
                      </g>
                      <g>
                      <rect height="3" width="6" y="1048.4" x="7" fill="#e67e22"/>
                      <rect height="1" width="6" y="1048.4" x="7" fill="#d35400"/>
                      <rect height="3" width="1" y="1048.4" x="9" fill="#d35400"/>
                      <rect height="2" width="2" y="1048.4" x="15" fill="#3498db"/>
                      <rect height="1" width="2" y="1048.4" x="15" fill="#2980b9"/>
                      </g>
                      <path d="m4 1030.4h16l-2.667-2h-10.666l-2.667 2" fill="#bdc3c7"/>
                      <rect height="1" width="16" y="1030.4" x="4" fill="#7f8c8d"/>
                      <rect transform="translate(0 1028.4)" height="1" width="14" y="3" x="5" fill="#95a5a6"/>
                    </g>
                    </svg>
                <p className="text-2xl font-semibold text-gray-700 mb-2"><strong>Địa chỉ:</strong> {wasteBinData ? wasteBinData.address : 'Loading...'}</p>
              </div>
              <div className="flex items-center space-x-2">
                <svg width="50px" height="50px" viewBox="0 0 24 24" xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#" xmlns="http://www.w3.org/2000/svg" version="1.1" xmlns:cc="http://creativecommons.org/ns#" xmlns:dc="http://purl.org/dc/elements/1.1/">
                    <g transform="translate(0 -1028.4)">
                      <g>
                      <path d="m23 12a11 11 0 1 1 -22 0 11 11 0 1 1 22 0z" transform="translate(0 1029.4)" fill="#95a5a6"/>
                      <path d="m23 12a11 11 0 1 1 -22 0 11 11 0 1 1 22 0z" transform="translate(0 1028.4)" fill="#bdc3c7"/>
                      <path d="m20 12a8.5 9 0 1 1 -17 0 8.5 9 0 1 1 17 0z" transform="matrix(1.0588 0 0 1 -.17647 1028.4)" fill="#3498db"/>
                      <path d="m16 1033.4-6 7-2 9 6-7 2-9z" fill="#2980b9"/>
                      <path d="m12 1031.4c-4.9706 0-9 4-9 9 0 0.1 0.0218 0.3 0.0312 0.5 0.2651-4.8 4.1698-8.5 8.9688-8.5s8.704 3.7 8.969 8.5c0.009-0.2 0.031-0.4 0.031-0.5 0-5-4.029-9-9-9z" fill="#2980b9"/>
                      <path d="m14 1041.4-4-2 6-7z" fill="#e74c3c"/>
                      <path d="m10 1039.4 4 2-6 7z" fill="#ecf0f1"/>
                      <path d="m12 1029.4c-6.0751 0-11 4.9-11 11 0 6 4.9249 11 11 11 6.075 0 11-5 11-11 0-6.1-4.925-11-11-11zm0 2c4.971 0 9 4 9 9 0 4.9-4.029 9-9 9-4.9706 0-9-4.1-9-9 0-5 4.0294-9 9-9z" fill="#bdc3c7"/>
                      </g>
                      <path d="m16 4-4 8 2 1z" transform="translate(0 1028.4)" fill="#c0392b"/>
                      <path d="m12 1039.4c-0.552 0-1 0.4-1 1h2c0-0.6-0.448-1-1-1z" fill="#bdc3c7"/>
                      <path d="m12 12-4 8 6-7z" transform="translate(0 1028.4)" fill="#bdc3c7"/>
                      <path d="m12 1041.4c0.552 0 1-0.5 1-1h-2c0 0.5 0.448 1 1 1z" fill="#7f8c8d"/>
                    </g>
                  </svg>
                  <div className="flex flex-col items-lefft">
                    <p className="text-2xl font-semibold text-gray-700 mb-2"><strong>Vĩ độ:</strong>   {wasteBinData ? wasteBinData.latitude : 'Loading...'}</p>
                    <p className="text-2xl font-semibold text-gray-700 mb-2"><strong>Kinh độ:</strong>   {wasteBinData ? wasteBinData.longitude : 'Loading...'}</p>
                  </div>
              </div>
            </div>

            <div className="flex justify-center items-center">
              <a 
                href={`https://www.google.com/maps?q=${wasteBinData ? wasteBinData.latitude : ''},${wasteBinData ? wasteBinData.longitude : ''}`} 
                target="_blank" 
                className="inline-flex flex-col items-center justify-center px-6 py-2 bg-teal-500 text-white rounded-lg hover:bg-teal-600 focus:outline-none focus:ring-2 focus:ring-teal-300"
              >
                <svg width="60px" height="60px" viewBox="0 0 24 24" xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#" xmlns="http://www.w3.org/2000/svg" version="1.1" xmlns:cc="http://creativecommons.org/ns#" xmlns:dc="http://purl.org/dc/elements/1.1/">
                  <g transform="translate(0 -1028.4)">
                    <path d="m8 1030.4 8 1v19l-8-1z" fill="#ecf0f1"/>
                    <path d="m2 1031.4 6-1v19l-6 1z" fill="#bdc3c7"/>
                    <path d="m16 1031.4 6-1v19l-6 1z" fill="#bdc3c7"/>
                    <path d="m3 1032.4 5-1v17l-5 1z" fill="#27ae60"/>
                    <path d="m8 1031.4 8 1v17l-8-1z" fill="#2ecc71"/>
                    <path d="m13 1c-1.657 0-3 1.3432-3 3s1.343 3 3 3 3-1.3432 3-3-1.343-3-3-3zm0 2c0.552 0 1 0.4477 1 1s-0.448 1-1 1-1-0.4477-1-1 0.448-1 1-1z" transform="translate(0 1028.4)" fill="#c0392b"/>
                    <path d="m21 1048.4-5 1v-17l5-1z" fill="#27ae60"/>
                    <path d="m5.6875 1031.8-2.3125 0.5 4.625 4.9v-2.9l-2.3125-2.5z" fill="#f39c12"/>
                    <path d="m21 1046.4-5 1v-6l5-3z" fill="#f39c12"/>
                    <path d="m21 1048.4-5 1v-6l5-3z" fill="#2980b9"/>
                    <path d="m8 1042.4 8-1v6l-8-1z" fill="#f1c40f"/>
                    <path d="m8 1044.4 8-1v6l-8-1z" fill="#3498db"/>
                    <path d="m3 1045.4 5-3v4l-5 1z" fill="#f39c12"/>
                    <path d="m3 1047.4 5-3v4l-5 1z" fill="#2980b9"/>
                    <path d="m8 8.8008v-2.8985l4 8.6597h-1.469z" transform="translate(0 1028.4)" fill="#f1c40f"/>
                    <path d="m13 1028.4c-2.209 0-4 1.8-4 4 0 0.7 0.1908 1.3 0.5156 1.9 0.0539 0.1 0.1105 0.2 0.1719 0.3l3.3125 5.8 3.312-5.8c0.051-0.1 0.095-0.2 0.141-0.2l0.031-0.1c0.325-0.6 0.516-1.2 0.516-1.9 0-2.2-1.791-4-4-4zm0 2c1.105 0 2 0.9 2 2s-0.895 2-2 2-2-0.9-2-2 0.895-2 2-2z" fill="#e74c3c"/>
                  </g>
                </svg>
                <p>
                </p>
              </a>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-lg border-l-4 border-teal-500">
          <h2 className="text-xl font-bold mb-4 text-center">Lần cập nhật gần nhất</h2>
          <div className="space-y-2">
            <p className="text-4xl font-semibold text-center text-gray-700 mb-2">
              {wasteBinData ? new Date(wasteBinData.timestamp).toLocaleString() : 'Loading...'}
            </p>
          </div>
          <h2 className="text-xl font-bold mb-4 text-center">Dự đoán sẽ đầy trong</h2>
          <p className="text-4xl font-semibold text-center text-gray-700 mb-2">
            {(wasteBinData?.day ?? 0)} : {(wasteBinData?.hour ?? 0)} : {(wasteBinData?.minute ?? 0)} : {(wasteBinData?.second ?? 0)}
          </p>


          <div className="mt-6 flex justify-center gap-4">
            <button
              className="rounded-lg bg-green-500 px-4 py-2 text-white text-xl font-semibold text-gray-700 mb-2"
              onClick={handleGetReport}
            >
              Chi tiết
            </button>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-lg border-l-4 border-teal-500">
          <h2 className="text-xl font-bold mb-4 text-center">Exponential Prediction</h2>
          {exponential.length > 0 ? (
            <ResponsiveContainer width="100%" height={500}>
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="time" />
                <YAxis domain={[0, 100]}/>
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
                <h3 className="text-lg font-semibold">Trạng thái thùng hiện tại</h3>
                <h3 className="text-lg font-semibold">-</h3>
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
          {error && <p className="text-red-500">{error}</p>}
          {showReportDetail ? (
            <ReportDetail report={report} /> // Hiển thị ReportDetail nếu có báo cáo
          ) : (
            <p className="text-2xl font-semibold text-gray-700 mb-2"><strong>Loading...</strong></p>
          )}
        </div>

{/* 
        <div className="bg-white p-6 rounded-lg shadow-lg border-l-4 border-teal-500">
          
        </div>
        
        <div className="p-6 rounded-lg shadow-lg border-l-4 flex justify-center items-center">
          <svg  width="100px" height="100px" viewBox="0 0 24 24" xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#" xmlns="http://www.w3.org/2000/svg" version="1.1" xmlns:cc="http://creativecommons.org/ns#" xmlns:dc="http://purl.org/dc/elements/1.1/">
            <g transform="translate(0 -1028.4)">
              <path d="m9.5 1033.4c-3.5899 0-6.5 2.9-6.5 6.5 0 0-0.0005 0 0 0.1-1.7839 0.9-3 2.7-3 4.9 0 3 2.4624 5.5 5.5 5.5h0.0312 13.219 0.25c2.761 0 5-2.3 5-5 0-2.1-1.297-3.9-3.125-4.7 0.071-0.2 0.125-0.5 0.125-0.8 0-2-1.567-3.5-3.5-3.5-0.798 0-1.536 0.2-2.125 0.7-1.043-2.2-3.282-3.7-5.875-3.7z" fill="#95a5a6"/>
              <path d="m9.5 1032.4c-3.5899 0-6.5 2.9-6.5 6.5 0 0-0.0005 0 0 0.1-1.7839 0.9-3 2.7-3 4.9 0 3 2.4624 5.5 5.5 5.5h0.0312 13.219 0.25c2.761 0 5-2.3 5-5 0-2.1-1.297-3.9-3.125-4.7 0.071-0.2 0.125-0.5 0.125-0.8 0-2-1.567-3.5-3.5-3.5-0.798 0-1.536 0.2-2.125 0.7-1.043-2.2-3.282-3.7-5.875-3.7z" fill="#bdc3c7"/>
              <path d="m12 1037.4c-2.4162 0-4.44 1.7-4.9062 4h1.6562c0.4449-1.4 1.732-2.5 3.281-2.5 0.938 0 1.79 0.4 2.407 1l-1.438 1.5h2.312 1.594 0.094v-4l-1.469 1.4c-0.907-0.9-2.151-1.4-3.531-1.4zm-5 6v4l1.4688-1.5c0.9068 0.9 2.1512 1.5 3.5312 1.5 2.416 0 4.44-1.8 4.906-4h-1.656c-0.445 1.4-1.732 2.4-3.281 2.4-0.938 0-1.79-0.4-2.4065-1l1.4375-1.4h-2.3125-1.5937-0.0938z" fill="#2980b9"/>
            </g>
          </svg>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-lg border-l-4 border-teal-500">
          
        </div> */}

      </div>
    </div>
  );
}

export default Dashboard;
