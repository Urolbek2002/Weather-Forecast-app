import { motion } from 'framer-motion';
import { WiDaySunny } from 'react-icons/wi';

const EmptyState = ({ darkMode }) => {
  return (
    <div className="flex-1 flex flex-col items-center justify-center text-center">
      <WiDaySunny className="text-[#0EA5E9] text-6xl mb-4" />
      <h3 className="text-xl font-medium text-[#0EA5E9]">
        Ob-havo ma'lumotlari
      </h3>
      <p className={`mt-2 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
        Shahar nomini kiriting va prognozni ko'rish uchun "Prognozni ko'rsatish"
        tugmasini bosing
      </p>
    </div>
  );
};

export default EmptyState;
