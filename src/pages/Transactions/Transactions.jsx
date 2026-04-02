import { useState } from 'react';
import TransactionFilters from './TransactionFilters';
import TransactionTable from './TransactionTable';
import AddTransactionModal from './AddTransactionModal';
import { useRoleStore } from '../../store/useStore';
import { Button } from '../../components/ui/Button';
import { Plus, Download } from 'lucide-react';

export default function Transactions() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { role } = useRoleStore();
  const isAdmin = role === 'Admin';

  return (
    <div className="pb-20 xl:pb-0 h-full flex flex-col animate-in fade-in duration-500">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 tracking-tight">Transactions</h2>
          <p className="text-[var(--color-text-secondary)] text-sm mt-1">Manage your income and expenses.</p>
        </div>
        
        <div className="flex items-center gap-3 w-full sm:w-auto">
          {isAdmin && (
            <Button variant="outline" className="hidden sm:flex" onClick={() => alert('CSV Downloaded!')}>
              <Download size={16} className="mr-2" /> Export
            </Button>
          )}
          {isAdmin && (
            <Button onClick={() => setIsModalOpen(true)} className="w-full sm:w-auto">
              <Plus size={16} className="mr-2" /> Add Transaction
            </Button>
          )}
        </div>
      </div>
      
      <TransactionFilters />
      
      <div className="flex-1 min-h-[300px]">
        <TransactionTable />
      </div>

      <AddTransactionModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
    </div>
  );
}
