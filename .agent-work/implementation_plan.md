# Implementation Plan: PMA Chapter 1 Reverse Engineering Executive SPA Dashboard

Xây dựng ứng dụng Web Single Page Application (SPA) chuyên nghiệp, độc bản để báo cáo kết quả dịch ngược 4 bài Lab trong cuốn *Practical Malware Analysis - Chapter 1* (Môn IAM302 - Kỹ thuật Phân tích & Dịch ngược Mã độc, Đại học FPT), chuẩn hóa theo phương pháp luận REA (*Reverse Engineer Anything*) và tích hợp kịch bản thuyết minh video chuẩn mực.

## 1. Mục tiêu & Yêu cầu chất lượng
- **Chuyên sâu & Chuẩn xác**: Phản ánh đầy đủ phát hiện từ IDA Pro / Hex-Rays cho 5 tệp nhị phân (`Lab01-01.exe`, `Lab01-01.dll`, `Lab01-02.exe` [Packed & Unpacked], `Lab01-03.exe` [FSG], `Lab01-04.exe` và Payload nhúng `Resource #101`).
- **Giao diện đẳng cấp**: Thiết kế theo tiêu chuẩn SOC Threat Intelligence / DFIR Executive Dashboard với Cyber Dark Theme (mặc định) và Light Mode linh hoạt.
- **Tương tác tối đa**: 
  - Code Inspector với cú pháp C Hex-Rays và Assembly x86.
  - Sơ đồ trực quan luồng tấn công (Mermaid / SVG flowchart).
  - Bảng chỉ số IOCs có chức năng lọc và 1-click copy vào Clipboard.
  - Ma trận kỹ thuật MITRE ATT&CK.
  - **Kịch bản Thuyết minh Video (Teleprompter)**: Tích hợp đồng hồ bấm giờ (Timer), chia mốc thời gian rõ ràng (00:00 - 11:30), kèm lời thoại thuyết minh tiếng Việt chuẩn chỉnh và chỉ dẫn thao tác chuột/màn hình để sinh viên quay video nộp bài mượt mà nhất.
- **Deploy Vercel Zero-Config**: Tệp tĩnh chuẩn HTML5/CSS3/Vanilla JS, không cần cài đặt node_modules hay build tool phức tạp, tải siêu tốc (< 1s), chuẩn HTTPS trên Vercel.

## 2. Kiến trúc & Công nghệ
- **Vị trí dự án**: `C:\Users\huynh\.gemini\antigravity\scratch\pma-chapter1-dashboard`
- **Bản sao đồng bộ**: `C:\Users\huynh\OneDrive\Desktop\FPTU Folder\Fall26(Sem5)\IAM302\LAB REV\spa-dashboard`
- **Tech Stack**:
  - Semantic HTML5 + Vanilla CSS3 (Custom Design System, Glassmorphism, CSS Variables).
  - JetBrains Mono (cho mã giả, offset, hash) + Plus Jakarta Sans (cho tiêu đề và văn bản quản trị).
  - Pure Modern JavaScript ES6+ (Zero-dependency, hoạt động ngay cả khi mở file trực tiếp `file:///`).
  - Cấu hình Vercel: `vercel.json` định tuyến SPA chuẩn mực.

## 3. Cấu trúc Tab điều hướng
1. `tab-overview`: Thẻ chỉ số điều hành (Executive Metrics), Ma trận 4 bài Lab, Khung phân định REA (Observations, Derivations, Inferences, Unknowns).
2. `tab-deepdive`: Bộ điều khiển phân tích chi tiết từng Lab (Tab con: Lab 01-01 -> 01-02 -> 01-03 -> 01-04). Từng lab có: Header thông số, Cấu trúc PE & Entropy, Code Viewer (Pseudocode C vs ASM), Sơ đồ tấn công SVG, Đánh giá rủi ro.
3. `tab-iocs`: Bảng chỉ số nhận diện (Hashes, Dropped Files, Registry/Services, Mutexes, Network IPs/URLs) kèm ô tìm kiếm và 1-click copy to clipboard.
4. `tab-mitre`: Ma trận MITRE ATT&CK phân loại kỹ thuật theo từng bài lab (Persistence, Privilege Escalation, Defense Evasion, Execution, C2).
5. `tab-presentation`: Trình diễn thuyết minh (Presentation Studio) dành riêng cho việc quay video nộp bài, tích hợp đồng hồ bấm giờ trực tiếp, kịch bản chi tiết từng phút, câu thoại mẫu và chỉ dẫn thao tác IDA Pro.

## 4. Kế hoạch kiểm thử & nghiệm thu
- Kiểm tra hiển thị responsive trên các độ phân giải màn hình.
- Kiểm tra tính năng chuyển Tab, chuyển theme Dark/Light, bộ đếm giờ, sao chép IOCs vào Clipboard.
- Chạy thử máy chủ HTTP nội bộ để kiểm tra tải tài nguyên.
- Kiểm tra tính hợp lệ của `vercel.json`.
