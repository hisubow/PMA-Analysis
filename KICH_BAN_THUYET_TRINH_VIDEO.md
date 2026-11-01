# BÀI NÓI & KỊCH BẢN THUYẾT MINH VIDEO BÁO CÁO DỊCH NGƯỢC (IAM302)
**Học phần:** IAM302 - Kỹ thuật Phân tích & Dịch ngược Mã độc  
**Đơn vị:** Đại học FPT  
**Sinh viên thực hiện:** Huỳnh Ngọc Hiếu  
**Đề tài:** Phân tích Dịch ngược Chuyên sâu Practical Malware Analysis (Chapter 1) trên nền tảng Executive SPA Dashboard  
**Thời lượng dự kiến:** 7 - 9 phút (Vừa vặn, tự tin, mạch lạc, đầy đủ 100% các mục)  

---

## CÁC BƯỚC CHUẨN BỊ TRƯỚC KHI BẤM QUAY MÀN HÌNH
1. Mở trình duyệt hiển thị Dashboard SPA (đã deploy trên Vercel hoặc mở file `index.html`).
2. Mở sẵn IDA Pro ở chế độ nền (để khi nhắc tới mã giả / disassembly, bạn có thể Alt+Tab lướt qua hoặc trực tiếp chỉ ngay trên giao diện SPA Dashboard vì SPA đã tích hợp toàn bộ mã giả Hex-Rays cực kỳ đẹp mắt).
3. Bật phần mềm quay màn hình (OBS Studio, Bandicam hoặc bấm tổ hợp phím `Win + Alt + R`).
4. Hít một hơi thật sâu, giữ giọng nói to rõ, tự tin, dõng dạc theo kịch bản dưới đây.

---

## NỘI DUNG BÀI NÓI THUYẾT MINH CHI TIẾT

### PHẦN 1: MỞ ĐẦU - GIỚI THIỆU BẢN THÂN, ĐỀ TÀI, GIAO THỨC MCP & CHUẨN REA (Khoảng 1 phút)

> *"Kính chào Thầy và các bạn đang theo dõi video báo cáo!*  
> *Em tên là **Huỳnh Ngọc Hiếu**, sinh viên lớp IAM302 - Kỹ thuật Phân tích và Dịch ngược Mã độc tại Đại học FPT.*  
>  
> *Hôm nay, em xin phép được trình bày bài báo cáo phân tích dịch ngược chuyên sâu 4 bài lab trong Chương 1 cuốn giáo trình kinh điển **Practical Malware Analysis**.*  
>  
> *Điểm đặc biệt trong đợt nghiên cứu này là em đã ứng dụng công nghệ phân tích dịch ngược hiện đại: sử dụng công cụ **IDA Pro kết hợp Decompiler Hex-Rays thông qua giao thức MCP (Model Context Protocol)**. Đồng thời, toàn bộ dữ liệu phân tích đều được chuẩn hóa nghiêm ngặt theo **phương pháp luận REA (Reverse Engineer Anything)** nhằm triệt tiêu hoàn toàn các giả định vô căn cứ, đảm bảo mọi kết luận kỹ thuật đều có bằng chứng nhị phân xác thực.*  
>  
> *Toàn bộ thành quả phân tích đã được em đóng gói thành một ứng dụng **Single Page Application (SPA) - Executive Reverse Engineering Dashboard** đang hiển thị trên màn hình, được triển khai trực tiếp trên nền tảng đám mây Vercel. Sau đây, em xin phép đi chi tiết vào từng phân hệ của trang web."*

---

### PHẦN 2: TRANG 1 - TỔNG QUAN HỆ THỐNG MẪU & KHUNG REA (Khoảng 1 phút 15 giây)
*(Thao tác: Giữ màn hình ở Tab "Tổng Quan & Khung REA", rê chuột qua 4 Metric Cards và Bảng tổng hợp)*

