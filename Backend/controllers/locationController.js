import axios from 'axios';
import { State } from 'country-state-city';

// In-memory cache for API results (simple, resets on server restart)
const cache = {};
const CACHE_TTL = 60 * 60 * 1000; // 1 hour

const getCacheKey = (url, field) => `${url}|${field}`;

// Helper to fetch and deduplicate fields from community API
const fetchAndExtractUnique = async (url, field) => {
  const cacheKey = getCacheKey(url, field);
  const now = Date.now();
  if (cache[cacheKey] && now - cache[cacheKey].timestamp < CACHE_TTL) {
    return cache[cacheKey].data;
  }
  const response = await axios.get(url);
  const data = Array.from(new Set(response.data.map(item => item[field]))).filter(Boolean);
  cache[cacheKey] = { data, timestamp: now };
  return data;
};

// Get all Indian states
const getStates = (req, res) => {
  try {
    const states = State.getStatesOfCountry('IN');
    res.json(states);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch states' });
  }
};

// Get districts for a state using community API
const getDistricts = async (req, res) => {
  const { stateName } = req.query;
  if (!stateName) return res.status(400).json({ error: 'State name required' });

  try {
    const url = `https://indian-cities-api-nocbegfhqg.now.sh/cities?State=${encodeURIComponent(stateName)}`;
    const districts = await fetchAndExtractUnique(url, 'District');
    res.json(districts);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch districts', details: err.response ? err.response.data : err.message });
  }
};

// Get cities for a state and district using community API
const getCities = async (req, res) => {
  const { stateName, district } = req.query;
  if (!stateName || !district) {
    return res.status(400).json({ error: 'State name and district required' });
  }

  try {
    const url = `https://indian-cities-api-nocbegfhqg.now.sh/cities?State=${encodeURIComponent(stateName)}&District=${encodeURIComponent(district)}`;
    const cities = await fetchAndExtractUnique(url, 'City');
    res.json(cities);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch cities', details: err.response ? err.response.data : err.message });
  }
};

// Service availability check for a state
const checkServiceAvailability = (req, res) => {
  const { stateName } = req.body;
  if (!stateName) {
    return res.status(400).json({ message: 'State name is required' });
  }
  if (stateName.trim().toLowerCase() === 'maharashtra') {
    return res.status(200).json({
      available: true,
      message: 'Yes, ServiceHub provides service in your state.'
    });
  } else {
    return res.status(200).json({
      available: false,
      message: 'Sorry, ServiceHub does not provide service in your state.'
    });
  }
};

// Export all controllers (ESM way)
export default {
  getStates,
  getDistricts,
  getCities,
  checkServiceAvailability
};

