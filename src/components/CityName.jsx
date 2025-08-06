import { useEffect, useState } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { FiMapPin, FiLoader, FiAlertCircle, FiCrosshair } from 'react-icons/fi';

const LocationCity = ({ darkMode }) => {
  const [city, setCity] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getLocation = async () => {
      setIsLoading(true);

      try {
        const position = await new Promise((resolve, reject) => {
          navigator.geolocation.getCurrentPosition(resolve, reject);
        });

        const { latitude, longitude } = position.coords;

        const res = await axios.get(
          `https://api.openweathermap.org/geo/1.0/reverse`,
          {
            params: {
              lat: latitude,
              lon: longitude,
              limit: 1,
              appid: '4bc38e9b01c1b977daeb2f7bce015969',
            },
          },
        );

        if (res.data.length > 0) {
          setCity(res.data[0].name);
        } else {
          setError(
            'Shahar topilmadi. Joylashuvingizga yaqin shahar aniqlanmadi.',
          );
        }
      } catch (err) {
        setError(
          err.message.includes('Geolocation')
            ? 'Geolokatsiyaga ruxsat berilmagan. Iltimos, brauzer sozlamalaridan ruxsat bering.'
            : `Xatolik yuz berdi: ${err.message}`,
        );
      } finally {
        setIsLoading(false);
      }
    };

    getLocation();
  }, []);

  const handleRetry = () => {
    setError(null);
    setCity(null);
    setIsLoading(true);
    // useEffect(() => {}); // This will retrigger the effect
  };

  return (
    <div
      className={`min-h-[200px] flex items-center justify-center m-4 p-6 ${
        darkMode ? 'bg-gray-900 text-gray-100' : 'bg-gray-100 text-gray-900'
      } rounded-xl shadow-md`}
    >
      <AnimatePresence mode="wait">
        {isLoading ? (
          <motion.div
            key="loading"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="flex flex-col items-center justify-center text-center"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: 'linear',
              }}
            >
              <FiLoader className="text-blue-500 text-4xl mb-4" />
            </motion.div>
            <h2 className="text-xl font-medium text-gray-800">
              Joylashuvingiz aniqlanmoqda...
            </h2>
            <p className="text-gray-500 mt-2">
              Geolokatsiya ma'lumotlari olinayotgan
            </p>
          </motion.div>
        ) : error ? (
          <motion.div
            key="error"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="flex flex-col items-center justify-center text-center max-w-md"
          >
            <div className="p-4 bg-red-100 rounded-full mb-4">
              <FiAlertCircle className="text-red-500 text-3xl" />
            </div>
            <h2 className="text-xl font-medium text-gray-800 mb-2">
              Xatolik yuz berdi
            </h2>
            <p className="text-gray-600 mb-6">{error}</p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleRetry}
              className="px-6 py-2 bg-blue-500 text-white rounded-lg flex items-center"
            >
              <FiCrosshair className="mr-2" />
              Qayta urinish
            </motion.button>
          </motion.div>
        ) : (
          <motion.div
            key="success"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="flex flex-col items-center justify-center text-center"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 200, damping: 15 }}
            >
              <div className="p-4 bg-blue-100 rounded-full mb-6">
                <FiMapPin className="text-blue-500 text-4xl" />
              </div>
            </motion.div>
            <h2
              className={`text-xl font-medium ${
                darkMode ? 'text-gray-100' : 'text-gray-900'
              } mb-1`}
            >
              Siz joylashgan shahar
            </h2>
            <motion.p
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2 }}
              className="text-3xl font-bold text-blue-600 mb-4"
            >
              {city}
            </motion.p>
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: '100%' }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="h-1 bg-blue-200 rounded-full"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default LocationCity;
