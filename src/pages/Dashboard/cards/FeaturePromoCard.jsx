import { Card } from '../../../components/ui/Card';
import { X, ChevronRight } from 'lucide-react';
import { LineChart, Line, ResponsiveContainer } from 'recharts';

const data = [
  { val: 10 }, { val: 15 }, { val: 13 }, { val: 18 }, { val: 17 }, { val: 24 }, { val: 23 }
];

export default function FeaturePromoCard() {
  return (
    <Card className="bg-[#EAEBFE] p-6 relative overflow-hidden flex flex-col h-full min-h-[420px]">
      {/* Top Header */}
      <div className="flex justify-between items-start z-10 w-full mb-6 shrink-0">
        <span className="font-semibold text-gray-700 bg-white px-4 py-1.5 rounded-full text-sm shadow-sm">
          Pro Version
        </span>
        <button className="w-8 h-8 rounded-full bg-white/60 flex items-center justify-center text-gray-600 hover:bg-white transition-colors shadow-sm shrink-0">
          <X size={16} />
        </button>
      </div>
      
      {/* Abstract Cool Image Box */}
      <div className="w-full flex justify-center mb-6 shrink-0">
        <div className="w-[150px] h-[150px] shadow-sm relative overflow-hidden group">
          <img 
            src="/abstract_blue.png" 
            alt="Pro Abstract Graphic" 
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
        </div>
      </div>

      {/* Details */}
      <div className="flex-1 flex flex-col">
        <h3 className="font-bold text-gray-900 dark:text-gray-100 text-base mb-1">Advantages</h3>
        <p className="text-[13px] text-gray-500 dark:text-gray-400 mb-1">Your earnings with the pro version</p>
        
        {/* Subtle Sparkline */}
        <div className="w-full h-10 mb-4 -ml-2 shrink-0">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <Line type="monotone" dataKey="val" stroke="#D2B4FA" strokeWidth={2} dot={false} isAnimationActive={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* 15 Days & Button Row */}
        <div className="flex justify-between items-center mb-6 mt-auto">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#F0F566] drop-shadow-sm"></span>
            <span className="text-[13px] text-gray-500 dark:text-gray-400 font-medium">15 Days</span>
          </div>
          <button className="w-10 h-10 rounded-full bg-[#1A1A1A] flex items-center justify-center text-white hover:bg-black transition-colors shadow-xl">
            <ChevronRight size={18} />
          </button>
        </div>
        
        {/* Bottom Text */}
        <p className="text-center text-xs text-gray-500 dark:text-gray-400 font-medium w-full relative -bottom-1">
          Join the elite of the crypto world with Pro Version
        </p>
      </div>
    </Card>
  );
}
