'use client';

import { useState, useEffect, useMemo } from 'react';
import { Transaction } from '@/types/transaction';
import TransactionModal from '@/components/TransactionModal';
import SummaryCards from '@/components/SummaryCards';
import { exportToCSV, exportToPDF } from '@/utils/export';
import { Plus, RefreshCw, Edit3, Trash2, Wallet, FileSpreadsheet, FileText } from 'lucide-react';

export default function Home() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTransaction, setEditingTransaction] = useState<Transaction | null>(null);

  // Filter States
  const [startDate, setStartDate] = useState<string>('');
  const [endDate, setEndDate] = useState<string>('');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');

  useEffect(() => {
    const saved = localStorage.getItem('expense_tracker_data');
    if (saved) {
      try {
        setTransactions(JSON.parse(saved));
      } catch (e) {
        console.error('Failed to parse saved data', e);
      }
    }
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem('expense_tracker_data', JSON.stringify(transactions));
    }
  }, [transactions, isLoaded]);

  const handleSaveTransaction = (tx: Transaction) => {
    setTransactions((prev) => {
      const exists = prev.some((item) => item.id === tx.id);
      if (exists) {
        return prev.map((item) => (item.id === tx.id ? tx : item));
      }
      return [tx, ...prev];
    });
  };

  const handleDeleteTransaction = (id: string) => {
    setTransactions((prev) => prev.filter((item) => item.id !== id));
  };

  const handleEditClick = (tx: Transaction) => {
    setEditingTransaction(tx);
    setIsModalOpen(true);
  };

  const handleResetFilters = () => {
    setStartDate('');
    setEndDate('');
    setCategoryFilter('all');
  };

  // Filter Logic
  const filteredTransactions = useMemo(() => {
    return transactions.filter((t) => {
      const txDate = new Date(t.date).getTime();
      const start = startDate ? new Date(startDate).getTime() : null;
      const end = endDate ? new Date(endDate).getTime() + 86400000 : null;

      if (start && txDate < start) return false;
      if (end && txDate > end) return false;
      if (categoryFilter !== 'all' && t.type !== categoryFilter) return false;

      return true;
    });
  }, [transactions, startDate, endDate, categoryFilter]);

  // Total summary calculation
  const totalFilteredAmount = useMemo(() => {
    return filteredTransactions.reduce((acc, t) => {
      return t.type === 'income' ? acc + t.amount : acc - t.amount;
    }, 0);
  }, [filteredTransactions]);

  if (!isLoaded) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center text-gray-400 font-medium">
        กำลังโหลดระบบ...
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-[#f8fafc] text-slate-800 antialiased pb-12">
      
      {/* Top Navbar */}
      <nav className="bg-white border-b border-gray-100 sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-red-600 flex items-center justify-center text-white shadow-md shadow-red-200">
              <Wallet className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-base font-bold text-slate-900 tracking-tight">Expense Tracker</h1>
              <p className="text-[10px] font-medium text-gray-400">ระบบบริหารจัดการและสรุปการเงินส่วนบุคคล</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                setEditingTransaction(null);
                setIsModalOpen(true);
              }}
              className="flex items-center gap-1.5 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-xl text-xs font-semibold shadow-md shadow-red-200 transition-all active:scale-95"
            >
              <Plus className="w-4 h-4" />
              เพิ่มข้อมูล
            </button>
            <button
              onClick={() => exportToCSV(filteredTransactions)}
              className="hidden sm:flex items-center gap-1.5 px-3.5 py-2 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border border-emerald-200 rounded-xl text-xs font-semibold transition-all"
            >
              <FileSpreadsheet className="w-4 h-4 text-emerald-600" />
              Export CSV
            </button>
            <button
              onClick={() => exportToPDF(filteredTransactions)}
              className="hidden sm:flex items-center gap-1.5 px-3.5 py-2 bg-red-50 hover:bg-red-100 text-red-700 border border-red-200 rounded-xl text-xs font-semibold transition-all"
            >
              <FileText className="w-4 h-4 text-red-600" />
              Export PDF
            </button>
          </div>
        </div>
      </nav>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 space-y-6">
        
        {/* Header Title */}
        <div>
          <h2 className="text-2xl font-bold text-slate-900">สรุปการเงิน</h2>
          <p className="text-xs text-gray-400 mt-1">เพิ่ม แก้ไข และจัดการข้อมูลได้สะดวก รองรับมือถือและแท็บเล็ต</p>
        </div>

        {/* Summary Cards */}
        <SummaryCards transactions={filteredTransactions} />

        {/* Search & Filter Bar */}
        <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm space-y-3 sm:space-y-0 sm:flex sm:items-center sm:gap-3">
          <div className="flex-1 grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block text-[11px] font-semibold text-gray-500 mb-1">จากวันที่</label>
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500"
              />
            </div>
            <div>
              <label className="block text-[11px] font-semibold text-gray-500 mb-1">ถึงวันที่</label>
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500"
              />
            </div>
            <div>
              <label className="block text-[11px] font-semibold text-gray-500 mb-1">ประเภท</label>
              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500"
              >
                <option value="all">ทั้งหมด</option>
                <option value="income">รายรับ</option>
                <option value="expense">รายจ่าย</option>
              </select>
            </div>
          </div>

          <div className="flex items-end gap-2 pt-2 sm:pt-0">
            <button
              onClick={handleResetFilters}
              className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-600 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              ล้างค่า
            </button>
          </div>
        </div>

        {/* Data Table Container */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden text-slate-800">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50/50 border-b border-gray-100 text-[11px] font-bold text-gray-400 uppercase tracking-wider">
                  <th className="py-3.5 px-6">วันที่</th>
                  <th className="py-3.5 px-6">รายการ / หมวดหมู่</th>
                  <th className="py-3.5 px-6">ประเภท</th>
                  <th className="py-3.5 px-6 text-right">จำนวน (บาท)</th>
                  <th className="py-3.5 px-6 text-center">จัดการ</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 text-xs font-medium">
                {filteredTransactions.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="py-12 text-center text-gray-400">
                      ไม่พบข้อมูลรายการที่ค้นหา
                    </td>
                  </tr>
                ) : (
                  filteredTransactions.map((item) => (
                    <tr key={item.id} className="hover:bg-gray-50/80 transition-colors">
                      <td className="py-4 px-6 text-gray-500">
                        {new Date(item.date).toLocaleDateString('th-TH')}
                      </td>
                      <td className="py-4 px-6">
                        <div className="font-bold text-slate-900">{item.note || item.category}</div>
                        <div className="text-[10px] text-gray-400">{item.category}</div>
                      </td>
                      <td className="py-4 px-6">
                        <span
                          className={`inline-flex px-2.5 py-1 rounded-full text-[10px] font-bold ${
                            item.type === 'income'
                              ? 'bg-emerald-50 text-emerald-600 border border-emerald-100'
                              : 'bg-red-50 text-red-600 border border-red-100'
                          }`}
                        >
                          {item.type === 'income' ? 'รายรับ' : 'รายจ่าย'}
                        </span>
                      </td>
                      <td
                        className={`py-4 px-6 text-right font-bold text-sm ${
                          item.type === 'income' ? 'text-emerald-600' : 'text-red-600'
                        }`}
                      >
                        {item.type === 'income' ? '+' : '-'}
                        ฿{item.amount.toLocaleString()}
                      </td>
                      <td className="py-4 px-6 text-center">
                        <div className="flex items-center justify-center gap-1.5">
                          <button
                            onClick={() => handleEditClick(item)}
                            className="p-1.5 text-slate-600 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                            title="แก้ไข"
                          >
                            <Edit3 className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => handleDeleteTransaction(item.id)}
                            className="p-1.5 text-red-600 bg-red-50 hover:bg-red-100 rounded-lg transition-colors"
                            title="ลบ"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Bottom Summary Bar */}
          <div className="bg-slate-900 text-white p-4 px-6 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs font-semibold">
            <div>
              ยอดรวมสุทธิจากการค้นหา:{' '}
              <span className={`text-sm font-bold ${totalFilteredAmount >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                ฿{totalFilteredAmount.toLocaleString()}
              </span>
            </div>
            <div className="text-gray-400 text-[11px]">
              รวมทั้งหมด {filteredTransactions.length} รายการ
            </div>
          </div>
        </div>

      </div>

      {/* Transaction Modal */}
      <TransactionModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingTransaction(null);
        }}
        onSave={handleSaveTransaction}
        initialData={editingTransaction}
      />
    </main>
  );
}