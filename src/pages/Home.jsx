import { useState, useEffect } from 'react';
import { DataService } from '../config/dataService';
import ENDPOINTS from '../config/endpoints';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { FiSearch, FiRefreshCw } from 'react-icons/fi';
import ThemeToggle from '../components/ThemeToggle';
import SearchInput from '../components/SearchInput';
import DaySelector from '../components/DaySelector';
import ForecastCard from '../components/ForecastCard';
import ErrorDisplay from '../components/ErrorDisplay';
import LoadingState from '../components/LoadingState';
import EmptyState from '../components/EmptyState';
import CityName from '../components/CityName';

const Home = ({ darkMode, setDarkMode }) => {
  const [input, setInput] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [days, setDays] = useState(3);
  const [forecast, setForecast] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDarkMode = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    localStorage.setItem('DARK_MODE', newMode);
  };

  useEffect(() => {
    const lastCity = localStorage.getItem('LAST_CITY');
    const lastDays = localStorage.getItem('LAST_DAYS');
    const savedMode = localStorage.getItem('DARK_MODE') === 'true';

    if (lastCity) {
      setInput(lastCity);
      setSelectedCity(lastCity);
    }
    if (lastDays) {
      setDays(Number(lastDays));
    }
    setDarkMode(savedMode);
  }, []);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  useEffect(() => {
    const delayDebounce = setTimeout(async () => {
      if (input.length >= 2 && !selectedCity) {
        try {
          const res = await axios.get(ENDPOINTS.citySuggestions(input));
          setSuggestions(res.data);
        } catch (err) {
          console.error('Autocomplete error:', err);
          setSuggestions([]);
        }
      } else {
        setSuggestions([]);
      }
    }, 300);

    return () => clearTimeout(delayDebounce);
  }, [input, selectedCity]);

  const handleCitySelect = (cityObj) => {
    setSelectedCity(cityObj.name);
    setInput(cityObj.name);
    setSuggestions([]);
  };

  const handleSearch = async () => {
    if (!selectedCity) return;

    localStorage.setItem('LAST_CITY', selectedCity);
    localStorage.setItem('LAST_DAYS', days);

    setLoading(true);
    setError('');
    try {
      const res = await DataService.get(ENDPOINTS.forecast(selectedCity));
      const dailyData = res.list
        .filter((_, index) => index % 8 === 0)
        .slice(0, days);
      setForecast(dailyData);
    } catch (err) {
      setError(err.message || 'Xatolik yuz berdi. Qayta urinib koʻring.');
      setForecast([]);
    } finally {
      setLoading(false);
    }
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 10,
      },
    },
  };

  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${
        darkMode
          ? 'bg-gradient-to-br from-blue-950 text-gray-100'
          : 'bg-gradient-to-br from-blue-500 text-gray-900'
      }`}
    >
      <div className="max-w-2xl mx-auto p-4 min-h-screen flex flex-col">
        {/* Header */}
        <motion.header
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex justify-between items-center mb-6"
        >
          <h1 className="text-3xl font-bold bg-gradient-to-r from-[#eeff07] to-[#04e60f] bg-clip-text text-transparent">
            Ob-havo
          </h1>
          <ThemeToggle darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
        </motion.header>
        <CityName darkMode={darkMode} />

        {/* Search Section */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-4 mb-6"
        >
          <motion.div variants={itemVariants}>
            <SearchInput
              input={input}
              setInput={setInput}
              selectedCity={selectedCity}
              setSelectedCity={setSelectedCity}
              suggestions={suggestions}
              handleCitySelect={handleCitySelect}
              darkMode={darkMode}
              handleSearch={handleSearch}
            />
          </motion.div>

          <motion.div variants={itemVariants}>
            <DaySelector
              days={days}
              setDays={setDays}
              darkMode={darkMode}
              isDropdownOpen={isDropdownOpen}
              setIsDropdownOpen={setIsDropdownOpen}
            />
          </motion.div>

          <motion.button
            variants={itemVariants}
            whileHover={{
              scale: 1.02,
              boxShadow: '0 4px 14px rgba(14, 165, 233, 0.3)',
            }}
            whileTap={{ scale: 0.98 }}
            onClick={handleSearch}
            disabled={loading}
            className={`w-full py-3 rounded-lg flex items-center justify-center bg-gradient-to-r from-[#0EA5E9] to-[#0D9488] text-white font-medium shadow-md ${
              loading ? 'opacity-80' : ''
            }`}
          >
            {loading ? (
              <motion.span
                transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                className="flex items-center"
              >
                <FiRefreshCw className="mr-2" />
                Yuklanmoqda...
              </motion.span>
            ) : (
              <>
                <FiSearch className="mr-2" />
                Prognozni ko'rsatish
              </>
            )}
          </motion.button>
        </motion.div>

        {/* Error State */}
        <AnimatePresence>
          {error && (
            <ErrorDisplay
              error={error}
              darkMode={darkMode}
              handleSearch={handleSearch}
            />
          )}
        </AnimatePresence>

        {/* Loading State */}
        <AnimatePresence>
          {loading && !error && <LoadingState darkMode={darkMode} />}
        </AnimatePresence>

        {/* Empty State */}
        <AnimatePresence>
          {!loading && !error && forecast.length === 0 && (
            <EmptyState darkMode={darkMode} />
          )}
        </AnimatePresence>

        {/* Forecast Results */}
        <AnimatePresence>
          {!loading && forecast.length > 0 && (
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="flex-1 space-y-4 overflow-y-auto pb-4"
            >
              <h3 className="text-xl font-medium text-[#0EA5E9] mb-2">
                Prognoz natijalari
              </h3>

              {forecast.map((item) => (
                <ForecastCard key={item.dt} item={item} darkMode={darkMode} />
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Home;