> *"Đầu tiên, tại tab **Tổng Quan & Khung REA**:*  
> *Hệ thống mẫu phân tích trong Chapter 1 gồm 4 bài thực hành với tổng cộng **5 tệp nhị phân PE chính và 1 payload nhúng**, bao gồm:*  
> - *`Lab01-01.exe` và `Lab01-01.dll`: Đại diện cho kỹ thuật DLL Hijacking và C2 Backdoor.*  
> - *`Lab01-02.exe`: Mẫu mã độc DDoS Botnet bị đóng gói bởi UPX 3.04 với tỷ lệ nén 18.75%.*  
> - *`Lab01-03.exe`: Mẫu minh họa giới hạn của phân tích tĩnh với packer phức tạp FSG 1.0.*  
> - *Và `Lab01-04.exe` kèm tệp nhúng `Resource #101`: Mẫu Trojan Dropper kết hợp leo thang đặc quyền và can thiệp tiến trình hệ thống.*  
>  
> *(Cuộn chuột xuống phần Khung REA)*  
> *Để đảm bảo tính khoa học, báo cáo áp dụng chuẩn **morluto/rea** chia thành 4 cấp độ bằng chứng rõ ràng:*  
> 1. *Cột màu xanh lá - **Observations**: Là các thông số vật lý bất biến như mã băm MD5, SHA-256, độ hỗn loạn entropy các section và chuỗi ký tự hiển thị.*  
> 2. *Cột màu xanh dương - **Derivations**: Là cấu trúc logic được chứng minh qua luồng thực thi, ví dụ như OEP hay cơ chế Export Forwarding.*  
> 3. *Cột màu vàng - **Inferences**: Là ý đồ tấn công được ánh xạ chuẩn xác vào ma trận MITRE ATT&CK.*  
> 4. *Và cột màu đỏ - **Unknowns**: Là những biến số mà phân tích tĩnh không thể khẳng định chắc chắn nếu thiếu môi trường mạng thật, ví dụ như phản hồi của máy chủ C2.*  
> *Nhờ khung REA này, bài báo cáo đạt độ chính xác và tin cậy cao nhất."*

---

### PHẦN 3: TRANG 2 - PHÒNG DỊCH NGƯỢC 4 LABS (Khoảng 3 phút 30 giây)
*(Thao tác: Nhấp chuyển sang Tab "Phòng Dịch Ngược 4 Labs", lần lượt bấm qua 4 Sub-tabs)*

