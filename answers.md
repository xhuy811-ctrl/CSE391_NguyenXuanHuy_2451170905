# PHẦN A — KIỂM TRA ĐỌC HIỂU

## Câu A1 (Nguồn tham chiếu: 01_introduction_html_universe.md 1.1 Kiến trúc Client-Server, 1.2 HTTP, 1.3 Browser Rendering và 4.3 Developer Tools)

### 1. Các bước xảy ra khi truy cập https://shopee.vn:
- **Bước 1:** DNS Lookup (Tra cứu DNS)
Trình duyệt hỏi hệ thống DNS để tìm địa chỉ IP của shopee.vn.
- **Bước 2:** Thiết lập kết nối
Trình duyệt kết nối đến server qua TCP/TLS (HTTPS bảo mật).
- **Bước 3:** Gửi Request (Yêu cầu)
Trình duyệt gửi HTTP request qua router, nhà mạng, internet đến server Shopee.
- **Bước 4:** Server xử lý
Server nhận request, xử lý logic: kiểm tra đăng nhập, lấy sản phẩm, tạo nội dung trang,...
- **Bước 5:** Trả về Response (Phản hồi)
Server gửi HTML/CSS/JS, ảnh, dữ liệu JSON về trình duyệt.
- **Bước 6:** Browser Rendering (Kết xuất)
Trình duyệt phân tích HTML tạo DOM, áp CSS, chạy JavaScript rồi hiển thị giao diện.

### 2. Tab Network trong DevTools:
- Thông tin: Tab Network cho phép theo dõi quá trình tải tài nguyên, trạng thái HTTP, thời gian phản hồi...
- Screenshots file `A1.2.png`.

## Câu A2 (Nguồn tham chiếu: 04_visible_part_html.md - Bản đồ Semantic Elements)

Trang web này bị Google đánh giá SEO thấp vì HTML không dùng thẻ semantic rõ ràng, làm công cụ tìm kiếm khó hiểu cấu trúc nội dung và mức độ quan trọng của từng phần.

Ít nhất 4 lỗi semantic
1. Dùng <div class="header"> thay vì <header>
Google không nhận diện rõ đây là phần đầu trang.
2. Menu dùng <div> thay vì <nav> + danh sách <ul><li>
Thanh điều hướng nên dùng <nav> để bot hiểu đây là menu chính.
3. Tên sản phẩm dùng <div class="title"> thay vì heading <h1>/<h2>
Tiêu đề rất quan trọng cho SEO.
Nên dùng heading để Google biết đây là nội dung chính.
4. Khu vực sản phẩm dùng <div> thay vì <main> / <article> / <section>
Bot khó hiểu đâu là nội dung chính của trang.
5. Ảnh không có thuộc tính alt
Google không hiểu ảnh nói về gì.
6. Footer dùng <div> thay vì <footer>
Không xác định được chân trang.

Code sửa lại chuẩn semantic:
```html
<header>
    <div class="logo">ShopTLU</div>

    <nav>
        <ul>
            <li><a href="/">Trang chủ</a></li>
            <li><a href="/products">Sản phẩm</a></li>
        </ul>
    </nav>
</header>

<main>
    <article class="product">
        <h1>iPhone 16 Pro</h1>
        <p class="price">25.990.000đ</p>
        <img src="iphone.jpg" alt="Điện thoại iPhone 16 Pro">
    </article>
</main>

<footer>
    <p>© 2026 ShopTLU</p>
</footer>
```

## Câu A3: (Nguồn tham chiếu: 04_visible_part_html.md)
Kết quả là:
```html
[Hộp 1]
Text A Text B
[Hộp 2]
Text C Text D
[Hộp 3]
```
-`<div>` là 1 thẻ thuộc Block element luôn bắt đầu trên một dòng mới và chiếm toàn bộ chiều ngang của trang. Do đó, Hộp 1, Hộp 2, và Hộp 3 mỗi cái nằm riêng biệt trên một dòng.
-`<span>` và `<strong>` là 2 thẻ thuộc Inline element nên chúng sẽ nằm cùng một hàng với nhau khi kết thúc.