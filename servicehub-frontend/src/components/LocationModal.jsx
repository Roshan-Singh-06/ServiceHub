import React, { useState, useEffect } from "react";
import Select from 'react-select';
import axiosInstance from '../api/axiosInstance';

export default function LocationModal({ isOpen, onClose, onLocationSaved }) {
  const [selectedState, setSelectedState] = useState(null);
  const [stateList, setStateList] = useState([]);
  const [serviceMessage, setServiceMessage] = useState("");
  const [serviceAvailable, setServiceAvailable] = useState(null);

  useEffect(() => {
    if (isOpen) {
      axiosInstance.get('/location/states')
        .then(res => setStateList(res.data || []))
        .catch(() => setStateList([]));
    }
  }, [isOpen]);

  const stateOptions = stateList.map(s => ({ value: s.isoCode, label: s.name }));

  const checkServiceAvailability = async (stateName) => {
    try {
      const res = await axiosInstance.post('/location/check-service', { stateName });
      setServiceMessage(res.data.message);
      setServiceAvailable(res.data.available);
    } catch (err) {
      setServiceMessage('Could not check service availability.');
      setServiceAvailable(null);
    }
  };

  const handleSave = (goToServices) => {
    const stateObj = stateList.find(s => s.isoCode === selectedState);
    if (stateObj) {
      localStorage.setItem('selectedState', stateObj.name);
      if (onLocationSaved) onLocationSaved(stateObj.name, goToServices);
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none">
      <div className="bg-white rounded-3xl shadow-2xl p-10 w-full max-w-md border-t-8 border-[#5c7c89] relative pointer-events-auto">
        <button className="absolute top-4 right-4 text-3xl text-gray-700 hover:text-black font-extrabold" onClick={onClose}>&times;</button>
        <h2 className="text-3xl font-extrabold text-center mb-8 text-[#1f4959] tracking-wide drop-shadow">
          Select Your State
        </h2>
        <div className="mb-8">
          <label className="block text-lg font-semibold mb-3 text-[#5c7c89]">State</label>
          <Select
            options={stateOptions}
            value={stateOptions.find(opt => opt.value === selectedState)}
            onChange={(option) => {
              setSelectedState(option.value);
              const stateObj = stateList.find(s => s.isoCode === option.value);
              if (stateObj) {
                checkServiceAvailability(stateObj.name);
              } else {
                setServiceMessage("");
                setServiceAvailable(null);
              }
            }}
            placeholder="Select state"
            className="text-lg"
            styles={{
              control: (base) => ({
                ...base,
                borderRadius: '0.75rem',
                borderColor: '#5c7c89',
                boxShadow: 'none',
                padding: '2px',
              }),
              menu: (base) => ({
                ...base,
                zIndex: 9999,
              }),
            }}
          />
        </div>
        {serviceMessage && (
          <div
            className={`mt-4 text-center font-bold rounded-xl px-6 py-4 shadow-lg text-lg transition-all
              ${serviceAvailable === true ? 'bg-green-100 text-green-800 border border-green-400' : ''}
              ${serviceAvailable === false ? 'bg-red-100 text-red-800 border border-red-400' : ''}
              ${serviceAvailable === null ? 'bg-blue-100 text-blue-800 border border-blue-400' : ''}
            `}
          >
            {serviceMessage}
          </div>
        )}
        {serviceAvailable === false && (
          <button
            className="mt-8 w-full bg-gradient-to-r from-gray-400 to-gray-600 hover:from-gray-600 hover:to-gray-400 text-white font-bold py-3 rounded-xl shadow-lg text-lg transition-all disabled:opacity-60"
            disabled={!selectedState}
            onClick={() => handleSave(false)}
          >
            Save & Go Home
          </button>
        )}
        {serviceAvailable === true && (
          <button
            className="mt-8 w-full bg-gradient-to-r from-[#5c7c89] to-[#1f4959] hover:from-[#1f4959] hover:to-[#5c7c89] text-white font-bold py-3 rounded-xl shadow-lg text-lg transition-all disabled:opacity-60"
            disabled={!selectedState}
            onClick={() => handleSave(true)}
          >
            Save & Go to Services
          </button>
        )}
      </div>
    </div>
  );
}
