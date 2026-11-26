# Hướng dẫn soạn file chương (chuẩn cho web truyện)

Tài liệu này dùng để đưa cho AI (hoặc người biên tập) chỉnh một chương về đúng định dạng của web.
Cách dùng nhanh: dán **Phần A** vào AI, rồi dán nội dung chương cần sửa bên dưới.

---

## PHẦN A. Lệnh dán cho AI

```
Bạn là biên tập viên định dạng. Hãy chuyển chương truyện dưới đây về đúng chuẩn file .md của web của tôi.

CHỈ SỬA ĐỊNH DẠNG. Không đổi, thêm, bớt hay viết lại bất kỳ chữ nào của nội dung.
Chỉ trả về nội dung file hoàn chỉnh, không giải thích, không bọc trong khối code.

QUY TẮC ĐỊNH DẠNG:
1. Dòng đầu tiên: `# Tiêu đề chương` (không ghi "Chương 1:" nếu web đã tự đánh số; giữ nguyên nếu tôi yêu cầu).
2. MỖI ĐOẠN VĂN NẰM TRÊN ĐÚNG MỘT DÒNG. Tuyệt đối không ngắt dòng giữa đoạn. Để một dòng trống giữa các đoạn cho dễ đọc.
3. LỜI THOẠI: đặt trong ngoặc kép kiểu “…” (hoặc "…"), đóng ngoặc ngay trên cùng dòng.
   Ví dụ: Lan hỏi: “Cô cũng thấy nó sao?”
   Nếu lời thoại kéo dài nhiều đoạn, đóng và mở lại ngoặc ở mỗi đoạn.
   Không dùng gạch đầu dòng (-, —) cho thoại, trừ khi tôi yêu cầu kiểu gạch đầu dòng cho cả truyện.
4. SUY NGHĨ NỘI TÂM: bọc trong một dấu sao mỗi bên, ví dụ *Mình đang mơ sao?*
   Không có khoảng trắng ngay sau dấu sao mở hoặc ngay trước dấu sao đóng.
   Không đặt suy nghĩ trong ngoặc kép. Không dùng dấu sao để nhấn mạnh thường; nhấn mạnh dùng **chữ đậm**.
5. ĐỔI CẢNH / NHẢY THỜI GIAN: một dòng chỉ gồm `---`, có một dòng trống phía trên và phía dưới.
6. TRÍCH DẪN (thư, bảng hiệu, dòng chữ viết tay): bắt đầu dòng bằng `> `.
7. ẢNH MINH HỌA: giữ nguyên các dòng có dạng `![chú thích](img/ten-anh.jpg)`. Không xóa, không sửa đường dẫn, mỗi ảnh nằm riêng một dòng.
8. KHÔNG dùng: bảng, danh sách gạch đầu dòng, liên kết, thẻ HTML, dấu gạch dưới _ để in nghiêng.
9. Thống nhất một kiểu ngoặc kép trong cả chương.
10. MÀU NHÂN VẬT: với mỗi đoạn có lời thoại hoặc suy nghĩ của một nhân vật trong danh sách trên, thêm `@ten` và một dấu cách ở đầu dòng. Ví dụ: `@lan “Vâng.” Cô nói.` hoặc `@lan *Mình sợ quá.*`
    - Mỗi đoạn chỉ có MỘT người nói. Nếu một dòng có hai người nói, tách thành hai dòng.
    - Lời thoại và suy nghĩ của cùng một nhân vật dùng cùng một thẻ.
    - Nhân vật không có trong danh sách và người dẫn truyện thì KHÔNG gắn thẻ.
    - Giữ nguyên các thẻ `@ten` đã có sẵn.
11. CHỈ ĐỔI ĐỊNH DẠNG, giữ nguyên từ địa phương, cách xưng hô, chính tả và dấu câu của tác giả (ví dụ "hông", "tui", "nè"). Không "sửa lỗi", không chuẩn hóa giọng văn.
12. Nếu một dòng có HAI người nói trở lên, tách thành các dòng riêng (mỗi dòng một người), chỉ ngắt dòng, không đổi chữ.
13. Từ hoặc cụm được đặt trong ngoặc kép nhưng KHÔNG phải lời nói (ví dụ: Chữ "đẹp" tới trước) thì đổi sang nháy đơn cong ‘…’ để không bị tô màu như lời thoại.
14. Nếu không chắc ai nói câu nào, KHÔNG gắn thẻ cho đoạn đó. Cuối câu trả lời, thêm mục "CẦN KIỂM TRA" liệt kê các đoạn này (trích 5 từ đầu mỗi đoạn).
15. Không thêm phần "front matter" (khối --- ở đầu file) trừ khi tôi yêu cầu.

