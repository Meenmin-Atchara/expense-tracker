# 📊 Expense Tracker System (ระบบจัดการบัญชีรายรับ-รายจ่าย)

เว็บแอปพลิเคชันสำหรับบันทึกและวิเคราะห์รายรับ-รายจ่ายส่วนบุคคล ช่วยให้การบริหารจัดการทางการเงินเป็นเรื่องง่าย ชัดเจน และรวดเร็ว พร้อมระบบสรุปผลแบบ Real-time และการส่งออกรายงาน

---

## ✨ ฟีเจอร์สำคัญ (Key Features)

* **⚡ Quick Add Bar:** แถบบันทึกด่วน เลือกประเภท (รายรับ/รายจ่าย) ระบุจำนวนเงิน หมวดหมู่ และหมายเหตุได้ในไม่กี่วินาที
* **💳 Real-time Balance Cards:** สรุปยอดเงินรวมประจำเดือนแบบเรียลไทม์
  * รายรับรวม (Total Income)
  * รายจ่ายรวม (Total Expenses)
  * ยอดคงเหลือสุทธิ (Net Income)
* **📈 Analytics Dashboard:** กราฟวิเคราะห์พฤติกรรมการใช้จ่าย
  * **Bar Chart:** เปรียบเทียบรายรับ vs รายจ่าย (เลือกดูแบบ รายวัน / รายเดือน / รายปี)
  * **Pie Chart:** แสดงสัดส่วนเปอร์เซ็นต์รายจ่ายตามหมวดหมู่
* **📄 Data Export:**
  * **CSV Export:** ส่งออกข้อมูลรายการทั้งหมด รองรับภาษาไทย (UTF-8) สำหรับนำไปเปิดใน Excel หรือ Google Sheets
  * **PDF Export:** พิมพ์รายงานสรุปยอดและกราฟ หรือทำใบเสร็จรับเงินสำเร็จรูป

---

## 🛠️ เทคโนโลยีที่ใช้ (Tech Stack)

* **Frontend:** React / Vite, Tailwind CSS
* **Data Visualization:** Chart.js / React-Chartjs-2
* **Export Utilities:** PapaParse (CSV), jsPDF & html2canvas (PDF)
* **Version Control:** Git & GitHub

---

## 🚀 การติดตั้งและเริ่มใช้งาน (Getting Started)

### Installation Steps

1. **Install Dependencies**
   ```bash
   npm install
   
2. **Run Development Server**
   ```bash
   npm run dev

เปิดเบราว์เซอร์ไปที่ http://localhost:5173 เพื่อเริ่มใช้งาน
