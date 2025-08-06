import { motion } from 'framer-motion';
import { FiAlertCircle } from 'react-icons/fi';

const ErrorDisplay = ({ error, darkMode, handleSearch }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      className={`mb-6 p-4 rounded-lg flex items-start ${
        darkMode ? 'bg-red-900/50 border-red-700' : 'bg-red-100 border-red-200'
      }`}
    >
      <FiAlertCircle
        className="text-red-500 mt-0.5 mr-3 flex-shrink-0"
        size={20}
      />
      <div>
        <p className="font-medium text-red-700 dark:text-red-200">{error}</p>
        <button
          onClick={handleSearch}
          className="mt-2 text-sm font-medium text-red-700 dark:text-red-300 hover:underline"
        >
          Qayta urinib ko'rish
        </button>
      </div>
    </motion.div>
  );
};

export default ErrorDisplay;
