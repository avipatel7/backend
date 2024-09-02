import axios from 'axios';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

const apiKey = process.env.API_KEY;

export const getWeather = async (req, res) => {
    // console.log("ok")
  const city = req.params.city;

  try {
    // Fetch latitude and longitude using the city name
    const geoResponse = await axios.get(`https://api.openweathermap.org/geo/1.0/direct`, {
      params: {
        q: city,
        limit: 5,
        appid: apiKey
      }
    });

    const geoData = geoResponse.data;

    // Get latitude and longitude from the response
    const lat = geoData[4]?.lat ?? geoData[0]?.lat;
    const lon = geoData[4]?.lon ?? geoData[0]?.lon;

    if (!lat || !lon) {
      return res.status(404).json({ error: 'Location not found' });
    }

    // Fetch current weather data using latitude and longitude
    const weatherResponse = await axios.get(`https://api.openweathermap.org/data/3.0/onecall`, {
      params: {
        lat: lat,
        lon: lon,
        exclude: 'hourly,daily',
        appid: apiKey
      }
    });

    const weatherData = weatherResponse.data;

    // Send the current weather data as the response
    res.json(weatherData.current);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred' });
  }
};

export default {
  getWeather
};
