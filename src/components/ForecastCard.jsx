import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import WeatherIcon from './WeatherIcon';

const ForecastCard = ({ item, darkMode }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    const date = new Date(item.dt_txt).toISOString().split('T')[0];
    navigate(`/details/${date}`);
  };

  return (
    <motion.div
      whileHover={{ scale: 1.01 }}
      onClick={handleClick}
      className={`p-4 rounded-xl shadow-sm cursor-pointer ${
        darkMode ? 'bg-gray-800/50 border-gray-700' : 'bg-white border-gray-100'
      } border`}
    >
      <div className="flex justify-between items-center mb-2">
        <p className="font-semibold text-lg">
          {new Date(item.dt_txt).toLocaleDateString('uz-UZ', {
            weekday: 'long',
            day: 'numeric',
            month: 'long',
          })}
        </p>
        <WeatherIcon condition={item.weather[0].main} />
      </div>

      <div className="flex items-center justify-between mt-4">
        <div>
          <p className="text-3xl font-bold text-blue-500">
            {Math.round(item.main.temp)}°C
          </p>
          <p className="capitalize">{item.weather[0].description}</p>
        </div>
        <div className="text-right space-y-1">
          <p className="flex items-center justify-end">
            <span className="inline-block w-4 h-4 bg-blue-200 rounded-full mr-2"></span>
            Namlik: {item.main.humidity}%
          </p>
          <p className="flex items-center justify-end">
            <span className="inline-block w-4 h-4 bg-gray-200 rounded-full mr-2"></span>
            Shamol: {item.wind?.speed || 0} m/s
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default ForecastCard;
