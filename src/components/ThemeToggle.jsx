import { motion } from 'framer-motion';
import { FiSun, FiMoon } from 'react-icons/fi';

const ThemeToggle = ({ darkMode, toggleDarkMode }) => {
  return (
    <motion.button
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      onClick={toggleDarkMode}
      className={`p-2 rounded-full ${
        darkMode ? 'bg-blue-900 text-blue-200' : 'bg-blue-100 text-blue-600'
      }`}
      aria-label="Toggle dark mode"
    >
      {darkMode ? <FiSun size={20} /> : <FiMoon size={20} />}
    </motion.button>
  );
};

export default ThemeToggle;
