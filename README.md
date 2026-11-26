# Thư Viện Truyện

## Đăng chương mới
1. Vào `stories/<tên-truyện>/`, thêm file `003-ten-chuong.md` (hoặc `.txt`).
2. Dòng đầu: `# Tiêu đề chương`. Số đầu tên file quyết định thứ tự.
3. Commit → khoảng 1 phút sau web tự cập nhật.

## Truyện mới
Tạo thư mục `stories/<ten-truyen>/` với `info.md`. Ảnh bìa (tuỳ chọn) để cạnh `info.md`, ghi `cover: bia.jpg`.

## Cài đặt trong info.md (đầu file, giữa hai dòng `---`)
- Thông tin: title, author, genre, status, cover, desc (nếu không ghi, phần chữ bên dưới được dùng làm mô tả)
- Trang trí: theme (light|sepia|dark), bg, color, accent (mã màu), font (serif|sans|mono), size (cỡ chữ), align (left|justify), width (độ rộng cột), dropcap (true = chữ cái đầu to)
- Màu lời thoại: `dialog: "#2563eb"` — tự tô phần trong ngoặc kép ("…", “…”, «…») và dòng mở đầu bằng gạch đầu dòng (`- `, `— `). Trên nền tối màu tự sáng hơn.
- Màu suy nghĩ nội tâm: `thought: "#7c3aed"` — tô mọi chữ in nghiêng `*như thế này*`. Nếu đoạn nghiêng nằm trong ngoặc kép thì màu thoại được ưu tiên.
- Màu từng nhân vật: `char.lan: "#2563eb"` trong info.md, rồi gắn `@lan ` ở đầu đoạn có thoại/suy nghĩ của Lan. Cùng nhân vật thì thoại và suy nghĩ cùng màu; đoạn không gắn thẻ dùng màu chung.
- Mỗi chương có thể ghi đè các cài đặt trên ở đầu file chương (thêm `title:` nếu muốn).
- Người đọc chọn "Theo truyện" thì hiển thị đúng theo md; chọn Sáng/Sepia/Tối thì dùng lựa chọn của họ.

## Ảnh minh họa
Bỏ ảnh vào `stories/<truyen>/img/`, trong chương viết một dòng riêng: `![chú thích](img/ten.jpg)`. Chạm ảnh để phóng to. Nên nén ảnh 100–300 KB.

## Đưa lên GitHub Pages
1. Tạo repo, đẩy toàn bộ thư mục này lên nhánh `main`.
2. Settings → Pages → Source: **GitHub Actions**.
3. Xem thử trên máy: `node scripts/build.js` rồi `npx serve dist`.
