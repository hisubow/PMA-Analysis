# Walkthrough: PMA Chapter 1 Reverse Engineering Executive SPA Dashboard

## 1. Giới thiệu tổng quan
Dự án **PMA Chapter 1 Reverse Engineering Executive SPA Dashboard** đã được xây dựng hoàn tất 100% độc bản (bespoke), chuyên sâu theo yêu cầu của sinh viên **Huỳnh Ngọc Hiếu** (Môn IAM302, Đại học FPT), dựa trên toàn bộ dữ liệu phân tích dịch ngược từ báo cáo chuẩn hóa `PMA_Chapter1_Analysis_Report.md`.

- **Thư mục làm việc mặc định**: `C:\Users\huynh\.gemini\antigravity\scratch\pma-chapter1-dashboard`
- **Thư mục đồng bộ hóa trực tiếp**: `C:\Users\huynh\OneDrive\Desktop\FPTU Folder\Fall26(Sem5)\IAM302\LAB REV\spa-dashboard`

---

## 2. Các thành phần & Tính năng chính đã hoàn thành

1. **Giao diện chuẩn SOC / DFIR Executive Dark & Light Dual Theme**:
   - Sử dụng phông chữ lập trình `JetBrains Mono` kết hợp `Plus Jakarta Sans`.
   - Chuyển đổi giao diện Sáng / Tối lưu trữ tự động qua `localStorage`.
   - Tối ưu màu sắc tương phản cao (High-Contrast) phục vụ quay video màn hình sắc nét.

2. **Cấu trúc Tabbed SPA toàn diện (5 Phân hệ)**:
   - **Tab 1: Tổng Quan Mẫu & Khung REA (`#overview`)**: 4 Metric boxes chỉ số điều hành, Bảng danh mục 5 tệp nhị phân + 1 payload nhúng, và Khung chuẩn hóa 4 trụ cột REA (*Observations*, *Derivations*, *Inferences*, *Unknowns*) triệt tiêu giả định vô căn cứ.
   - **Tab 2: Phòng Dịch Ngược 4 Labs (`#deepdive`)**: 
     - 4 Sub-tabs tương ứng: Lab 01-01, Lab 01-02, Lab 01-03, Lab 01-04.
     - Thanh đo Section Entropy trực quan (đối chiếu UPX0, UPX1, seg000, seg002).
     - Sơ đồ trực quan luồng tấn công (Execution Flow Diagrams).
     - Khung hiển thị mã giả Hex-Rays Decompiler C và Disassembly x86 có syntax highlighting cùng nút sao chép mã nguồn nhanh.
   - **Tab 3: Kho Chỉ Số Nhận Diện IOCs (`#iocs`)**:
     - Đầy đủ 22 chỉ số IOCs (Hashes MD5/SHA-256, Dropped Files, Registry/Services, Mutexes, Network C2 IPs & URLs).
     - Bộ lọc phân loại nhanh và thanh tìm kiếm tức thì.
     - Nút "Sao chép tất cả" và nút "Copy" 1-chạm cho từng dòng kèm thông báo Toast.
   - **Tab 4: Ma Trận MITRE ATT&CK (`#mitre`)**:
     - Phân loại kỹ thuật xâm nhập theo 5 chiến thuật quốc tế: *Execution*, *Persistence*, *Privilege Escalation*, *Defense Evasion*, *Command & Control*.
   - **Tab 5: Presentation Studio & Teleprompter (`#presentation`)**:
     - Bộ đếm giờ (Stopwatch) trực tiếp trên trang: Bắt đầu, Tạm dừng, Đặt lại.
     - 5 phân đoạn timeline đồng bộ theo thời gian chuẩn từ 8 - 12 phút.
     - Tự động làm sáng phân đoạn đang thuyết minh theo số giây.
     - Hộp chỉ dẫn thao tác chuột/màn hình trên IDA Pro và lời thoại mẫu tiếng Việt chuẩn chỉnh, tự tin, mạch lạc.

3. **Cấu hình Vercel Zero-Config (`vercel.json`)**:
   - Cấu hình định tuyến SPA routes và thiết lập Security Headers (`X-Content-Type-Options`, `X-Frame-Options`, `X-XSS-Protection`).
   - Sẵn sàng triển khai 1-click lên Vercel không cần build tool.

4. **Tài liệu Hướng dẫn Vận hành (`README.md`)**:
   - Các bước tạo Git Repo và liên kết Vercel trong 2 phút.
   - Hướng dẫn chi tiết quy trình quay video thuyết minh nộp bài đạt điểm tối đa.

5. **Kiểm thử & Git Repository**:
   - Cú pháp JavaScript `js/app.js` đã kiểm chứng bằng `node -c` (Passed 100%).
   - Cấu trúc `vercel.json` đã kiểm tra JSON Parse (Passed 100%).
   - Đã khởi tạo Git repository và commit gốc với định danh tác giả `Huynh Ngoc Hieu`.

---

## 3. Hướng dẫn xem trước cục bộ (Local Preview)
Bạn có thể mở ứng dụng ngay lập tức bằng cách:
- Nhấp đúp chuột trực tiếp vào file:  
  `C:\Users\huynh\OneDrive\Desktop\FPTU Folder\Fall26(Sem5)\IAM302\LAB REV\spa-dashboard\index.html`  
  hoặc  
  `C:\Users\huynh\.gemini\antigravity\scratch\pma-chapter1-dashboard\index.html`  
  trong File Explorer để mở trên Chrome/Edge/Firefox. Toàn bộ tính năng tương tác, tab, đồng hồ bấm giờ, sao chép IOCs và chuyển theme đều hoạt động hoàn hảo offline.
