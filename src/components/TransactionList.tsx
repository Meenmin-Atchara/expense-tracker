'use client';

import { Transaction } from '@/types/transaction';
import { Trash2, ShoppingBag, Utensils, Bus, Receipt, Tag, DollarSign } from 'lucide-react';

interface Props {
  transactions: Transaction[];
  onDeleteTransaction: (id: string) => void;
}

export default function TransactionList({ transactions, onDeleteTransaction }: Props) {
  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'อาหาร':
        return <Utensils className="w-4 h-4 text-orange-500" />;
      case 'เดินทาง':
        return <Bus className="w-4 h-4 text-blue-500" />;
      case 'ช้อปปิ้ง':
        return <ShoppingBag className="w-4 h-4 text-purple-500" />;
      case 'บิล/ค่าน้ำไฟ':
        return <Receipt className="w-4 h-4 text-yellow-500" />;
      case 'ขายของ/รายได้':
        return <DollarSign className="w-4 h-4 text-emerald-500" />;
      default:
        return <Tag className="w-4 h-4 text-gray-500" />;
    }
  };

  if (transactions.length === 0) {
    return (
      <div className="bg-white p-8 rounded-2xl border border-gray-100 text-center text-gray-400 text-sm">
        ยังไม่มีรายการบันทึก เริ่มเพิ่มรายการด้านบนได้เลย!
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
      <div className="p-4 border-b border-gray-100 font-semibold text-gray-700 text-sm">
        ประวัติรายการ
      </div>
      <div className="divide-y divide-gray-50">
        {transactions.map((item) => (
          <div key={item.id} className="p-4 flex items-center justify-between hover:bg-gray-50/50 transition-colors">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-gray-100 flex items-center justify-center">
                {getCategoryIcon(item.category)}
              </div>
              <div>
                <p className="text-sm font-medium text-gray-800">
                  {item.note || item.category}
                </p>
                <p className="text-xs text-gray-400">
                  {item.category} • {new Date(item.date).toLocaleDateString('th-TH')}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <span className={`font-semibold text-sm ${item.type === 'income' ? 'text-emerald-600' : 'text-red-500'}`}>
                {item.type === 'income' ? '+' : '-'}฿{item.amount.toLocaleString()}
              </span>
              <button
                onClick={() => onDeleteTransaction(item.id)}
                className="text-gray-300 hover:text-red-500 transition-colors p-1"
                title="ลบรายการ"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}