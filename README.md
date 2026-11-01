# PMA Chapter 1 - Interactive Reverse Engineering Executive SPA Dashboard
**Môn học:** IAM302 - Kỹ thuật Phân tích & Dịch ngược Mã độc (*FPT University*)  
**Sinh viên thực hiện:** Huỳnh Ngọc Hiếu  
**Phương pháp chuẩn hóa:** Tiêu chuẩn REA (*morluto/rea*) kết hợp IDA Pro Hex-Rays qua giao thức MCP  

---

## 1. Điểm nổi bật của Dashboard SPA
- **Kiến trúc Tabbed SPA hiện đại:** Phân chia thành 5 Tabs điều hành rõ ràng:
  - `tab-overview`: Thẻ chỉ số điều hành, bảng 5 file nhị phân và Khung 4 trụ cột REA (*Observations*, *Derivations*, *Inferences*, *Unknowns*).
  - `tab-deepdive`: Phòng phân tích chi tiết 4 bài Lab (Lab 01-01, 01-02, 01-03, 01-04) tích hợp thanh đo Section Entropy trực quan, sơ đồ luồng tấn công SVG và khung hiển thị mã giả IDA Hex-Rays Decompiler có syntax highlighting.
  - `tab-iocs`: Kho 22 chỉ số nhận diện xâm nhập (Hashes MD5/SHA-256, Dropped Paths, C2 Sockets, URLs, Services, Mutexes) hỗ trợ tìm kiếm theo thời gian thực và 1-click Copy to Clipboard.
  - `tab-mitre`: Ma trận MITRE ATT&CK phân loại kỹ thuật theo 5 chiến thuật cốt lõi (Execution, Persistence, Privilege Escalation, Defense Evasion, Command & Control).
  - `tab-presentation`: **Studio Thuyết Minh & Quay Video** tích hợp đồng hồ bấm giờ (Stopwatch), chia 5 phân đoạn timeline (00:00 đến 11:30), chỉ dẫn thao tác chuột/màn hình trên IDA Pro và lời thoại mẫu tiếng Việt chuẩn chỉnh, tự tin, học thuật.
- **Dual High-Contrast Theme:** Chuyển đổi linh hoạt giữa giao diện Tối (*Cyber Dark SOC Theme*) và Sáng (*Academic Light Theme*), lưu trạng thái qua `localStorage`.
- **Zero-Dependency & Zero-Build:** Hoạt động trơn tru ngay cả khi mở trực tiếp file `index.html` trong trình duyệt hoặc triển khai tức thì lên Vercel với chuẩn HTTPS.

---

## 2. Hướng dẫn Deploy lên Vercel trong 2 phút

### Cách 1: Deploy qua GitHub (Khuyên dùng - Chuẩn CI/CD)
1. Tạo một repository mới trên GitHub (ví dụ đặt tên: `pma-chapter1-analysis`).
2. Mở PowerShell trong thư mục này và chạy các lệnh:
   ```powershell
   git add .
   git commit -m "feat: complete PMA Chapter 1 Reverse Engineering SPA Dashboard"
   git branch -M main
   git remote add origin https://github.com/<tai-khoan-github-cua-ban>/pma-chapter1-analysis.git
   git push -u origin main
   ```
3. Truy cập [vercel.com](https://vercel.com), đăng nhập tài khoản.
4. Chọn **Add New...** → **Project** → Chọn kho lưu trữ `pma-chapter1-analysis` vừa tạo → Nhấp **Deploy**.
5. Nhận ngay liên kết công khai chuẩn HTTPS (ví dụ: `https://pma-chapter1-analysis.vercel.app`) để nộp cho Giảng viên.

### Cách 2: Deploy trực tiếp bằng Vercel CLI
Nếu máy bạn đã cài Vercel CLI (`npm i -g vercel`), chỉ cần gõ trong thư mục:
```powershell
vercel --prod
```

---

## 3. Hướng dẫn Quay Video Thuyết Minh Nộp Bài (Thời lượng: 8 - 12 Phút)
1. **Chuẩn bị môi trường**:
   - Mở sẵn IDA Pro với 4 bài lab: `Lab01-01.exe` & `Lab01-01.dll`, `Lab01-02.exe` (unpacked), `Lab01-03.exe`, `Lab01-04.exe`.
   - Mở Dashboard SPA trên trình duyệt (hoặc trên Vercel sau khi deploy), chuyển sang Tab **🎬 Kịch Bản Quay Video**.
2. **Bắt đầu quay video** (sử dụng OBS Studio, Bandicam hoặc phím tắt `Win + Alt + R` của Windows):
   - Nhấp nút **"Bắt Đầu Quay"** trên đồng hồ bấm giờ của Dashboard để theo dõi thời gian thực.
   - Làm theo các chỉ dẫn trong hộp **"Thao tác trên màn hình (Screen Actions)"** và đọc lời thoại gợi ý trong từng phân đoạn:
     - **00:00 - 02:30**: Giới thiệu & Lab 01-01 (Kỹ thuật DLL Hijacking & Proxying).
     - **02:30 - 05:00**: Lab 01-02 (Kỹ thuật Đóng gói UPX & Mã độc DDoS hẹn giờ năm 2100).
     - **05:00 - 07:30**: Lab 01-03 (Phân tích Packer FSG & Ranh giới phân tích tĩnh).
     - **07:30 - 10:30**: Lab 01-04 (Process Injection vào `winlogon.exe`, Tắt WFP & Trojan Dropper Resource #101).
     - **10:30 - 11:30**: Tổng kết & Demo nhanh các tính năng tương tác của Dashboard SPA.
3. **Kết thúc video**: Dừng quay, kiểm tra âm thanh/hình ảnh, sau đó tải video lên YouTube (đặt chế độ Không công khai - *Unlisted*) hoặc Google Drive và dán liên kết kèm link Vercel vào bài nộp LMS theo hướng dẫn của Giảng viên.
