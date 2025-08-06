import { motion, AnimatePresence } from 'framer-motion';
import { FiChevronDown } from 'react-icons/fi';

const DaySelector = ({
  days,
  setDays,
  darkMode,
  isDropdownOpen,
  setIsDropdownOpen,
}) => {
  return (
    <div className="relative">
      <div
        className={`flex items-center justify-between px-4 py-3 rounded-lg cursor-pointer shadow-sm ${
          darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
        }`}
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
      >
        <span>{days} kunlik prognoz</span>
        <motion.div
          animate={{ rotate: isDropdownOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <FiChevronDown className="text-[#0EA5E9]" />
        </motion.div>
      </div>
      <AnimatePresence>
        {isDropdownOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className={`absolute w-full mt-1 rounded-lg shadow-lg z-10 overflow-hidden ${
              darkMode
                ? 'bg-gray-800 border-gray-700'
                : 'bg-white border-gray-200'
            }`}
          >
            {[1, 2, 3, 4, 5].map((d) => (
              <div
                key={d}
                className={`px-4 py-2 cursor-pointer ${
                  darkMode ? 'hover:bg-gray-700' : 'hover:bg-blue-50'
                } ${days === d ? 'bg-[#0EA5E9] text-white' : ''}`}
                onClick={() => {
                  setDays(d);
                  setIsDropdownOpen(false);
                }}
              >
                {d} kunlik
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default DaySelector;
