import { useMemo } from 'react';
import { useTransactionStore, useFilterStore, useRoleStore } from '../../store/useStore';
import { format } from 'date-fns';
import { Trash2, Edit2 } from 'lucide-react';
import { cn } from '../../lib/utils';
import { motion } from 'framer-motion';

export default function TransactionTable() {
  const { transactions, deleteTransaction } = useTransactionStore();
  const { searchQuery, category, type } = useFilterStore();
  const { role } = useRoleStore();
  const isAdmin = role === 'Admin';

  const filteredTransactions = useMemo(() => {
    return transactions.filter(tx => {
      const matchQuery = tx.merchant.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         tx.category.toLowerCase().includes(searchQuery.toLowerCase());
      const matchCategory = category === 'All' || tx.category === category;
      
      // Stable pending logic
      const isPending = tx.amount < 0 && String(tx.id).charCodeAt(0) % 2 !== 0;

      let matchType = false;
      if (type === 'all' || type === 'All') {
        matchType = true;
      } else if (type === 'income' || type === 'expense') {
        matchType = tx.type === type;
      } else if (type === 'pending') {
        matchType = isPending;
      } else if (type === 'completed') {
        matchType = !isPending;
      }

      return matchQuery && matchCategory && matchType;
    });
  }, [transactions, searchQuery, category, type]);

  if (filteredTransactions.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 bg-white dark:bg-[#1f2937] rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 pb-20">
        <div className="text-gray-300 mb-4">
          <svg className="w-24 h-24 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        </div>
        <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-1">No transactions found</h3>
        <p className="text-gray-500 dark:text-gray-400 text-sm">Try adjusting your filters or search query.</p>
      </div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white dark:bg-[#1f2937] rounded-xl shadow-sm border border-gray-100 dark:border-gray-800 overflow-hidden"
    >
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-gray-100 dark:border-gray-800 text-xs font-medium text-gray-400">
              <th className="py-4 px-6 w-32">Date</th>
              <th className="py-4 px-6 w-64">Description</th>
              <th className="py-4 px-6">Category</th>
              <th className="py-4 px-6">Status</th>
              <th className="py-4 px-6 text-right">Amount</th>
              {isAdmin && <th className="py-4 px-6 text-right w-24">Actions</th>}
            </tr>
          </thead>
          <tbody className="text-sm">
            {filteredTransactions.map((tx) => {
              const isPending = tx.amount < 0 && String(tx.id).charCodeAt(0) % 2 !== 0;
              
              return (
                <tr key={tx.id} className="border-b border-gray-50 dark:border-gray-800/50 hover:bg-gray-50/50 dark:hover:bg-gray-800/50 transition-colors">
                  <td className="py-5 px-6 text-gray-400 dark:text-gray-500 text-[13px]">
                    {format(new Date(tx.date), 'MMM dd, yyyy')}
                  </td>
                  <td className="py-5 px-6 font-bold text-gray-800 dark:text-gray-200">
                    {tx.merchant}
                  </td>
                  <td className="py-5 px-6">
                    <span className="px-4 py-1.5 rounded-full text-xs font-medium bg-[#91C388] text-white shadow-sm inline-flex justify-center min-w-[90px]">
                      {tx.category}
                    </span>
                  </td>
                  <td className="py-5 px-6">
                    <div className="flex items-center text-xs font-medium text-gray-500 dark:text-gray-400">
                      <span className={cn("w-1.5 h-1.5 rounded-full mr-2", isPending ? "bg-gray-400" : "bg-[#91C388]")}></span>
                      {isPending ? 'Pending' : 'Completed'}
                    </div>
                  </td>
                  <td className={cn(
                    "py-5 px-6 text-right font-medium",
                    tx.type === 'income' ? 'text-[#91C388]' : 'text-[#FF7A7A]'
                  )}>
                    {tx.type === 'income' ? '+' : '-'}${Math.abs(tx.amount).toFixed(2)}
                  </td>
                  {isAdmin && (
                    <td className="py-5 px-6">
                      <div className="flex items-center justify-end gap-3 opacity-60 hover:opacity-100 transition-opacity">
                        <button className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors">
                          <Edit2 size={14} />
                        </button>
                        <button 
                          onClick={() => deleteTransaction(tx.id)}
                          className="text-[#FF7A7A] hover:text-red-500 transition-colors"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </td>
                  )}
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
      
      {/* Table Footer */}
      <div className="flex justify-between items-center p-5 text-xs font-medium border-t border-gray-100 dark:border-gray-800 text-gray-400">
        <span className="dark:text-gray-500">Showing {filteredTransactions.length} transactions</span>
        <button className="hover:text-gray-600 dark:hover:text-gray-300 transition-colors hover:underline">
          All transactions
        </button>
      </div>
    </motion.div>
  );
}