#### 1. Lab 01-01: PE Infector & C2 Backdoor
*(Thao tác: Nhấp Sub-tab "Lab 01-01", chỉ vào thanh Entropy và khung mã giả Hex-Rays)*
> *"Chuyển sang tab **Phòng Dịch Ngược 4 Labs**, bắt đầu với **Lab 01-01**:*  
> *Nhìn vào thanh đo Section Entropy, các phân đoạn `.text`, `.rdata`, `.data` đều có entropy dưới 4.5, chứng tỏ file hoàn toàn không bị packed.*  
>  
> *Khi dịch ngược hàm `main` tại địa chỉ `0x00401440`, ta phát hiện một điều rất thú vị: mã độc có cơ chế khóa an toàn, yêu cầu tham số dòng lệnh `WARNING_THIS_WILL_DESTROY_YOUR_MACHINE`. Nếu không có cờ này, chương trình sẽ thoát ngay lập tức để phòng ngừa vô tình kích hoạt và né tránh các sandbox quét tự động.*  
>  
> *Khi chạy đúng tham số, nó thực hiện kỹ thuật **DLL Proxying**: ánh xạ `Kernel32.dll` thật của Windows vào bộ nhớ, cấu hình ủy nhiệm hàm sang `Lab01-01.dll`, rồi copy vào `System32` với tên là `kerne132.dll`. Đây là kỹ thuật ngụy trang **Typosquatting**, thay thế chữ `l` thường thành chữ số `1`.*  
>  
> *Tiếp theo, hàm `sub_4010A0` duyệt đệ quy toàn bộ ổ `C:\`, tìm các file `.exe` và sửa chuỗi `kernel32.dll` trong bảng Import thành `kerne132.dll`. Do đó, bất kỳ phần mềm nào khởi chạy sau đó cũng sẽ vô tình nạp DLL độc hại.*  
>  
> *Mở tiếp file `Lab01-01.dll`, tại `DllMain`, mã độc tạo Mutex `SADFHUHF` để chống chạy trùng, kết nối socket tới C2 IP `127.26.152.13:80`, gửi beacon `hello` và lắng nghe lệnh `exec` để spawn command shell ẩn hoặc `sleep` để trì hoãn."*

#### 2. Lab 01-02: UPX Packer & DDoS Time-bomb
*(Thao tác: Nhấp Sub-tab "Lab 01-02", chỉ vào Section UPX0 và hàm `sub_401040`)*
> *"Tiếp theo là **Lab 01-02**:*  
> *Kích thước file ban đầu rất nhỏ, chỉ hơn 3KB. Nhìn vào thanh đo Entropy, section `UPX0` có kích thước ảo 16KB nhưng dung lượng thô bằng 0, cùng chuỗi nhận diện `UPX!`. Sau khi em thực hiện giải nén bằng lệnh `upx -d`, file phình lên 16KB và khôi phục đầy đủ bảng IAT.*  
>  
> *Phân tích hàm `sub_401040`, mã độc kiểm tra Mutex `HGL345`, sau đó gọi `CreateServiceA` để tự tạo một Windows Service tên là `MalService` với cờ `SERVICE_AUTO_START` nhằm duy trì sự tồn tại bền bỉ.*  
>  
> *Điểm đặc biệt nguy hiểm là cơ chế **Time-bomb (Bom hẹn giờ)**: hàm `SetWaitableTimer` đặt mốc thời gian kích hoạt đến tận **năm 2100** và tạm dừng bằng `WaitForSingleObject`. Kỹ thuật này giúp mã độc ngủ đông để né tránh hoàn toàn các sandbox phân tích động vốn chỉ chạy trong vài phút.*  
>  
> *Khi đến thời điểm kích hoạt, nó tạo đồng thời **20 luồng độc lập**, chạy vòng lặp vô tận dội HTTP GET requests tới máy chủ `malwareanalysisbook.com` với User-Agent giả mạo `Internet Explorer 8.0` để làm tê liệt mục tiêu."*

#### 3. Lab 01-03: FSG Packer & Ranh Giới Phân Tích Tĩnh
*(Thao tác: Nhấp Sub-tab "Lab 01-03", chỉ vào 2 API duy nhất và Stub giải nén)*
> *"Đến với **Lab 01-03**:*  
> *Đây là bài lab minh họa cho ranh giới và hạn chế của phân tích tĩnh đơn thuần. File bị đóng gói bởi packer tùy biến **FSG 1.0**.*  
>  
> *Dấu hiệu nhận diện gồm có: Header bị làm sai lệch về ngày `01/01/1970` (Unix Epoch 0). Toàn bộ bảng Import bị rút gọn triệt để chỉ còn đúng **2 hàm**: `LoadLibraryA` và `GetProcAddress`. Các section bị đổi tên thành `seg000`, `seg001`, `seg002`.*  
>  
> *Đoạn mã tại điểm bắt đầu `0x00405000` là một unpacking stub sử dụng thuật toán nén aPLib. Stub này giải nén dữ liệu ngược vào bộ nhớ `seg000`, tự tạo lại bảng IAT trong RAM và kết thúc bằng một lệnh nhảy xa tới OEP tại địa chỉ `0x00401090`.*  
>  
> *Bài học rút ra từ Lab 01-03 là: khi gặp các packer tùy biến mà công cụ phân tích tĩnh tự động không giải mã được, chuyên viên bắt buộc phải kết hợp phân tích động với Debugger như x64dbg, đặt breakpoint tại OEP và dump bộ nhớ qua Scylla."*

#### 4. Lab 01-04: Process Injection & Tắt Windows File Protection
*(Thao tác: Nhấp Sub-tab "Lab 01-04", chỉ vào `sub_401174` và Resource #101)*
> *"Cuối cùng là bài lab phức tạp nhất: **Lab 01-04**:*  
> *Đây là một mẫu Trojan Dropper tinh vi kết hợp chuỗi tấn công 4 bước:*  
> *Thứ nhất, nó nạp động `psapi.dll` để quét danh sách tiến trình, tìm kiếm PID của `winlogon.exe`.*  
> *Thứ hai, hàm `sub_4010FC` sử dụng `AdjustTokenPrivileges` để kích hoạt đặc quyền tối cao `SeDebugPrivilege`.*  
> *Thứ ba, tại hàm `sub_401174`, mã độc mở `winlogon.exe` và gọi `CreateRemoteThread` trỏ tới hàm xuất không tên `Ordinal #2` trong thư viện `sfc_os.dll` nhằm **vô hiệu hóa hoàn toàn cơ chế bảo vệ tệp hệ thống Windows File Protection (WFP)**.*  
> *Thứ tư, khi WFP đã bị dập tắt, mã độc di chuyển file `wupdmgr.exe` (Windows Update thật) sang thư mục Temp với tên `winup.exe`. Sau đó, nó dùng `FindResourceA` trích xuất payload độc hại nhúng sẵn mang định danh `Resource #101`, ghi đè vào vị trí `system32\wupdmgr.exe` và kích hoạt.*  
>  
> *Bên trong Resource #101, mã độc vừa chạy file gốc `winup.exe` trong Temp để đánh lừa người dùng, vừa âm thầm gọi `URLDownloadToFileA` tải mã độc giai đoạn 2 từ `practicalmalwareanalysis.com/updater.exe` về lưu thành `wupdmgrd.exe` và thực thi ẩn."*