Sau khi chỉnh xong, tự kiểm tra: mọi ngoặc kép đều đã đóng, mọi dấu * đều có cặp, mỗi đoạn một dòng.

NHÂN VẬT CÓ MÀU RIÊNG (tên viết thường, không dấu): lan, tu, minh
(xóa dòng này nếu truyện không dùng màu nhân vật)

NỘI DUNG CHƯƠNG:
(dán chương vào đây)
```

---

## PHẦN B. Chuẩn file chương (đầy đủ)

### 1. Tên file
`NNN-ten-chuong-khong-dau.md` hoặc `.txt`
- **Bắt đầu bằng số** (`001-`, `002-`, `010-`). Số quyết định thứ tự chương.
- Chữ thường, không dấu, không khoảng trắng, dùng gạch ngang.
- Ví dụ: `003-tiem-dong-ho.md`

### 2. Cấu trúc một chương
```
# Tiêu đề chương

Đoạn mở đầu, kể bằng lời dẫn truyện.

“Lời thoại của nhân vật.” Lan nói.

*Suy nghĩ thầm của nhân vật.* Cô tự hỏi.

---

Đoạn sau khi đổi cảnh.
```

### 3. Bảng ký hiệu

| Muốn có | Viết như thế nào | Ví dụ |
|---|---|---|
| Tiêu đề chương | `# ` ở đầu dòng đầu tiên | `# Con phố thứ nhất` |
| Đoạn văn | Một đoạn = một dòng | |
| Lời thoại (tô màu `dialog`) | Trong ngoặc kép | `“Đi thôi.”` |
| Lời thoại kiểu gạch đầu dòng | `- ` hoặc `— ` ở đầu dòng, tô cả dòng | `- Đi thôi.` |
| Suy nghĩ nội tâm (tô màu `thought`) | `*…*` | `*Mình sợ quá.*` |
| Chữ đậm | `**…**` | `**Cảnh báo!**` |
| Đổi cảnh | Dòng `---` riêng | |
| Trích dẫn / chữ viết tay | `> ` đầu dòng | `> Xin hãy viết tiếp.` |
| Thoại / suy nghĩ của nhân vật có màu riêng | `@ten ` ở đầu dòng | `@lan “Vâng.” Cô nói.` |
| Ảnh minh họa | `![chú thích](img/ten.jpg)` trên dòng riêng | `![Phố mưa](img/pho-mua.jpg)` |

### 4. Quy tắc quan trọng
1. **Mỗi đoạn một dòng.** Web coi mỗi dòng là một đoạn riêng. Nếu ngắt dòng giữa chừng, câu bị tách thành hai đoạn.
2. **Ngoặc kép phải đóng trong cùng một dòng**, nếu không web không tô màu được lời thoại đó.
3. **Chọn một kiểu thoại cho cả truyện** (khuyên dùng ngoặc kép). Nếu dùng gạch đầu dòng thì cả dòng đó được tô màu, kể cả lời dẫn nằm sau lời thoại (ví dụ `- Đi thôi, cô nói.` tô cả câu), nên nên đặt lời dẫn ở dòng khác.
4. **Đoạn có cả lời dẫn lẫn thoại** vẫn viết một dòng. Chỉ phần trong ngoặc kép được tô màu: `Minh đáp: “Chào em.”`
5. **Suy nghĩ nằm trong ngoặc kép** thì màu thoại được ưu tiên. Vì vậy hãy tách suy nghĩ ra khỏi ngoặc kép.
6. **Dấu `*` chỉ dành cho suy nghĩ.** Không dùng để nhấn mạnh thường, vì mọi chữ nghiêng đều bị tô màu suy nghĩ.
7. Không có khoảng trắng ngay trong sát dấu sao: đúng `*Hả?*`, sai `* Hả? *`.
8. **Màu nhân vật:** khai báo ở `info.md` bằng `char.ten: "#mã màu"` (tên viết thường, không dấu, không khoảng trắng), rồi gắn `@ten` ở đầu mỗi đoạn có thoại hoặc suy nghĩ của người đó. Thoại và suy nghĩ của cùng nhân vật cùng một màu. Đoạn không gắn thẻ dùng màu chung `dialog` / `thought`. Một đoạn chỉ gắn một thẻ. Nếu quên khai báo màu thì thẻ bị bỏ qua, đoạn dùng màu chung. Nền tối tự làm sáng màu.
9. **Ảnh minh họa:** để file ảnh trong thư mục `img/` của truyện (`stories/ten-truyen/img/`), rồi viết dòng `![chú thích](img/ten.jpg)` riêng một dòng ở đúng chỗ cần chèn. Đường dẫn tính từ thư mục truyện, chỉ dùng chữ thường không dấu. Chú thích hiện dưới ảnh, có thể để trống `![](img/ten.jpg)`. Chạm vào ảnh để phóng to. Nên nén ảnh khoảng 100 đến 300 KB, rộng 1000 đến 1600 px.
10. Tiêu đề lấy từ dòng `# ` đầu tiên. Nếu thiếu, web lấy từ tên file.

