import React, { useState, useEffect } from 'react';
import { IconWasteBin } from "./assets/Icon";
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

function TrashPrediction() {
  const [wasteBinData, setWasteBinData] = useState(null);
  const [exponential, setExponential] = useState([]);

  const [svmData, setSvmData] = useState(null); // State lưu kết quả từ API
  const [error, setError] = useState(null); // State lưu lỗi nếu có
  const [loading, setLoading] = useState(true); // State kiểm tra trạng thái loading


  const [currentFill, setCurrentFill] = useState('');
  const [weight, setWeight] = useState('');
  const [svmClassification, setSvmClassification] = useState(null);

  const fixedId = '0193859c-1606-7a06-8d73-a0b456a33b3a';

  // Fetch waste bin data including Weight and RemainingFill from the API
  const fetchWasteBinData = async () => {
    try {
      const response = await fetch(`/wastebin/${fixedId}`);
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
        const response = await fetch('/wastebin/ml/exponential');
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const result = await response.json();
        if (result.success && result.data) {
          setExponential(result.data); // Cập nhật state
        }
      } catch (error) {
        console.error('Error fetching exponential data:', error);
      }
    };

    fetchExponential();
  }, []);


  // Hàm trả về màu sắc dựa trên currentFill
  const getColor = (currentFill) => {
    if (currentFill >= 0 && currentFill < 20) {
      return '#32CD32'; // Màu xanh nhạt khi currentFill từ 0 đến 20
    } else if (currentFill >= 20 && currentFill < 80) {
      return '#FFD700'; // Màu vàng khi currentFill từ 20 đến 80
    } else if (currentFill >= 80 && currentFill <= 100) {
      return '#FF4500'; // Màu cam khi currentFill từ 80 đến 100
    }
    return '#2196f3'; // Màu mặc định (trong trường hợp khác)
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
        const response = await fetch(`/wastebin/ml/svm/${fixedId}`);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const result = await response.json();

        if (result.success && result.data) {
          setSvmData(result.data); // Cập nhật dữ liệu từ API
        } else {
          throw new Error('No data found in the response');
        }
      } finally {
        setLoading(false); // Kết thúc trạng thái loading
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

  return (
    <div className="p-6 bg-gray-100">
      <div className="grid grid-cols-2 gap-4">
        <div className="flex items-center bg-white p-4 rounded shadow-md">
          <IconWasteBin />
          {wasteBinData ? (
            <div>
              <p className="text-3xl mb-4">
                <strong>Weight:</strong> {wasteBinData.weight} kg
              </p>
              <p className="text-3xl mb-4">
                <strong>Remaining Fill:</strong> {wasteBinData.remaining_fill} %
              </p>
              <p className="text-3xl">
                <strong>Air Quality:</strong> {wasteBinData.air_quality}
              </p>
            </div>
          ) : (
            <p className="text-4xl">Loading WasteBin data...</p>
          )}
        </div>

        <div className="bg-white p-4 rounded shadow-md">
          {/* {wasteBinData && (
            <LoadScript googleMapsApiKey="YOUR_GOOGLE_MAPS_API_KEY">
              <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={15}>
                <Marker position={center} />
              </GoogleMap>
            </LoadScript>
          )} */}
        </div>

        {/* <p className="text-4xl font-semibold">The bin will be full in approx:</p> */}
        <div className="col-span-2 bg-white p-4 rounded shadow-md text-center">
          {wasteBinData ? (
            <div className="grid grid-cols-4 gap-4 text-lg">
              <div><p className="text-xl"><strong>Ngày:</strong> {wasteBinData.day}</p></div>
              <div><p className="text-xl"><strong>Giờ:</strong> {wasteBinData.hour}</p></div>
              <div><p className="text-xl"><strong>Phút:</strong> {wasteBinData.minute}</p></div>
              <div><p className="text-xl"><strong>Giây:</strong> {wasteBinData.second}</p></div>
            </div>
          ) : (
            <p>Loading...</p>
          )}
        </div>

        <div className="bg-white p-4 rounded shadow-md">
          <h2 className="text-xl font-bold mb-8 text-center">Exponential</h2>
          <label className="block mb-2">Current Filled Level (%):</label>
          <div className="w-full p-2 border rounded mb-4">
              <p className="text-lg font-semibold">{(100 - currentFill).toFixed(2)}%</p>
          </div>

          <div className="mt-4">
            <h3 className="text-lg font-semibold">Prediction Results:</h3>
            <ul className="list-disc list-inside">
              {exponential.map((value, index) => (
                <li key={index}>{value}</li>
              ))}
            </ul>
          </div>


        </div>

        <div className="bg-white p-8 rounded-lg shadow-md">
          <h2 className="text-xl font-bold mb-8 text-center">SVM Trash Classification</h2>
          <div className="flex justify-center space-x-8 mt-8">
            <div className="flex flex-col items-center">
              <div
                  className="relative w-56 h-56 rounded-full border-8"
                  style={{ borderColor: getWeightColor(weight) }} 
                >
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

        {/* Remaining Fill Section */}
        <div className="flex flex-col items-center">
          <div
            className="relative w-56 h-56 rounded-full border-8"
            style={{ borderColor: getColor(100 - currentFill) }} 
          >
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

      
      {/* Bottom: Result */}
      <div className="flex flex-col items-center">
      {loading ? (
        <p className="text-center">Loading...</p>
      ) : (
        <div>
          <h3 className="text-lg font-semibold text-center"> . </h3>
          <h3 className="text-lg font-semibold text-center">Thùng đang trong tình trạng:</h3>
          <h3 className="text-lg font-semibold text-center"> . </h3>
          <div style={{ width: 250, height: 250 }}>
            <CircularProgressbar 
              value={100} 
              maxValue={100} 
              text={`${svmData}`} 
              styles={buildStyles({
                pathColor: getStatusColor(svmData),
                textColor: getStatusColor(svmData),
                trailColor: '#d6d6d6',
                textSize: '16px',
              })}
            />
          </div>
        </div>
      )}

        </div>
    </div>
      </div>
    </div>
  );
}

export default TrashPrediction;
