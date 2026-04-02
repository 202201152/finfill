import { useState } from 'react';
import { motion } from 'framer-motion';
import TransactionFilters from './TransactionFilters';
import TransactionTable from './TransactionTable';
import AddTransactionModal from './AddTransactionModal';
import { useTransactionStore, useRoleStore } from '../../store/useStore';
import { Button } from '../../components/ui/Button';
import { Plus, Download } from 'lucide-react';

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
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 shrink-0">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 tracking-tight">Transactions</h2>
          <p className="text-[var(--color-text-secondary)] text-sm mt-1">Manage your income and expenses.</p>
        </div>
        
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <div className="flex gap-3 mt-4 md:mt-0">
            <Button variant="outline" onClick={exportToCSV}>
              <Download size={16} className="mr-2" /> Export
            </Button>
            {isAdmin && (
              <Button onClick={() => setIsAddModalOpen(true)} className="w-full sm:w-auto">
                <Plus size={16} className="mr-2" /> Add Transaction
              </Button>
            )}
          </div>
        </div>
      </div>
      
      <TransactionFilters />
      
      <div className="flex-1 min-h-[300px]">
        <TransactionTable />
      </div>

      <AddTransactionModal 
        isOpen={isAddModalOpen} 
        onClose={() => setIsAddModalOpen(false)} 
      />
    </motion.div>
  );
}
