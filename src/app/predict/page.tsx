'use client'
import React, { useEffect, useState, useCallback, Suspense, lazy } from 'react';
import { CloudIcon, LineIcon } from '../components/icons/Icons';
import keys from "../keys";

// Lazy load CardTemp component
const CardTemp = lazy(() => import('../components/CardTemp'));

const api = {
  key: keys.API_KEY,
  base: keys.BASE_URL,
};

// Utility function to format date
const formatDate = (timestamp: number) => {
  const date = new Date(timestamp * 1000);
  return date.toLocaleDateString('th-TH', {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
  });
};

function Page() {
  const [weather, setWeather] = useState<any>({});
  const [dailyForecast, setDailyForecast] = useState<any[]>([]);
  const [lat, setLat] = useState<number | null>(null);
  const [lon, setLon] = useState<number | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  // Fetch weather and forecast data when coordinates are set
  const fetchWeatherData = useCallback(() => {
    if (!lat || !lon) return;

    setLoading(true);
    Promise.all([
      fetch(`${api.base}weather?lat=${lat}&lon=${lon}&appid=${api.key}&units=metric`),
      fetch(`${api.base}forecast?lat=${lat}&lon=${lon}&cnt=7&appid=${api.key}&units=metric`),
    ])
      .then(([weatherRes, forecastRes]) => Promise.all([weatherRes.json(), forecastRes.json()]))
      .then(([weatherData, forecastData]) => {
        setWeather(weatherData);
        setDailyForecast(forecastData.list || []);
        setLoading(false);

        // Save to sessionStorage
        sessionStorage.setItem('weatherData', JSON.stringify(weatherData));
        sessionStorage.setItem('dailyForecast', JSON.stringify(forecastData.list || []));
      })
      .catch(error => {
        console.error('Error fetching weather data:', error);
        setLoading(false);
      });
  }, [lat, lon]);

  // Check sessionStorage or get current location on mount
  useEffect(() => {
    const storedWeather = sessionStorage.getItem('weatherData');
    const storedForecast = sessionStorage.getItem('dailyForecast');

    if (storedWeather && storedForecast) {
      setWeather(JSON.parse(storedWeather));
      setDailyForecast(JSON.parse(storedForecast));
      setLoading(false);
    } else if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        ({ coords: { latitude, longitude } }) => {
          setLat(latitude);
          setLon(longitude);
        },
        (error) => {
          console.error("Error getting location:", error);
          setLoading(false);
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  }, []);

  useEffect(() => {
    fetchWeatherData(); // Fetch data when lat/lon updates
  }, [lat, lon, fetchWeatherData]);

  return (
    <div className="text-darkBlue font-bold px-6 pt-8 h-full bg-blue flex flex-col gap-4 overflow-scroll hide-scrollbar pb-40">
      {loading ? (
        <div className="flex h-full justify-center items-center bg-opacity-0 bg-white z-50">
          <div className="text-xl font-semibold">Loading...</div>
        </div>
      ) : (
        <>
          {/* Weather Summary */}
          <div className="bg-cream rounded-[16px] p-4 flex gap-2 items-center justify-center">
            <CloudIcon />
            <h2 className='text-[20px]'>
              {weather.weather ? weather.weather[0].main : 'No weather data'}
            </h2>
          </div>

          {/* Temperature Cards */}
          <div className="flex items-center justify-between">
            <Suspense fallback={<div>Loading Temperature...</div>}>
              <CardTemp title="อุณหภูมิต่ำสุด" value={weather.main ? `${weather.main.temp_min}°` : 'Loading...'} />
            </Suspense>
            <Suspense fallback={<div>Loading Temperature...</div>}>
              <CardTemp title="อุณหภูมิสูงสุด" value={weather.main ? `${weather.main.temp_max}°` : 'Loading...'} />
            </Suspense>
          </div>

          {/* Humidity and Rainfall Cards */}
          <div className="flex items-center justify-between">
            <Suspense fallback={<div>Loading Humidity...</div>}>
              <CardTemp title="ความชื้นสัมพัทธ์" value={weather.main ? `${weather.main.humidity}%` : 'Loading...'} />
            </Suspense>
            <Suspense fallback={<div>Loading Rain...</div>}>
              <CardTemp title="ปริมาณน้ำฝน" value={weather.rain ? `${weather.rain['1h']} มม.` : '0 มม.'} />
            </Suspense>
          </div>

          {/* Daily Forecast Section */}
          <div className="bg-cream rounded-[16px] p-4">
            <h3 className='pb-4'>พยากรณ์อากาศรายวัน</h3>
            <div className="flex flex-col gap-4">
              {dailyForecast.length > 0 ? (
                dailyForecast.map((day, index) => (
                  <div key={index} className="flex justify-between">
                    <div>
                      {/* <span className="font-semibold">{formatDate(day.dt)}</span> */}
                      <div>{day.weather[0].description}</div>
                    </div>
                    <span className='text-[12px] flex items-center gap-[5px]'>
                      {day.main.temp_min}° {<LineIcon />} {day.main.temp_max}°
                    </span>
                  </div>
                ))
              ) : (
                <div>No forecast available</div>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default Page;
