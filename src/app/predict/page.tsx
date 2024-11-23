'use client'
import React, { useEffect, useState, useCallback, Suspense, lazy } from 'react';
import { CloudIcon, LineIcon } from '../components/icons/Icons';
import keys from "../keys";

// คอมโพเนนต์ที่โหลดล่าช้า
const CardTemp = lazy(() => import('../components/CardTemp'));

const api = {
  key: keys.API_KEY,
  base: keys.BASE_URL
}

function Page() {
  const [weather, setWeather] = useState<any>({});
  const [dailyForecast, setDailyForecast] = useState<any[]>([]); // Default to empty array
  const [lat, setLat] = useState<number | null>(null);
  const [lon, setLon] = useState<number | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  // Memoize the search function to prevent unnecessary rerenders
  const search = useCallback(() => {
    if (lat && lon) {
      setLoading(true); // Start loading

      // ใช้ Promise.all เพื่อดึงข้อมูลทั้งสองพร้อมกัน
      Promise.all([
        fetch(`${api.base}weather?lat=${lat}&lon=${lon}&appid=${api.key}&units=metric`),
        fetch(`${api.base}forecast?lat=${lat}&lon=${lon}&cnt=7&appid=${api.key}&units=metric`)
      ])
        .then(([weatherRes, forecastRes]) => Promise.all([weatherRes.json(), forecastRes.json()]))
        .then(([weatherData, forecastData]) => {
          setWeather(weatherData);
          setDailyForecast(forecastData.list || []); // Fallback to empty array if no list
          setLoading(false);

          // Save data to sessionStorage
          sessionStorage.setItem('weatherData', JSON.stringify(weatherData));
          sessionStorage.setItem('dailyForecast', JSON.stringify(forecastData.list || []));
        })
        .catch(error => {
          console.error('Error fetching weather data:', error);
          setLoading(false);
        });
    }
  }, [lat, lon]);

  useEffect(() => {
    // Check if data is already in sessionStorage
    const storedWeather = sessionStorage.getItem('weatherData');
    const storedForecast = sessionStorage.getItem('dailyForecast');

    if (storedWeather && storedForecast) {
      setWeather(JSON.parse(storedWeather));
      setDailyForecast(JSON.parse(storedForecast));
      setLoading(false);
    } else {
      // Get current position if data is not in sessionStorage
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            setLat(latitude);
            setLon(longitude);
          },
          (error) => {
            console.error("Error getting location", error);
            setLoading(false);
          }
        );
      } else {
        console.error("Geolocation is not supported by this browser.");
      }
    }
  }, []); // Empty dependency array to ensure this only runs once

  useEffect(() => {
    if (lat && lon) {
      search(); // Fetch weather data when latitude and longitude are available
    }
  }, [lat, lon, search]);

  const formatDate = (timestamp: number) => {
    const date = new Date(timestamp * 1000);
    return date.toLocaleDateString(); // You can adjust the format as needed
  };

  return (
    <div className="text-darkBlue font-bold px-6 pt-8 h-full bg-blue flex flex-col gap-4 overflow-scroll hide-scrollbar pb-40">
      {loading ? (
        <div className="flex h-full justify-center items-center bg-opacity-0 bg-white z-50">
          <div className="text-xl font-semibold">Loading...</div> {/* You can replace this with a spinner */}
        </div>
      ) : (
        <>
          <div className="bg-cream rounded-[16px] p-4 flex gap-2 items-center justify-center">
            <CloudIcon />
            <h2 className='text-[20px]'>
              {weather.weather ? weather.weather[0].main : 'No weather data'}
            </h2>
          </div>

          <div className="flex items-center justify-between">
            <Suspense fallback={<div>Loading Temperature...</div>}>
              <CardTemp title="อุณหภูมิต่ำสุด" value={weather.main ? `${weather.main.temp_min}°` : 'Loading...'} />
            </Suspense>
            <Suspense fallback={<div>Loading Temperature...</div>}>
              <CardTemp title="อุณหภูมิสูงสุด" value={weather.main ? `${weather.main.temp_max}°` : 'Loading...'} />
            </Suspense>
          </div>

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
                      <span className="font-semibold">{formatDate(day.dt)}</span>
                      <div>{day.weather[0].description}</div> {/* Weather description */}
                    </div>
                    <span className='text-[12px] flex items-center gap-[5px]'>
                      {day.main.temp_min}° {<LineIcon />} {day.main.temp_max}°
                    </span> {/* Display min and max temperature */}
                  </div>
                ))
              ) : (
                <div>No forecast available</div> // แสดงข้อความหากไม่มีข้อมูล
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default Page;
