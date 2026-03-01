# Script Thuyết Trình Tiến Độ — FPT Hub
**Ngày thuyết trình:** 2/3/2026 (Thứ Hai)  
**Dự án:** FPT Hub — Nền tảng thông tin tổng hợp dành cho sinh viên ĐH FPT  

---

## Slide 1 — Trang bìa

> **"FPT Hub — Tất cả thông tin trường, một nơi duy nhất"**
>
> Nhóm: [Tên nhóm]  
> Môn: Capstone 1  
> Ngày: 02/03/2026

**Script:**
"Xin chào thầy/cô và các bạn. Hôm nay nhóm em xin trình bày tiến độ dự án FPT Hub — một nền tảng web tổng hợp thông tin dành riêng cho sinh viên Đại học FPT."

---

## Slide 2 — Tổng quan dự án

**Nội dung slide:**
- FPT Hub là gì? → Website tổng hợp hướng dẫn sử dụng FAP, FLM, EduNext và thông tin đời sống sinh viên FPT
- Vấn đề giải quyết: Sinh viên mới thiếu nguồn hướng dẫn tập trung, phải tìm kiếm rải rác
- Đối tượng: Sinh viên FPT University (chủ yếu tân sinh viên)
- Công nghệ: HTML/CSS/JS, Firebase Auth (Google FPT), GitHub Pages

**Script:**
"FPT Hub ra đời từ thực tế mà chính nhóm em gặp phải khi mới vào trường — đó là không có một nơi duy nhất tổng hợp hướng dẫn sử dụng các hệ thống của trường như FAP, FLM, EduNext. Sinh viên phải hỏi anh chị khóa trên hoặc tự mò. FPT Hub giải quyết vấn đề này bằng cách tạo một website thân thiện, có hình ảnh minh họa chi tiết từng bước."

---

## Slide 3 — Tiến độ công việc

**Nội dung slide (checklist):**
- ✅ Thiết kế giao diện (Design System, Dark Theme)
- ✅ Trang chủ với hero section, search, filter
- ✅ Đăng nhập Google FPT (Firebase Auth)
- ✅ Hướng dẫn FAP — Bảng điểm & Đăng ký (19 ảnh)
- ✅ Hướng dẫn FAP — Đăng nhập & Thanh toán
- ✅ Hướng dẫn FAP — Thi cử SEB/EOS (23 ảnh)
- ✅ Hướng dẫn EduNext — Thảo luận & Nhóm (22 ảnh)
- ✅ Hướng dẫn FLM — Chương trình đào tạo (7 ảnh)
- ✅ Trang Hệ sinh thái Học tập FPT
- ✅ Trang Giới thiệu (About)
- ✅ **[MỚI]** Trang Câu lạc bộ & Đời sống FPTU (30+ CLB, 5 danh mục)
- ✅ **[MỚI]** Thông tin tuyển sinh FPT 2026 (38 chuyên ngành)
- 🔲 Responsive optimization
- 🔲 SEO & Performance tuning
- 🔲 User feedback & iteration

**Script:**
"Về tiến độ, nhóm em đã hoàn thành phần lớn các tính năng cốt lõi. Website hiện có 7 trang hướng dẫn chi tiết với tổng cộng hơn 70 ảnh chụp màn hình. Gần đây nhóm đã bổ sung thêm trang Câu lạc bộ tổng hợp hơn 30 CLB tại FPTU, chia theo 5 nhóm — và panel thông tin tuyển sinh 2026 với 38 chuyên ngành mới. Tất cả đều có chức năng tìm kiếm và lọc theo danh mục."

---

## Slide 4 — Demo sản phẩm

**Nội dung slide:** Screenshots hoặc live demo

Các điểm highlight khi demo:
1. **Trang chủ**: Hero section premium, search bar, filter tabs, card grid
2. **Đăng nhập**: Google FPT Auth — chỉ @fpt.edu.vn được vào
3. **Hướng dẫn FAP**: Từng bước có ảnh, tips box, table of contents
4. **Trang CLB**: 30+ câu lạc bộ, filter theo nhóm, search, info FPT 2026
5. **Responsive**: Hoạt động tốt trên mobile

**Script:**
"Em xin demo nhanh sản phẩm. Đây là trang chủ với thiết kế dark theme hiện đại. Khi click vào một card, ví dụ FAP — Bảng điểm, các bạn sẽ thấy hướng dẫn từng bước với ảnh chụp thực tế. Trang CLB mới cho phép sinh viên tìm kiếm và khám phá hơn 30 câu lạc bộ. Đặc biệt có panel thông tin tuyển sinh 2026 giúp tân sinh viên nắm được các ngành đào tạo."

---

## Slide 5 — Khó khăn & Giải pháp

| Khó khăn | Giải pháp |
|----------|-----------|
| Thu thập ảnh chụp hệ thống FAP/EduNext | Chụp trực tiếp từ tài khoản sinh viên, che thông tin nhạy cảm |
| Thông tin CLB phân tán, không cập nhật | Tham khảo nguồn 4genZ, verify qua Facebook page chính thức |
| Firebase Auth chỉ cho phép @fpt.edu.vn | Cấu hình restrict domain trong Firebase Console |
| Thiết kế responsive cho nhiều loại nội dung | Sử dụng CSS Grid + Flexbox, test trên nhiều viewport |

**Script:**
"Trong quá trình triển khai, nhóm gặp một số khó khăn. Thứ nhất, việc thu thập ảnh hệ thống yêu cầu chụp trực tiếp và che thông tin cá nhân. Thứ hai, thông tin CLB khá phân tán — nhóm đã tham khảo từ nguồn 4genZ và verify qua từng Facebook page. Thứ ba, việc giới hạn đăng nhập chỉ cho email @fpt.edu.vn được giải quyết bằng cấu hình Firebase Auth."

---

## Slide 6 — Kế hoạch tiếp theo

**Sprint tiếp theo (tháng 3/2026):**
1. Tối ưu responsive trên tất cả thiết bị
2. Thêm trang Events/Sự kiện FPTU
3. Thu thập feedback từ sinh viên thực tế
4. SEO optimization & meta tags
5. Chuẩn bị cho Capstone 2 — mở rộng tính năng

**Script:**
"Về kế hoạch tiếp theo, nhóm sẽ tập trung tối ưu responsive, bổ sung trang sự kiện và quan trọng nhất là thu thập feedback từ sinh viên thực tế để cải thiện nội dung. Mục tiêu cuối cùng là có một sản phẩm hoàn chỉnh, thực sự hữu ích cho tân sinh viên FPT."

---

## Slide 7 — Q&A

> **Cảm ơn thầy/cô và các bạn đã lắng nghe!**
>
> 🔗 Demo: [link GitHub Pages]  
> 📧 Liên hệ: [email nhóm]

**Script:**
"Trên đây là toàn bộ tiến độ dự án FPT Hub của nhóm em. Em xin phép mời thầy/cô và các bạn đặt câu hỏi. Xin cảm ơn ạ!"
