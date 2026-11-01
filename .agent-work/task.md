# Nhiệm vụ: Xây dựng SPA Dashboard Phân Tích Dịch Ngược Malware PMA Chapter 1 & Kịch Bản Quay Video Thuyết Minh

## Trạng thái các mục tiêu:
- [/] **Task 1: Nghiên cứu chi tiết tài liệu báo cáo `PMA_Chapter1_Analysis_Report.md`** <!-- id: 1 -->
  - Đã phân tích đầy đủ 4 bài lab (Lab 01-01, Lab 01-02, Lab 01-03, Lab 01-04).
  - Trích xuất toàn bộ mã giả Hex-Rays, mã hợp ngữ, bảng IOCs, quy chuẩn REA, và kịch bản video.
- [ ] **Task 2: Thiết kế Design System & CSS cho SPA (`css/style.css`)** <!-- id: 2 -->
  - Thiết kế Cyber Security / DFIR theme với Dark/Light mode toggle.
  - Tối ưu bảng màu High-Contrast cho trình chiếu video (Cyber Blue, Emerald Green, Amber Warning, Crimson Red).
  - Hỗ trợ responsive, in ấn Print/PDF stylesheet.
- [ ] **Task 3: Xây dựng khung ứng dụng SPA (`index.html`)** <!-- id: 3 -->
  - Header với thông tin môn học IAM302, sinh viên Huỳnh Ngọc Hiếu, Sandbox indicator, nút Copy IOCs, nút In.
  - Tab 1: Tổng quan điều hành & Khung REA (Executive Overview & REA Framework).
  - Tab 2: Phòng thí nghiệm dịch ngược chuyên sâu (Lab 01-01, 01-02, 01-03, 01-04) với Interactive Code Viewer (Hex-Rays C / ASM), Sơ đồ tấn công (Interactive Flowchart), PE Section Inspector.
  - Tab 3: Ma trận MITRE ATT&CK & Kho chỉ số IOCs (Search, Filter, 1-Click Copy).
  - Tab 4: Đối chiếu kỹ thuật & So sánh cơ chế phòng thủ / lẩn tránh.
  - Tab 5: Presentation Studio & Kịch bản quay Video (Teleprompter kèm đồng hồ bấm giờ tương tác).
- [ ] **Task 4: Xây dựng logic tương tác (`js/app.js`)** <!-- id: 4 -->
  - Điều hướng tab mượt mà, lưu tab trạng thái trên URL hash.
  - Bộ đếm giờ thuyết minh (Interactive Stopwatch/Timer) hỗ trợ người dùng canh chuẩn 8-12 phút khi quay video.
  - Chức năng Copy từng dòng IOC hoặc toàn bộ danh sách, hiển thị Toast feedback.
  - Bộ lọc tìm kiếm nhanh trong bảng IOCs và MITRE matrix.
- [ ] **Task 5: Tạo cấu hình Vercel (`vercel.json`) & Tài liệu `README.md`** <!-- id: 5 -->
  - Cấu hình Vercel không cần build step, tương thích 100%.
  - Soạn thảo `README.md` hướng dẫn từng bước push GitHub và deploy Vercel trong 2 phút.
- [ ] **Task 6: Kiểm thử, đồng bộ thư mục & Khởi tạo Git** <!-- id: 6 -->
  - Khởi tạo local Git repo, commit phiên bản hoàn thiện.
  - Đồng bộ sản phẩm sang thư mục của người dùng `LAB REV\spa-dashboard`.
  - Báo cáo kết quả và hướng dẫn nộp bài.