### 5. Cài đặt riêng cho một chương (tùy chọn)
Đặt ở **dòng đầu tiên** của file, trước dòng `# Tiêu đề`:
```
---
title: Tiệm đồng hồ
bg: "#0b0f1a"
dialog: "#7dd3fc"
thought: "#c4b5fd"
---
# Tiệm đồng hồ
```
Các khóa dùng được: `title`, `theme` (light | sepia | dark), `bg`, `color`, `accent`, `dialog`, `thought`, `font` (serif | sans | mono), `size`, `align` (left | justify), `width`, `dropcap` (true | false).
Mã màu viết trong ngoặc kép. Không khai báo thì chương dùng cài đặt chung trong `info.md` của truyện.

### 6. Mẫu `info.md` của truyện
```
---
title: Tên truyện
author: Bạn & AI
genre: Huyền bí
status: Đang ra
cover: bia.jpg
desc: Một câu giới thiệu ngắn.
theme: dark
font: serif
size: 19
align: justify
dropcap: true
dialog: "#7dd3fc"
thought: "#c4b5fd"
char.lan: "#f472b6"
char.tu: "#fbbf24"
char.minh: "#38bdf8"
---
```
Chỉ `title` là nên có. Các dòng còn lại tùy chọn.

---

## PHẦN C. Ví dụ trước và sau khi chuẩn hóa

**Trước (sai chuẩn):**
```
Chương 1 - Con phố thứ nhất

Mưa rơi từ chiều. Lan đứng dưới mái hiên
tiệm đồng hồ, nhìn con phố mờ dần.

- Cô cũng thấy nó sao? - giọng ông lão vang lên.
Lan nghĩ: "Mình đang mơ sao?"
_Chữ trên bảng đang rụng._
* * * 
Sáng hôm sau, không ai nhớ nơi đó từng tồn tại.
```

**Sau (đúng chuẩn):**
```
# Con phố thứ nhất

Mưa rơi từ chiều. Lan đứng dưới mái hiên tiệm đồng hồ, nhìn con phố mờ dần.

“Cô cũng thấy nó sao?” Giọng ông lão vang lên sau lưng.

*Mình đang mơ sao?* Lan nghĩ.

Chữ trên bảng đang rụng từng nét một.

---

Sáng hôm sau, không ai nhớ nơi đó từng tồn tại.
```

---

## PHẦN D. Danh sách kiểm tra cuối cùng
- [ ] Tên file bắt đầu bằng số, không dấu.
- [ ] Dòng đầu là `# Tiêu đề` (hoặc khối `---` cài đặt rồi mới đến tiêu đề).
- [ ] Mỗi đoạn một dòng, không ngắt dòng giữa câu.
- [ ] Mọi ngoặc kép đều đóng trên cùng dòng.
- [ ] Suy nghĩ nội tâm dùng `*…*`, không dùng cho mục đích khác.
- [ ] Đoạn thoại/suy nghĩ của nhân vật chính có thẻ `@ten`, mỗi đoạn một người nói, tên đã khai báo `char.ten` trong `info.md`.
- [ ] Đổi cảnh dùng dòng `---` riêng.
- [ ] Ảnh nằm riêng một dòng, đường dẫn đúng, file ảnh đã được up vào `img/`.
- [ ] Không có bảng, danh sách, liên kết, thẻ HTML.

---

## PHẦN E. Gợi ý 6 màu nhân vật
Các màu dưới đây đủ khác nhau để phân biệt trên nền sáng; nền tối tự làm sáng lên cho dễ đọc.

| Nhân vật | Khai báo | Màu |
|---|---|---|
| 1 | `char.lan: "#2563eb"` | xanh dương |
| 2 | `char.tu: "#dc2626"` | đỏ |
| 3 | `char.minh: "#16a34a"` | xanh lá |
| 4 | `char.nam: "#ea580c"` | cam |
| 5 | `char.hoa: "#7c3aed"` | tím |
| 6 | `char.mai: "#db2777"` | hồng |

Màu chung `dialog` và `thought` nên chọn tông xám xanh trung tính để không trùng với màu nhân vật.
