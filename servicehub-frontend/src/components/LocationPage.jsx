import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';

export default function LocationPage() {
  const [selectedState, setSelectedState] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [stateList, setStateList] = useState([]);
  const [districtList, setDistrictList] = useState([]);
  const [cityList, setCityList] = useState([]);
  const navigate = useNavigate();

  // Fetch all location data in one go from backend for optimal and reusable logic
  useEffect(() => {
    fetch('/api/location/all')
      .then(res => res.json())
      .then(data => {
        setStateList(data.states || []);
        setDistrictList(data.districts || []);
        setCityList(data.cities || []);
      })
      .catch(() => {
        setStateList([]);
        setDistrictList([]);
        setCityList([]);
      });
  }, []);

  // Optionally, you can filter districtList and cityList based on selectedState and selectedDistrict
  const filteredDistricts = selectedState ? districtList.filter(d => d.stateCode === selectedState) : [];
  const filteredCities = selectedDistrict ? cityList.filter(c => c.district === selectedDistrict) : [];

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded shadow">
      <h2 className="text-xl font-bold mb-4">Select Your Location</h2>
      <div className="mb-4">
        <label className="block text-sm font-semibold mb-1">State</label>
        <select
          className="border rounded px-3 py-2 w-full"
          value={selectedState}
          onChange={e => {
            setSelectedState(e.target.value);
            setSelectedDistrict("");
            setSelectedCity("");
          }}
        >
          <option value="">Select state</option>
          {stateList.map(s => (
            <option key={s.isoCode} value={s.isoCode}>{s.name}</option>
          ))}
        </select>
      </div>
      <div className="mb-4">
        <label className="block text-sm font-semibold mb-1">District</label>
        <select
          className="border rounded px-3 py-2 w-full"
          value={selectedDistrict}
          onChange={e => {
            setSelectedDistrict(e.target.value);
            setSelectedCity("");
          }}
          disabled={!selectedState || filteredDistricts.length === 0}
        >
          <option value="">Select district</option>
          {filteredDistricts.map(d => (
            <option key={d.name} value={d.name}>{d.name}</option>
          ))}
        </select>
      </div>
      <div className="mb-4">
        <label className="block text-sm font-semibold mb-1">City</label>
        <select
          className="border rounded px-3 py-2 w-full"
          value={selectedCity}
          onChange={e => setSelectedCity(e.target.value)}
          disabled={!selectedDistrict || filteredCities.length === 0}
        >
          <option value="">Select city</option>
          {filteredCities.map(c => (
            <option key={c.name} value={c.name}>{c.name}</option>
          ))}
        </select>
      </div>
      <button
        className="bg-[#5c7c89] text-white px-4 py-2 rounded hover:bg-[#1f4959] mt-4 w-full"
        disabled={!selectedState || !selectedDistrict || !selectedCity}
        onClick={() => navigate('/')}
      >
        Save & Go Home
      </button>
    </div>
  );
}
