import { useState } from 'react';
import { useTransactionStore } from '../../store/useStore';
import { Button } from '../../components/ui/Button';
import { X } from 'lucide-react';

export default function AddTransactionModal({ isOpen, onClose }) {
  const { addTransaction } = useTransactionStore();
  
  const [formData, setFormData] = useState({
    merchant: '',
    category: 'Food',
    amount: '',
    type: 'expense',
    date: new Date().toISOString().split('T')[0]
  });

  const categories = ['Food', 'Transport', 'Shopping', 'Salary', 'Rent', 'Entertainment', 'Health', 'Freelance'];

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    addTransaction({
      ...formData,
      amount: parseFloat(formData.amount),
      date: new Date(formData.date).toISOString()
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl p-6 w-full max-w-md shadow-2xl relative animate-in zoom-in-95 duration-200">
        <button 
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-400 hover:text-gray-600 bg-gray-100 rounded-full p-1"
        >
          <X size={20} />
        </button>
        
        <h2 className="text-xl font-bold mb-6 text-gray-900">Add Transaction</h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Merchant / Title</label>
            <input 
              required
              type="text" 
              className="w-full border border-gray-200 rounded-xl px-4 py-2.5 focus:ring-2 focus:ring-[var(--color-sage)] outline-none text-gray-900 dark:text-gray-900 bg-white dark:bg-white"
              value={formData.merchant}
              onChange={e => setFormData({...formData, merchant: e.target.value})}
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Amount</label>
              <input 
                required
                type="number" 
                step="0.01"
                className="w-full border border-gray-200 rounded-xl px-4 py-2.5 focus:ring-2 focus:ring-[var(--color-sage)] outline-none text-gray-900 dark:text-gray-900 bg-white dark:bg-white"
                value={formData.amount}
                onChange={e => setFormData({...formData, amount: e.target.value})}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
              <input 
                required
                type="date"
                className="w-full border border-gray-200 rounded-xl px-4 py-2.5 focus:ring-2 focus:ring-[var(--color-sage)] outline-none text-gray-900 dark:text-gray-900 bg-white dark:bg-white"
                value={formData.date}
                onChange={e => setFormData({...formData, date: e.target.value})}
              />
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
              <select 
                className="w-full border border-gray-200 rounded-xl px-4 py-2.5 focus:ring-2 focus:ring-[var(--color-sage)] outline-none bg-white dark:bg-white text-gray-900 dark:text-gray-900"
                value={formData.category}
                onChange={e => setFormData({...formData, category: e.target.value})}
              >
                {categories.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
              <select 
                className="w-full border border-gray-200 rounded-xl px-4 py-2.5 focus:ring-2 focus:ring-[var(--color-sage)] outline-none bg-white dark:bg-white text-gray-900 dark:text-gray-900"
                value={formData.type}
                onChange={e => setFormData({...formData, type: e.target.value})}
              >
                <option value="expense">Expense</option>
                <option value="income">Income</option>
              </select>
            </div>
          </div>
          
          <div className="pt-4">
            <Button type="submit" className="w-full h-12 text-base">Add Transaction</Button>
          </div>
        </form>
      </div>
    </div>
  );
}
