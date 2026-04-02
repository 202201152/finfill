import { useState } from 'react';
import { motion } from 'framer-motion';
import TransactionFilters from './TransactionFilters';
import TransactionTable from './TransactionTable';
import AddTransactionModal from './AddTransactionModal';
import { useTransactionStore, useRoleStore } from '../../store/useStore';
import { Button } from '../../components/ui/Button';
import { Plus, Download, Search, LayoutGrid, Calendar } from 'lucide-react';
import StatCard from '../Dashboard/cards/StatCard';

const pageVariants = {
  hidden: { opacity: 0, y: 10 },
  show: { opacity: 1, y: 0, transition: { duration: 0.3 } }
};

export default function Transactions() {
  const { role } = useRoleStore();
  const { transactions } = useTransactionStore();
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const isAdmin = role === 'Admin';

  const exportToCSV = () => {
    if (!transactions || transactions.length === 0) return;
    
    const headers = ['ID', 'Merchant', 'Date', 'Amount', 'Category', 'Type'];
    const rows = transactions.map(tx => [
      tx.id,
      tx.merchant,
      tx.date,
      tx.amount,
      tx.category,
      tx.type
    ]);
    
    const csvContent = [
      headers.join(','),
      ...rows.map(row => row.join(','))
    ].join('\n');
    
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.setAttribute('download', `finflow_transactions.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <motion.div 
      variants={pageVariants}
      initial="hidden"
      animate="show"
      className="pb-24 xl:pb-12 h-full flex flex-col"
    >
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4 pt-2">
        <h1 className="text-3xl font-semibold text-gray-900 dark:text-gray-100 tracking-tight">Transactions</h1>
        
        <div className="flex items-center gap-3">
          <button className="w-10 h-10 rounded-full flex items-center justify-center text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-white dark:hover:bg-gray-800 transition-colors border border-transparent hover:border-gray-200 dark:hover:border-gray-700 hidden sm:flex">
            <Search size={18} />
          </button>
          <button className="w-10 h-10 rounded-lg bg-gray-100 dark:bg-[#1f2937] flex items-center justify-center text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors hidden sm:flex">
            <LayoutGrid size={18} />
          </button>
          
          <div className="flex items-center bg-gray-50 dark:bg-[#1f2937] border border-gray-200 dark:border-gray-800 rounded-full px-4 py-2 text-sm font-medium text-gray-600 dark:text-gray-300">
            <Calendar size={16} className="mr-2 text-gray-400 dark:text-gray-500" />
            20-27 Jan, 2025
          </div>
          
          <Button variant="pill" className="px-5 shadow-md hidden sm:flex">
            <Plus size={16} className="mr-1" /> Add Wallet
          </Button>
          
          <button onClick={exportToCSV} className="text-sm font-medium text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white ml-2 transition-colors flex items-center">
            <Download size={14} className="mr-1 shadow-none" /> Export
          </button>
        </div>
      </div>
      
      {/* Filters and Add Transaction are moved inside new Toolbar area */}
      <div className="flex flex-col xl:flex-row justify-between items-start xl:items-center w-full gap-4">
        <TransactionFilters />
        {isAdmin && (
          <Button onClick={() => setIsAddModalOpen(true)} className="w-full sm:w-auto shrink-0 mb-6 xl:mb-0" variant="pill">
            <Plus size={16} className="mr-2" /> Add Transaction
          </Button>
        )}
      </div>
      
      <div className="flex-1 w-full xl:mt-4">
        <TransactionTable />
      </div>

      {/* Bottom Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
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
        <StatCard 
          title="Net Balance" 
          amount="$3,886.50" 
          subtitle="Positive balance" 
          trend="up" 
          type="balance" 
        />
      </div>

      <AddTransactionModal 
        isOpen={isAddModalOpen} 
        onClose={() => setIsAddModalOpen(false)} 
      />
    </motion.div>
  );
}
