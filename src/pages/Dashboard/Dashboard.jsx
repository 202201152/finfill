import StatCard from './cards/StatCard';
import FeaturePromoCard from './cards/FeaturePromoCard';
import ActivityChartCard from './cards/ActivityChartCard';
import VirtualCards from './cards/VirtualCards';
import AccentVisaCard from './cards/AccentVisaCard';
import TotalSpentCard from './cards/TotalSpentCard';
import ContractTypeCard from './cards/ContractTypeCard';
import { Search, LayoutGrid, Calendar, Plus } from 'lucide-react';
import { Button } from '../../components/ui/Button';

export default function Dashboard() {
  return (
    <div className="pb-20 xl:pb-0 animate-in fade-in duration-500">
      {/* Header Area */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4 pt-2">
        <h1 className="text-3xl font-semibold text-gray-900 tracking-tight">Client Dashboard</h1>
        
        <div className="flex items-center gap-3">
          <button className="w-10 h-10 rounded-full flex items-center justify-center text-gray-400 hover:text-gray-900 hover:bg-white transition-colors border border-transparent hover:border-gray-200">
            <Search size={18} />
          </button>
          <button className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center text-gray-400 hover:text-gray-900 transition-colors">
            <LayoutGrid size={18} />
          </button>
          
          <div className="flex items-center bg-gray-50 border border-gray-200 rounded-full px-4 py-2 text-sm font-medium text-gray-600">
            <Calendar size={16} className="mr-2 text-gray-400" />
            20-27 Jan, 2025
          </div>
          
          <Button variant="pill" className="px-5 shadow-md">
            <Plus size={16} className="mr-1" /> Add Wallet
          </Button>
          
          <button className="text-sm font-medium text-gray-500 hover:text-gray-900 ml-2">
            Create a Report
          </button>
        </div>
      </div>

      {/* Grid Layout */}
      <div className="flex flex-col gap-6">
        
        {/* Top Stats Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <StatCard 
            title="Total Balance" 
            amount="$3,886.50" 
            subtitle="+12.5% from last month" 
            trend="up" 
            type="balance" 
          />
          <StatCard 
            title="Total Income" 
            amount="$4,570.00" 
            subtitle="6 transactions" 
            trend="up" 
            type="income" 
          />
          <StatCard 
            title="Total Expenses" 
            amount="$683.50" 
            subtitle="4 transactions" 
            trend="down" 
            type="expense" 
          />
        </div>

        {/* Dynamic Cards Layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <FeaturePromoCard />
          <ActivityChartCard />
          <VirtualCards />
          
          <AccentVisaCard />
          {/* Total spent spans 1 col in this setup, let's keep it uniform or tweak grid logic */}
          <div className="md:col-span-1 lg:col-span-1 xl:col-span-1 min-w-0">
             <TotalSpentCard />
          </div>
          <ContractTypeCard />
        </div>
        
      </div>
    </div>
  );
}
