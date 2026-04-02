import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { mockTransactions } from '../data/mockTransactions';

export const useRoleStore = create(
  persist(
    (set) => ({
      role: 'Viewer', // 'Viewer' or 'Admin'
      toggleRole: () => set((state) => ({ role: state.role === 'Viewer' ? 'Admin' : 'Viewer' })),
    }),
    { name: 'finflow-role-storage' }
  )
);

export const useFilterStore = create(
  persist(
    (set) => ({
      searchQuery: '',
      setSearchQuery: (query) => set({ searchQuery: query }),
      category: 'All', // 'All' or specific category
      setCategory: (category) => set({ category }),
      type: 'All', // 'All', 'income', or 'expense'
      setType: (type) => set({ type }),
      dateRange: 'All Time', // 'All Time', 'This Month', 'Last Month'
      setDateRange: (dateRange) => set({ dateRange }),
      clearFilters: () => set({ searchQuery: '', category: 'All', type: 'All', dateRange: 'All Time' })
    }),
    { name: 'finflow-filter-storage' }
  )
);

export const useTransactionStore = create(
  persist(
    (set) => ({
      transactions: mockTransactions,
      addTransaction: (transaction) => set((state) => ({ 
        transactions: [{ id: Date.now().toString(), ...transaction }, ...state.transactions] 
      })),
      editTransaction: (id, updatedTx) => set((state) => ({
        transactions: state.transactions.map((tx) => (tx.id === id ? { ...tx, ...updatedTx } : tx)),
      })),
      deleteTransaction: (id) => set((state) => ({
        transactions: state.transactions.filter((tx) => tx.id !== id),
      })),
    }),
    { name: 'finflow-transaction-storage' }
  )
);
