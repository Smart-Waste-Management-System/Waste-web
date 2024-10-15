import React, { useState, useEffect } from 'react';
import { IconWasteBin } from "./assets/Icon";


// Import Google Maps API (Bạn cần thêm key API của mình tại đây)
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

function TrashPrediction() {
  // State cho API GET WasteBin
  const [wasteBinData, setWasteBinData] = useState(null);

  // State cho API ARIMA
  const [steps, setSteps] = useState(1);
  const [arimaPrediction, setArimaPrediction] = useState(null);

  // State cho API SVM
  const [weight, setWeight] = useState('');
  const [filledLevel, setFilledLevel] = useState('');
  const [svmClassification, setSvmClassification] = useState(null);

  const fetchWasteBinData = async () => {
    try {
      const response = await fetch('/wastebin/01928657-126d-72d3-bafa-1b7cd87b2a2e');
      const data = await response.json();
      setWasteBinData(data.data);
    } catch (error) {
      console.error('Error fetching WasteBin data:', error);
    }
  };

  // Fetch ARIMA API
  const handleArimaPredict = async () => {
    try {
      const response = await fetch('http://localhost:5000/arima/predict', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ steps: steps }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      setArimaPrediction(data.forecast);
    } catch (error) {
      console.error('Error fetching ARIMA prediction', error);
    }
  };

  // Fetch SVM API
  const handleSvmClassify = async () => {
    try {
      const response = await fetch('http://localhost:5000/svm/classify', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          weight: weight,
          filled_level: filledLevel,
        }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      setSvmClassification(data.label);
    } catch (error) {
      console.error('Error fetching SVM classification', error);
    }
  };

  // Fetch dữ liệu WasteBin khi component được mount
  useEffect(() => {
    fetchWasteBinData();
  }, []);

  const containerStyle = {
    width: '400px',
    height: '200px',
  };

  const center = {
    lat: wasteBinData ? wasteBinData.Latitude : 0,
    lng: wasteBinData ? wasteBinData.Longitude : 0,
  };

  return (
    <div className="p-6 bg-gray-100">
      <h1 className="text-center text-3xl font-bold mb-8">Waste Information</h1>
      <div className="grid grid-cols-2 gap-4">
        {/* Thùng rác thông tin */}
        <div className="flex items-center bg-white p-4 rounded shadow-md">

            <IconWasteBin />
          {wasteBinData ? (
            <div>
              <p><strong>Weight:</strong> {wasteBinData.Weight} kg</p>
              <p><strong>Remaining Fill:</strong> {wasteBinData.RemainingFill} %</p>
              <p><strong>Air Quality:</strong> {wasteBinData.AirQuality}</p>
            </div>
          ) : (
            <p>Loading WasteBin data...</p>
          )}
        </div>

        {/* Bản đồ Google */}
        <div className="bg-white p-4 rounded shadow-md">
          {wasteBinData && (
            <LoadScript googleMapsApiKey="YOUR_GOOGLE_MAPS_API_KEY">
              <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={15}>
                <Marker position={center} />
              </GoogleMap>
            </LoadScript>
          )}
        </div>

        {/* Countdown */}
        <div className="col-span-2 bg-white p-4 rounded shadow-md text-center">
          <p className="text-lg font-semibold">The bin will be full in approx:</p>
          {wasteBinData ? (
            <div className="grid grid-cols-4 gap-4 text-lg">
              <div><strong>Day:</strong> {wasteBinData.Day}</div>
              <div><strong>Hour:</strong> {wasteBinData.Hour}</div>
              <div><strong>Minute:</strong> {wasteBinData.Minute}</div>
              <div><strong>Second:</strong> {wasteBinData.Second}</div>
            </div>
          ) : (
            <p>Loading...</p>
          )}
        </div>

        {/* ARIMA Prediction */}
        <div className="bg-white p-4 rounded shadow-md">
          <h2 className="text-lg font-semibold mb-4">Arima Prediction</h2>
          <label className="block mb-2">Number of steps to predict:</label>
          <input
            type="number"
            value={steps}
            onChange={(e) => setSteps(e.target.value)}
            className="w-full p-2 border rounded mb-4"
            placeholder="Enter steps"
          />
          <button
            className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
            onClick={handleArimaPredict}
          >
            Predict ARIMA
          </button>

          {/* Display ARIMA results */}
          {arimaPrediction && (
            <div className="mt-4">
              <h3 className="text-lg font-semibold">Prediction Results:</h3>
              <ul className="list-disc list-inside">
                {arimaPrediction.map((value, index) => (
                  <li key={index}>Step {index + 1}: {value.toFixed(2)}</li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* SVM Classification */}
        <div className="bg-white p-4 rounded shadow-md">
          <h2 className="text-lg font-semibold mb-4">SVM Trash Classification</h2>
          <label className="block mb-2">Weight (kg):</label>
          <input
            type="number"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            className="w-full p-2 border rounded mb-4"
            placeholder="Enter weight"
          />
          <label className="block mb-2">Filled Level (%):</label>
          <input
            type="number"
            value={filledLevel}
            onChange={(e) => setFilledLevel(e.target.value)}
            className="w-full p-2 border rounded mb-4"
            placeholder="Enter filled level"
          />
          <button
            className="bg-green-500 text-white p-2 rounded hover:bg-green-600"
            onClick={handleSvmClassify}
          >
            Classify with SVM
          </button>

          {/* Display SVM results */}
          {svmClassification !== null && (
            <div className="mt-4">
              <h3 className="text-lg font-semibold">Classification Result:</h3>
              <p>
                {svmClassification === 0 && 'Trash is empty.'}
                {svmClassification === 1 && 'Trash is nearly full.'}
                {svmClassification === 2 && 'Trash is full.'}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default TrashPrediction;
