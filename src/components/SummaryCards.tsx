'use client';

import { Transaction } from '@/types/transaction';
import { Wallet, ArrowDownRight, ArrowUpRight } from 'lucide-react';

interface Props {
  transactions: Transaction[];
}

export default function SummaryCards({ transactions }: Props) {
  const income = transactions
    .filter((t) => t.type === 'income')
    .reduce((acc, t) => acc + t.amount, 0);

  const expense = transactions
    .filter((t) => t.type === 'expense')
    .reduce((acc, t) => acc + t.amount, 0);

  const balance = income - expense;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {/* ยอดคงเหลือ */}
      <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex items-center justify-between">
        <div>
          <p className="text-xs font-medium text-gray-500 mb-1">ยอดคงเหลือสุทธิ</p>
          <h3 className={`text-2xl font-bold ${balance >= 0 ? 'text-gray-900' : 'text-red-600'}`}>
            ฿{balance.toLocaleString()}
          </h3>
        </div>
        <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
          <Wallet className="w-5 h-5" />
        </div>
      </div>

      {/* รายรับรวม */}
      <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex items-center justify-between">
        <div>
          <p className="text-xs font-medium text-gray-500 mb-1">รายรับรวม</p>
          <h3 className="text-2xl font-bold text-emerald-600">
            +฿{income.toLocaleString()}
          </h3>
        </div>
        <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
          <ArrowUpRight className="w-5 h-5" />
        </div>
      </div>

      {/* รายจ่ายรวม */}
      <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex items-center justify-between">
        <div>
          <p className="text-xs font-medium text-gray-500 mb-1">รายจ่ายรวม</p>
          <h3 className="text-2xl font-bold text-red-600">
            -฿{expense.toLocaleString()}
          </h3>
        </div>
        <div className="w-10 h-10 rounded-xl bg-red-50 text-red-600 flex items-center justify-center">
          <ArrowDownRight className="w-5 h-5" />
        </div>
      </div>
    </div>
  );
}