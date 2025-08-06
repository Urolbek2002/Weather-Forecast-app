import { motion } from 'framer-motion';
import { WiDaySunny } from 'react-icons/wi';

const LoadingState = ({ darkMode }) => {
  return (
    <div className="flex-1 flex flex-col items-center justify-center">
      <motion.div
        animate={{
          rotate: 360,
          scale: [1, 1.1, 1],
        }}
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
      <p className={`mt-2 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
        Bu bir necha soniya vaqt olishi mumkin
      </p>
    </div>
  );
};

export default LoadingState;
