import Papa from 'papaparse';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { Transaction } from '@/types/transaction';

// Export เป็นไฟล์ CSV
export const exportToCSV = (transactions: Transaction[]) => {
  const data = transactions.map((t) => ({
    วันที่: new Date(t.date).toLocaleDateString('th-TH'),
    ประเภท: t.type === 'income' ? 'รายรับ' : 'รายจ่าย',
    หมวดหมู่: t.category,
    จำนวนเงิน: t.amount,
    หมายเหตุ: t.note || '-',
  }));

  const csv = Papa.unparse(data);
  const blob = new Blob(['\ufeff' + csv], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', `expense_report_${new Date().toISOString().slice(0, 10)}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

// Export เป็นไฟล์ PDF (Print Friendly)
export const exportToPDF = (transactions: Transaction[]) => {
  const doc = new jsPDF();
  doc.setFontSize(18);
  doc.text('Expense Tracker Report', 14, 22);
  doc.setFontSize(10);
  doc.text(`Generated on: ${new Date().toLocaleDateString('th-TH')}`, 14, 30);

  const tableData = transactions.map((t) => [
    new Date(t.date).toLocaleDateString('th-TH'),
    t.type === 'income' ? 'Income' : 'Expense',
    t.category,
    `฿${t.amount.toLocaleString()}`,
    t.note || '-',
  ]);

  autoTable(doc, {
    head: [['Date', 'Type', 'Category', 'Amount', 'Note']],
    body: tableData,
    startY: 36,
    theme: 'grid',
    headStyles: { fillColor: [30, 41, 59] },
  });

  doc.save(`expense_report_${new Date().toISOString().slice(0, 10)}.pdf`);
};