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
1. Dùng <div class="header"> thay vì <header> Google không nhận diện rõ đây là phần đầu trang.
2. Menu dùng <div> thay vì <nav> + danh sách <ul><li> Thanh điều hướng nên dùng <nav> để bot hiểu đây là menu chính.
3. Tên sản phẩm dùng <div class="title"> thay vì heading <h1>/<h2> .Tiêu đề rất quan trọng cho SEO.
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

## Câu A4: (Nguồn tham chiếu: 05_tables_hyperlinks.md )
1. Cấu trúc chuẩn của một bảng dữ liệu
Một bảng "đúng chuẩn" không chỉ giúp người dùng dễ đọc mà còn giúp các thiết bị hỗ trợ người khiếm thị (screen readers) hiểu được dữ liệu.

<thead>: Thường chứa thẻ <th> (table header) - văn bản tại đây sẽ tự động được in đậm và căn giữa.

<tbody>: Chứa các thẻ <td> (table data) - chứa dữ liệu thực tế.

<tfoot>: Rất hữu ích cho các bảng hóa đơn (để hiển thị "Tổng cộng") hoặc bảng thống kê.

2. Tại sao Layout bằng Table lại là "ác mộng" hiện nay?
Bạn đã nêu đúng 3 lý do chính, mình sẽ giải thích sâu hơn một chút về mặt kỹ thuật:

Tính linh hoạt (Responsiveness): Khi xem trên điện thoại, các cột của bảng không thể tự "rớt dòng" xuống dưới nhau. Nếu bạn có 5 cột, trên điện thoại nó sẽ bị ép lại cực nhỏ hoặc gây ra thanh cuộn ngang rất khó chịu. Trong khi đó, Flexbox hoặc CSS Grid cho phép thay đổi vị trí các phần tử cực kỳ dễ dàng bằng Media Queries.

Vấn đề SEO & Trợ năng: Google Bot xem trang web giống như một người mù đọc văn bản. Nếu bạn dùng bảng để dàn trang, Bot sẽ hiểu là "Dữ liệu cột 1 là Logo, dữ liệu cột 2 là Menu", điều này làm loãng ý nghĩa thực tế của nội dung.

Hiệu năng (Rendering): Trình duyệt sử dụng thuật toán "table layout" khá phức tạp. Nó phải tính toán chiều rộng của ô rộng nhất trong cả cột rồi mới vẽ được bảng. Nếu bảng quá lớn, người dùng sẽ thấy một khoảng trắng lâu hơn trước khi nội dung hiện ra.