import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  WiDaySunny,
  WiRain,
  WiCloudy,
  WiSnow,
  WiThunderstorm,
  WiFog,
} from 'react-icons/wi';
import {
  FiArrowLeft,
  FiDroplet,
  FiWind,
  FiEye,
  FiCloud,
  FiSun,
  FiClock,
} from 'react-icons/fi';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { DataService } from '../config/dataService';
import ENDPOINTS from '../config/endpoints';

const DetailsPage = () => {
  const { date } = useParams();
  const navigate = useNavigate();
  const [weatherData, setWeatherData] = useState(null);
  const [hourlyData, setHourlyData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [darkMode, setDarkMode] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Asosiy sahifada tanlangan shahar va ma'lumotlarni localStoragedan olamiz
        const selectedCity = localStorage.getItem('LAST_CITY');
        // setDarkMode(localStorage.getItem('DARK_MODE'));
        if (!selectedCity) {
          throw new Error('Shahar tanlanmagan');
        }
        const response = await DataService.get(
          ENDPOINTS.forecast(selectedCity),
        );
        const selectedDayData = response.list.find(
          (item) => new Date(item.dt_txt).toISOString().split('T')[0] === date,
        );

        const hourly = response.list.filter(
          (item) => new Date(item.dt_txt).toISOString().split('T')[0] === date,
        );

        if (!selectedDayData || hourly.length === 0) {
          throw new Error("Ma'lumot topilmadi");
        }

        setWeatherData(selectedDayData);
        setHourlyData(hourly);
      } catch (err) {
        setError(err.message || 'Xatolik yuz berdi');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [date]);

  if (loading) {
    return (
      <div
        className={`min-h-screen flex items-center justify-center ${
          darkMode
            ? 'bg-gray-900 text-gray-100'
            : 'bg-gradient-to-br from-blue-50 to-white'
        }`}
      >
        <div className="text-center">
          <motion.div
            animate={{ rotate: 360, scale: [1, 1.1, 1] }}
            transition={{
              rotate: { duration: 2, repeat: Infinity, ease: 'linear' },
              scale: { duration: 1.5, repeat: Infinity, ease: 'easeInOut' },
            }}
            className="mb-4"
          >
            <WiDaySunny className="text-[#0EA5E9] text-6xl" />
          </motion.div>
          <p className="text-lg text-[#0EA5E9] font-medium">
            Ma'lumotlar yuklanmoqda...
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div
        className={`min-h-screen flex items-center justify-center ${
          darkMode
            ? 'bg-gray-900 text-gray-100'
            : 'bg-gradient-to-br from-blue-50 to-white'
        }`}
      >
        <div
          className={`p-4 rounded-lg flex items-start ${
            darkMode
              ? 'bg-red-900/50 border-red-700'
              : 'bg-red-100 border-red-200'
          }`}
        >
          <p className="font-medium text-red-700 dark:text-red-200">{error}</p>
        </div>
      </div>
    );
  }

  if (!weatherData) {
    return (
      <div
        className={`min-h-screen flex items-center justify-center ${
          darkMode
            ? 'bg-gray-900 text-gray-100'
            : 'bg-gradient-to-br from-blue-50 to-white'
        }`}
      >
        <div className="text-center">
          <p className="text-lg text-[#0EA5E9] font-medium">
            Ma'lumot topilmadi
          </p>
        </div>
      </div>
    );
  }

  // Harorat grafigi uchun ma'lumotlarni tayyorlaymiz
  const tempChartData = hourlyData.map((hour) => ({
    time: new Date(hour.dt * 1000).getHours() + ':00',
    temp: Math.round(hour.main.temp),
    feelsLike: Math.round(hour.main.feels_like),
  }));

  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${
        darkMode
          ? 'dark bg-gray-900 text-gray-100'
          : 'bg-gradient-to-br from-blue-50 to-white text-gray-900'
      }`}
    >
      <div className="max-w-2xl mx-auto p-4 min-h-screen flex flex-col">
        {/* Header */}
        <motion.header
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center mb-6"
        >
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => navigate(-1)}
            className={`p-2 rounded-full mr-4 ${
              darkMode
                ? 'bg-blue-900 text-blue-200'
                : 'bg-blue-100 text-blue-600'
            }`}
          >
            <FiArrowLeft size={20} />
          </motion.button>
          <h1 className="text-2xl font-bold bg-gradient-to-r from-[#0EA5E9] to-[#0D9488] bg-clip-text text-transparent">
            Tafsilotlar
          </h1>
        </motion.header>

        {/* Asosiy ma'lumotlar */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className={`mb-6 p-4 rounded-xl ${
            darkMode
              ? 'bg-gray-800/50 border-gray-700'
              : 'bg-white border-gray-100'
          } border shadow-sm`}
        >
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">
              {new Date(weatherData.dt_txt).toLocaleDateString('uz-UZ', {
                weekday: 'long',
                day: 'numeric',
                month: 'long',
              })}
            </h2>
            <WeatherIcon condition={weatherData.weather[0].main} />
          </div>

          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-4xl font-bold text-[#0EA5E9]">
                {Math.round(weatherData.main.temp)}°C
              </p>
              <p className="capitalize">{weatherData.weather[0].description}</p>
            </div>
            <div className="text-right">
              <p>His etiladi: {Math.round(weatherData.main.feels_like)}°C</p>
              <p>
                Min: {Math.round(weatherData.main.temp_min)}°C | Max:{' '}
                {Math.round(weatherData.main.temp_max)}°C
              </p>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <DetailItem
              icon={<FiDroplet />}
              title="Namlik"
              value={`${weatherData.main.humidity}%`}
              darkMode={darkMode}
            />
            <DetailItem
              icon={<FiWind />}
              title="Shamol"
              value={`${weatherData.wind.speed} m/s`}
              darkMode={darkMode}
            />
            <DetailItem
              icon={<FiEye />}
              title="Ko'rinish"
              value={`${(weatherData.visibility / 1000).toFixed(1)} km`}
              darkMode={darkMode}
            />
            <DetailItem
              icon={<FiCloud />}
              title="Bulutlar"
              value={`${weatherData.clouds.all}%`}
              darkMode={darkMode}
            />
            <DetailItem
              icon={<FiSun />}
              title="Quyosh"
              value={new Date(
                weatherData.sys.sunrise * 1000,
              ).toLocaleTimeString('uz-UZ', {
                hour: '2-digit',
                minute: '2-digit',
              })}
              darkMode={darkMode}
            />
            <DetailItem
              icon={<FiDroplet />}
              title="Bosim"
              value={`${weatherData.main.pressure} hPa`}
              darkMode={darkMode}
            />
          </div>
        </motion.div>

        {/* Harorat grafigi */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className={`mb-6 p-4 rounded-xl ${
            darkMode
              ? 'bg-gray-800/50 border-gray-700'
              : 'bg-white border-gray-100'
          } border shadow-sm`}
        >
          <h3 className="text-lg font-semibold mb-4 flex items-center">
            <FiClock className="mr-2" /> Kun davomidagi harorat
          </h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={tempChartData}>
                <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                <XAxis dataKey="time" />
                <YAxis />
                <Tooltip
                  contentStyle={{
                    backgroundColor: darkMode ? '#1F2937' : '#FFFFFF',
                    borderColor: darkMode ? '#374151' : '#E5E7EB',
                    borderRadius: '0.5rem',
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="temp"
                  stroke="#0EA5E9"
                  strokeWidth={2}
                  dot={{ r: 4 }}
                  activeDot={{ r: 6 }}
                  name="Harorat (°C)"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Soatlik prognoz */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className={`mb-6 p-4 rounded-xl ${
            darkMode
              ? 'bg-gray-800/50 border-gray-700'
              : 'bg-white border-gray-100'
          } border shadow-sm`}
        >
          <h3 className="text-lg font-semibold mb-4">Soatlik prognoz</h3>
          <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
            {hourlyData.map((hour, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.03 }}
                className={`p-3 rounded-lg text-center ${
                  darkMode ? 'bg-gray-700' : 'bg-blue-50'
                }`}
              >
                <p className="font-medium">
                  {new Date(hour.dt * 1000).getHours()}:00
                </p>
                <div className="flex justify-center my-2">
                  <WeatherIcon condition={hour.weather[0].main} />
                </div>
                <p className="text-xl font-bold text-[#0EA5E9]">
                  {Math.round(hour.main.temp)}°C
                </p>
                <p className="text-sm capitalize">
                  {hour.weather[0].description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

// DetailItem komponenti
const DetailItem = ({ icon, title, value, darkMode }) => (
  <div
    className={`p-3 rounded-lg text-center ${
      darkMode ? 'bg-gray-700' : 'bg-blue-50'
    }`}
  >
    <div className="flex justify-center text-[#0EA5E9] mb-1">{icon}</div>
    <p className="text-sm opacity-70">{title}</p>
    <p className="font-medium">{value}</p>
  </div>
);

// WeatherIcon komponenti
const WeatherIcon = ({ condition, className = '' }) => {
  switch (condition.toLowerCase()) {
    case 'clear':
      return <WiDaySunny className={`text-yellow-400 text-4xl ${className}`} />;
    case 'rain':
      return <WiRain className={`text-blue-400 text-4xl ${className}`} />;
    case 'clouds':
      return <WiCloudy className={`text-gray-400 text-4xl ${className}`} />;
    case 'snow':
      return <WiSnow className={`text-blue-200 text-4xl ${className}`} />;
    case 'thunderstorm':
      return (
        <WiThunderstorm className={`text-purple-500 text-4xl ${className}`} />
      );
    case 'mist':
    case 'fog':
    case 'haze':
      return <WiFog className={`text-gray-300 text-4xl ${className}`} />;
    default:
      return <WiDaySunny className={`text-yellow-400 text-4xl ${className}`} />;
  }
};

export default DetailsPage;
