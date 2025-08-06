import { motion, AnimatePresence } from 'framer-motion';
import { FiSearch } from 'react-icons/fi';

const SearchInput = ({
  input,
  setInput,
  selectedCity,
  setSelectedCity,
  suggestions,
  handleCitySelect,
  darkMode,
  handleSearch,
}) => {
  return (
    <div className="relative">
      <div className="relative flex items-center shadow-sm">
        <input
          type="text"
          placeholder="Shahar nomini kiriting..."
          className={`w-full px-4 py-3 rounded-lg pl-12 focus:outline-none focus:ring-2 focus:ring-[#0EA5E9] transition-all ${
            darkMode
              ? 'bg-gray-800 border-gray-700 text-white'
              : 'bg-white border-gray-200 text-gray-900'
          }`}
          value={input}
          onChange={(e) => {
            setInput(e.target.value);
            setSelectedCity('');
          }}
          onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
        />
        <FiSearch className="absolute left-4 text-[#0EA5E9]" size={20} />
      </div>

      <AnimatePresence>
        {suggestions.length > 0 && (
          <motion.ul
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className={`absolute w-full mt-1 rounded-lg shadow-lg z-10 overflow-hidden ${
              darkMode
                ? 'bg-gray-800 border-gray-700'
                : 'bg-white border-gray-200'
            }`}
          >
            {suggestions.map((s, i) => (
              <motion.li
                key={i}
                whileHover={{
                  scale: 1.01,
                  backgroundColor: darkMode
                    ? 'rgba(14, 165, 233, 0.1)'
                    : 'rgba(14, 165, 233, 0.05)',
                }}
                className={`px-4 py-3 cursor-pointer border-b ${
                  darkMode
                    ? 'border-gray-700 hover:bg-gray-700'
                    : 'border-gray-100 hover:bg-blue-50'
                }`}
                onClick={() => handleCitySelect(s)}
              >
                <div className="font-medium">{s.name}</div>
                <div
                  className={`text-sm ${
                    darkMode ? 'text-gray-400' : 'text-gray-500'
                  }`}
                >
                  {s.country}
                </div>
              </motion.li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SearchInput;
