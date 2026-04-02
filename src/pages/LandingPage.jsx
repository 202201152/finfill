import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function LandingPage() {
  const navigate = useNavigate();

  const proceedToApp = () => {
    navigate('/dashboard');
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
      className="fixed inset-0 w-full h-full bg-black z-[100] flex items-center justify-center overflow-hidden"
    >
      <video
        src="/Video Project.mp4"
        autoPlay
        muted
        playsInline
        onEnded={proceedToApp}
        className="w-full h-full object-cover"
      />
      
      {/* Fallback Skip Button */}
      <button 
        onClick={proceedToApp}
        className="absolute bottom-8 right-8 px-6 py-2 rounded-full border border-white/20 text-white/50 text-sm font-medium hover:text-white hover:border-white/50 hover:bg-white/10 transition-all backdrop-blur-sm z-10"
      >
        Skip Intro
      </button>
    </motion.div>
  );
}
