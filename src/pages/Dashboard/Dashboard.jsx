import StatCard from './cards/StatCard';
import FeaturePromoCard from './cards/FeaturePromoCard';
import ActivityChartCard from './cards/ActivityChartCard';
import VirtualCards from './cards/VirtualCards';
import AccentVisaCard from './cards/AccentVisaCard';
import TotalSpentCard from './cards/TotalSpentCard';
import ContractTypeCard from './cards/ContractTypeCard';
import { Search, LayoutGrid, Calendar, Plus } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { motion } from 'framer-motion';

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 300, damping: 24 } }
};

export default function Dashboard() {
  return (
    <div className="pb-20 xl:pb-0 animate-in fade-in duration-500">
      {/* Header Area */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4 pt-2">
        <h1 className="text-3xl font-semibold text-gray-900 dark:text-gray-100 tracking-tight">Client Dashboard</h1>
        
        <div className="flex items-center gap-3">
          <div className="flex items-center bg-gray-50 dark:bg-[#1f2937] border border-gray-200 dark:border-gray-800 rounded-full px-4 py-2 text-sm font-medium text-gray-600 dark:text-gray-300">
            <Calendar size={16} className="mr-2 text-gray-400 dark:text-gray-500" />
            20-27 Jan, 2025
          </div>
        </div>
      </div>

      {/* Grid Layout */}
      <motion.div 
        variants={container}
        initial="hidden"
        animate="show"
        className="flex flex-col gap-6"
      >
        
        {/* Top Stats Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <motion.div variants={item}>
            <StatCard 
              title="Total Balance" 
              amount="$3,886.50" 
              subtitle="+12.5% from last month" 
              trend="up" 
              type="balance" 
            />
          </motion.div>
          <motion.div variants={item}>
            <StatCard 
              title="Total Income" 
              amount="$4,570.00" 
              subtitle="6 transactions" 
              trend="up" 
              type="income" 
            />
          </motion.div>
          <motion.div variants={item}>
            <StatCard 
              title="Total Expenses" 
              amount="$683.50" 
              subtitle="4 transactions" 
              trend="down" 
              type="expense" 
            />
          </motion.div>
        </div>

        {/* Dynamic Cards Layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <motion.div variants={item} className="h-full"><FeaturePromoCard /></motion.div>
          <motion.div variants={item} className="h-full"><ActivityChartCard /></motion.div>
          <motion.div variants={item} className="h-full"><VirtualCards /></motion.div>
          
          <motion.div variants={item} className="h-full"><AccentVisaCard /></motion.div>
          {/* Total spent spans 1 col in this setup */}
          <motion.div variants={item} className="md:col-span-1 lg:col-span-1 xl:col-span-1 min-w-0 h-full">
             <TotalSpentCard />
          </motion.div>
          <motion.div variants={item} className="h-full"><ContractTypeCard /></motion.div>
        </div>
        
      </motion.div>
    </div>
  );
}
