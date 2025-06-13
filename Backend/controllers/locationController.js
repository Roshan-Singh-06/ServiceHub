import axios from 'axios';
import { State } from 'country-state-city';

// Get all Indian states
const getStates = (req, res) => {
  try {
    const states = State.getStatesOfCountry('IN');
    res.json(states);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch states' });
  }
};

// Get districts for a state
const getDistricts = async (req, res) => {
  const { stateName } = req.query;
  if (!stateName) return res.status(400).json({ error: 'State name required' });

  try {
    const response = await axios.get(
      `https://api.api-ninjas.com/v1/indian_cities?state=${encodeURIComponent(stateName)}`,
      { headers: { 'X-Api-Key': process.env.NINJA_API_KEY } }
    );
    console.log('API response:', response.data);
    const districts = Array.from(new Set(response.data.map(city => city.district))).filter(Boolean);
    res.json(districts);
  } catch (err) {
    console.error('District fetch error:', err.response ? err.response.data : err.message);
    res.status(500).json({ error: 'Failed to fetch districts', details: err.response ? err.response.data : err.message });
  }
};

// Get cities for a state and district
const getCities = async (req, res) => {
  const { stateName, district } = req.query;
  if (!stateName || !district) {
    return res.status(400).json({ error: 'State name and district required' });
  }

  try {
    const response = await axios.get(
      `https://api.api-ninjas.com/v1/indian_cities?state=${encodeURIComponent(stateName)}&district=${encodeURIComponent(district)}`,
      { headers: { 'X-Api-Key': process.env.NINJA_API_KEY } }
    );
    const cities = Array.from(new Set(response.data.map(city => city.city))).filter(Boolean);
    res.json(cities);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch cities' });
  }
};

// Export all controllers (ESM way)
export default {
  getStates,
  getDistricts,
  getCities
};

