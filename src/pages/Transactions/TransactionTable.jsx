import { useState, useMemo } from 'react';
import { useTransactionStore, useFilterStore, useRoleStore } from '../../store/useStore';
import { Badge } from '../../components/ui/Badge';
import { format } from 'date-fns';
import { Trash2, Edit2 } from 'lucide-react';
import { cn } from '../../lib/utils';

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
      const matchType = type === 'All' || tx.type === type;
      return matchQuery && matchCategory && matchType;
    });
  }, [transactions, searchQuery, category, type]);

  if (filteredTransactions.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 bg-white rounded-2xl shadow-sm border border-gray-100 pb-20">
        <div className="text-gray-300 mb-4">
          <svg className="w-24 h-24 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        </div>
        <h3 className="text-lg font-medium text-gray-900 mb-1">No transactions found</h3>
        <p className="text-gray-500 text-sm">Try adjusting your filters or search query.</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-gray-100 text-sm text-[var(--color-text-secondary)]">
              <th className="py-4 px-6 font-medium">Merchant</th>
              <th className="py-4 px-6 font-medium">Date</th>
              <th className="py-4 px-6 font-medium">Category</th>
              <th className="py-4 px-6 font-medium text-right">Amount</th>
              {isAdmin && <th className="py-4 px-6 font-medium w-24"></th>}
            </tr>
          </thead>
          <tbody className="text-sm">
            {filteredTransactions.map(tx => (
              <tr key={tx.id} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors group">
                <td className="py-4 px-6 font-medium text-gray-900">{tx.merchant}</td>
                <td className="py-4 px-6 text-gray-500">{format(new Date(tx.date), 'MMM dd, yyyy')}</td>
                <td className="py-4 px-6">
                  <Badge variant="outline">{tx.category}</Badge>
                </td>
                <td className={cn(
                  "py-4 px-6 text-right font-medium",
                  tx.type === 'income' ? 'text-[var(--color-income)]' : 'text-gray-900'
                )}>
                  {tx.type === 'income' ? '+' : '-'}${Math.abs(tx.amount).toFixed(2)}
                </td>
                {isAdmin && (
                  <td className="py-4 px-6">
                    <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="p-1.5 text-gray-400 hover:text-[var(--color-sage)] rounded-md hover:bg-green-50">
                        <Edit2 size={16} />
                      </button>
                      <button 
                        onClick={() => deleteTransaction(tx.id)}
                        className="p-1.5 text-gray-400 hover:text-red-500 rounded-md hover:bg-red-50"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
