export type TransactionType = 'income' | 'expense';

export type Category = 'อาหาร' | 'เดินทาง' | 'ช้อปปิ้ง' | 'บิล/ค่าน้ำไฟ' | 'ขายของ/รายได้' | 'อื่นๆ';

export interface Transaction {
  id: string;
  type: TransactionType;
  amount: number;
  category: Category;
  note: string;
  date: string; // ISO String หรือ Formatted Date
}