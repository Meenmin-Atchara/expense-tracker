'use client';

import { useState } from 'react';
import { TransactionType, Category, Transaction } from '@/types/transaction';
import { PlusCircle } from 'lucide-react';

interface Props {
  onAddTransaction: (transaction: Transaction) => void;
}

export default function TransactionForm({ onAddTransaction }: Props) {
  const [type, setType] = useState<TransactionType>('expense');
  const [amount, setAmount] = useState<string>('');
  const [category, setCategory] = useState<Category>('อาหาร');
  const [note, setNote] = useState<string>('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!amount || Number(amount) <= 0) return;

    const newTransaction: Transaction = {
      id: crypto.randomUUID(),
      type,
      amount: Number(amount),
      category,
      note,
      date: new Date().toISOString(),
    };

    onAddTransaction(newTransaction);
    setAmount('');
    setNote('');
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 space-y-4">
      <div className="flex gap-2 p-1 bg-gray-100 rounded-xl">
        <button
          type="button"
          onClick={() => setType('expense')}
          className={`flex-1 py-2 text-sm font-semibold rounded-lg transition-all ${
            type === 'expense' ? 'bg-red-500 text-white shadow-sm' : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          รายจ่าย
        </button>
        <button
          type="button"
          onClick={() => setType('income')}
          className={`flex-1 py-2 text-sm font-semibold rounded-lg transition-all ${
            type === 'income' ? 'bg-emerald-500 text-white shadow-sm' : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          รายรับ
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        <input
          type="number"
          placeholder="จำนวนเงิน (บาท)"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-sm"
          required
        />
        
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value as Category)}
          className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-sm bg-white"
        >
          <option value="อาหาร">อาหาร</option>
          <option value="เดินทาง">เดินทาง</option>
          <option value="ช้อปปิ้ง">ช้อปปิ้ง</option>
          <option value="บิล/ค่าน้ำไฟ">บิล/ค่าน้ำไฟ</option>
          <option value="ขายของ/รายได้">ขายของ/รายได้</option>
          <option value="อื่นๆ">อื่นๆ</option>
        </select>

        <input
          type="text"
          placeholder="หมายเหตุ (ไม่ระบุก็ได้)"
          value={note}
          onChange={(e) => setNote(e.target.value)}
          className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-sm"
        />
      </div>

      <button
        type="submit"
        className="w-full py-2.5 bg-gray-900 hover:bg-gray-800 text-white font-medium rounded-xl transition-colors flex items-center justify-center gap-2 text-sm shadow-sm"
      >
        <PlusCircle className="w-4 h-4" />
        บันทึกรายการ
      </button>
    </form>
  );
}