---

### PHẦN 4: TRANG 3 - BẢNG CHỈ SỐ NHẬN DIỆN IOCs (Khoảng 1 phút)
*(Thao tác: Nhấp chuyển sang Tab "Bảng Chỉ Số IOCs", thử gõ chữ "kerne132" vào ô tìm kiếm, bấm nút "Sao Chép Tất Cả IOCs")*

> *"Bây giờ, em xin chuyển sang tab thứ ba: **Kho Chỉ Số Nhận Diện Xâm Nhập (IOCs)**:*  
> *Tại đây, toàn bộ 22 chỉ số nhận diện từ 4 bài lab đã được tổng hợp thành bảng dữ liệu chuyên nghiệp, bao gồm:*  
> - *Mã băm MD5 và SHA-256 của từng tệp thực thi, DLL và payload nhúng.*  
> - *Các đường dẫn thả file độc hại như `kerne132.dll`, `winup.exe`, `wupdmgrd.exe`.*  
> - *Windows Service `MalService`, các Mutex ngăn chặn chạy trùng như `SADFHUHF` và `HGL345`.*  
> - *Cùng với địa chỉ máy chủ C2 `127.26.152.13:80` và URL tải payload.*  
>  
> *(Gõ vào ô tìm kiếm và bấm nút Copy)*  
> *Giao diện hỗ trợ thanh tìm kiếm tức thì theo thời gian thực và các bộ lọc danh mục. Đặc biệt, nút **Sao Chép Tất Cả (22 IOCs)** và các nút Copy mini cho phép chuyên viên SOC lấy nhanh dữ liệu đưa vào hệ thống SIEM hoặc tường lửa chỉ với một cú nhấp chuột."*

---

### PHẦN 5: TRANG 4 - MA TRẬN MITRE ATT&CK & KẾT LUẬN (Khoảng 1 phút)
*(Thao tác: Nhấp sang Tab "Ma Trận MITRE ATT&CK", lướt qua các cột chiến thuật rồi đưa về chân trang)*

> *"Cuối cùng, tại tab **Ma Trận MITRE ATT&CK**:*  
> *Toàn bộ các hành vi của mã độc trong Chapter 1 đã được phân loại chuẩn xác theo 5 chiến thuật quốc tế:*  
> 1. *Chiến thuật Thực thi (Execution) với Command Shell ẩn `T1059.003`.*  
> 2. *Chiến thuật Duy trì (Persistence) qua Windows Service `T1543.003` và DLL Hijacking `T1574.001`.*  
> 3. *Chiến thuật Leo thang đặc quyền (Privilege Escalation) qua Token Privileges `T1134` và Injection `T1055`.*  
> 4. *Chiến thuật Lẩn tránh (Defense Evasion) bằng cách đóng gói phần mềm `T1027`, tắt WFP `T1562` và giả mạo tên tệp Typosquatting `T1036`.*  
> 5. *Và Chiến thuật Điều khiển C2 qua raw socket `T1095` và HTTP Transfer `T1105`.*  
>  
> *Tổng kết lại: Qua 4 bài lab, chúng ta đã nắm bắt toàn diện bức tranh kỹ thuật từ tĩnh đến động, từ lẩn tránh đóng gói đến can thiệp nhân hệ điều hành. Việc chuẩn hóa dữ liệu theo REA và trực quan hóa lên SPA Dashboard đã giúp quá trình điều tra mã độc trở nên rõ ràng, minh bạch và có tính ứng dụng thực tiễn rất cao.*  
>  
> *Bài báo cáo của em đến đây là kết thúc. Em xin chân thành cảm ơn Thầy và các bạn đã dành thời gian theo dõi!"*

---

## MẸO QUAY VIDEO MƯỢT MÀ NHẤT
- Bạn có thể in tài liệu này ra giấy hoặc mở trên điện thoại / màn hình phụ để nhìn và nói một cách tự nhiên nhất.
- Khi nói đến đoạn nào, chỉ cần dùng chuột nhấp vào tab tương ứng trên SPA Dashboard và rê nhẹ con trỏ chuột vào các dòng chữ hoặc biểu đồ minh họa.
- Giữ phong thái tự tin, âm lượng vừa phải, không cần nói quá nhanh. Thời lượng từ 7 đến 8 phút là hoàn hảo cho một bài báo cáo điểm A+!
