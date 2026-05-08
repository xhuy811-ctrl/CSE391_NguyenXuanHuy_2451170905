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
1. Dùng `<div class="header">` thay vì `<header>` Google không nhận diện rõ đây là phần đầu trang.
2. Menu dùng `<div>` thay vì `<nav>` + danh sách `<ul><li>` Thanh điều hướng nên dùng `<nav>` để bot hiểu đây là menu chính.
3. Tên sản phẩm dùng `<div class="title">` thay vì heading `<h1>/<h2>` .Tiêu đề rất quan trọng cho SEO.
Nên dùng heading để Google biết đây là nội dung chính.
4. Khu vực sản phẩm dùng `<div>` thay vì `<main>` / `<article>` / `<section>`
Bot khó hiểu đâu là nội dung chính của trang.
5. Ảnh không có thuộc tính alt
Google không hiểu ảnh nói về gì.
6. Footer dùng `<div>` thay vì `<footer>`
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

`<thead>`: Thường chứa thẻ <th> (table header) - văn bản tại đây sẽ tự động được in đậm và căn giữa.

`<tbody>`: Chứa các thẻ <td> (table data) - chứa dữ liệu thực tế.

`<tfoot>`: Rất hữu ích cho các bảng hóa đơn (để hiển thị "Tổng cộng") hoặc bảng thống kê.

2. Tại sao Layout bằng Table lại là "ác mộng" hiện nay?
Bạn đã nêu đúng 3 lý do chính, mình sẽ giải thích sâu hơn một chút về mặt kỹ thuật:

Tính linh hoạt (Responsiveness): Khi xem trên điện thoại, các cột của bảng không thể tự "rớt dòng" xuống dưới nhau. Nếu bạn có 5 cột, trên điện thoại nó sẽ bị ép lại cực nhỏ hoặc gây ra thanh cuộn ngang rất khó chịu. Trong khi đó, Flexbox hoặc CSS Grid cho phép thay đổi vị trí các phần tử cực kỳ dễ dàng bằng Media Queries.

Vấn đề SEO & Trợ năng: Google Bot xem trang web giống như một người mù đọc văn bản. Nếu bạn dùng bảng để dàn trang, Bot sẽ hiểu là "Dữ liệu cột 1 là Logo, dữ liệu cột 2 là Menu", điều này làm loãng ý nghĩa thực tế của nội dung.

Hiệu năng (Rendering): Trình duyệt sử dụng thuật toán "table layout" khá phức tạp. Nó phải tính toán chiều rộng của ô rộng nhất trong cả cột rồi mới vẽ được bảng. Nếu bảng quá lớn, người dùng sẽ thấy một khoảng trắng lâu hơn trước khi nội dung hiện ra.

# PHẦN B - THỰC HÀNH CODE:

## Câu B3:
Danh sách các lỗi:

Lỗi 1: Dòng 1 — Khai báo DOCTYPE thiếu từ khóa html — Cách sửa: Đổi thành `<!DOCTYPE html>`

Lỗi 2: Dòng 2 — Thẻ `<html>` thiếu thuộc tính ngôn ngữ lang — Cách sửa: Đổi thành `<html lang="vi">`

Lỗi 3: Dòng 4 — Thẻ `<title>` chưa được đóng — Cách sửa: Đổi thành `<title>`Trang web`</title>`

Lỗi 4: Dòng 5 — Giá trị bảng mã utf8 thiếu dấu gạch ngang và viết sai chuẩn — Cách sửa: Đổi thành `<meta charset="UTF-8">`

Lỗi 5: Dòng 8 — Thẻ đóng của `<h1>` viết sai (thiếu dấu gạch chéo đúng vị trí) — Cách sửa: Đổi thành `<h1>`Welcome to ShopTLU`</h1>`

Lỗi 6: Dòng 12 — Thẻ đóng của `<a>` viết sai — Cách sửa: Đổi thành `<a href="home">Trang chủ</a>`

Lỗi 7: Dòng 21 — Giá trị của thuộc tính src không nằm trong dấu ngoặc kép — Cách sửa: Đổi thành `<img src="iphone.jpg">`

Lỗi 8: Dòng 21 — Thẻ `<img>`thiếu thuộc tính alt mô tả ảnh (lỗi Semantic) — Cách sửa: Thêm alt="iPhone 16 Pro" vào thẻ img.

Lỗi 9: Dòng 23 — Các thẻ đóng `</p>``</b>` bị viết sai thứ tự lồng nhau — Cách sửa: Đổi thành `<b>`25.990.000đ`</b>``</p>`

Lỗi 10: Dòng 40 — Sử dụng thẻ `<main>` lần thứ hai (Thẻ `<main>` là duy nhất trong một trang) — Cách sửa: Đổi thẻ `<main>`này thành `<aside>`  là nội dung phụ.

Lỗi 11: Dòng 44 — Thẻ `<footer>` chưa được đóng — Cách sửa: Thêm thẻ `</footer>` vào cuối đoạn nội dung chân trang.

Lỗi 12: Dòng 19 - Thẻ `<h3>` Nhảy bậc tiêu đề từ h1 xuống h3 đổi thành `<h2>`

## Câu B4:
1. Với trang shopee.vn:  
* 3 thẻ semantic HTML5 được sử dụng:
- Thẻ `<html>` Nằm ngay dòng đầu tiên (thẻ gốc có thuộc tính dir="ltr" lang="vi").
- Thẻ `<head>` Nằm ngay bên dưới thẻ `<html>`(chứa các thông tin metadata của như tiêu đề, bảng mã, liên kết CSS).
- Thẻ `<body>` Nằm dưới thẻ `<head>`(thẻ ngữ nghĩa bao bọc toàn bộ nội dung hiển thị của trang web mà người dùng nhìn thấy).
* 2 thẻ mà trang đó KHÔNG dùng đúng semantic:
- Thẻ `<div id="main">` Nên dùng thẻ `<main>` thay vì `<div id="main">` vì đây là nội dung chính của trang.
- Thẻ `<div id="modal">` - Nên dùng thẻ `<dialog>` thay vì `<div id="modal">` vì đây là hộp thoại/modal.
2. Trong tab Elements shopee không có `<table>` nào.
3. `<form>` trên trang 
- From đó có Action: /search và Method: get  
- Input text và Input button được sử dụng

# PHẦN C — SUY LUẬN

## Câu C1:
```html

<!DOCTYPE html>
<html lang="vi">
<head>
    <meta charset="UTF-8">
    <title>Trang Chi Tiết Sản Phẩm</title>
</head>
<body>

    <header>
        <nav>
            <ul>
                <li><a href="#">Trang chủ</a></li>
                <li><a href="#">Khuyến mãi</a></li>
            </ul>
        </nav>
    </header>

    <main>
        
        <nav aria-label="breadcrumb">
            <ol> <li><a href="/">Trang chủ</a></li>
                <li><a href="/dien-thoai">Điện thoại</a></li>
                <li>iPhone 16</li>
            </ol>
        </nav>

        <article class="product-detail">
            
            <section class="product-visuals">
                <h2>Hình ảnh sản phẩm</h2>
                <figure> <img src="main-product.jpg" alt="iPhone 16 mặt trước">
                    <div class="thumbnail-list">
                        <img src="thumb1.jpg" alt="Góc nghiêng">
                        <img src="thumb2.jpg" alt="Mặt lưng">
                        <img src="thumb3.jpg" alt="Cổng sạc">
                        <img src="thumb4.jpg" alt="Hộp máy">
                        <img src="thumb5.jpg" alt="Màu sắc">
                    </div>
                </figure>
            </section>

            <section class="product-info">
                <h1>Tên sản phẩm (iPhone 16)</h1> <div class="rating">
                    <span>5 sao</span> </div>
                <p class="price"><strong>22.000.000đ</strong></p> <p class="description">Mô tả ngắn gọn về sản phẩm.</p>
            </section>

            <section class="specifications">
                <h2>Thông số kỹ thuật</h2>
                <table> <thead>
                        <tr>
                            <th colspan="2">Cấu hình chi tiết</th> </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Màn hình</td>
                            <td>6.1 inch</td>
                        </tr>
                        <tr>
                            <td>Chipset</td>
                            <td>A18 Bionic</td>
                        </tr>
                    </tbody>
                </table>
            </section>

            <section class="reviews">
                <h2>Đánh giá từ khách hàng</h2>
                <article class="user-comment">
                    <footer>Đăng bởi: Nguyễn Xuân Huy</footer> <p>Sản phẩm rất tốt!</p>
                </article>
            </section>
        </article>

        <aside class="related-products">
            <h2>Sản phẩm tương tự</h2>
            <ul>
                <li><a href="#">iPhone 15 Pro</a></li>
                <li><a href="#">Samsung S24</a></li>
            </ul>
        </aside>

    </main>

    <footer>
        <p>&copy; 2026 Shop TLU. All rights reserved.</p>
        <address> Liên hệ: <a href="mailto:contact@tlu.edu.vn">contact@tlu.edu.vn</a>
        </address>
    </footer>

</body>
</html>
```

## Câu C2:
Quan điểm “dùng `<div>` cho mọi thứ rồi thêm class là đủ” nghe có vẻ tiện, nhưng về lâu dài lại gây nhiều bất lợi.

Thứ nhất là SEO (tối ưu công cụ tìm kiếm). Các thẻ semantic như `<header>`, `<nav>`, `<main>`, `<article>`, `<section> `giúp công cụ tìm kiếm hiểu rõ cấu trúc và nội dung trang. Nếu tất cả đều là `<div>`, bot phải “đoán” ý nghĩa, dẫn đến việc index kém chính xác hơn. Một trang có cấu trúc rõ ràng thường được đánh giá cao hơn về mức độ liên quan và chất lượng nội dung.

Thứ hai là Accessibility (khả năng truy cập). Người dùng sử dụng screen reader (trình đọc màn hình) phụ thuộc vào các thẻ semantic để điều hướng. Ví dụ, họ có thể nhảy nhanh tới `<nav>` hoặc `<main>`. Nếu chỉ dùng `<div>`, trải nghiệm này gần như bị mất, khiến website khó dùng với người khiếm thị.

Ví dụ: khi bạn dùng `<nav aria-label="breadcrumb">` kết hợp `<ol>` cho breadcrumb, screen reader sẽ thông báo đây là “navigation” và danh sách có thứ tự, giúp người dùng hiểu ngay họ đang ở đâu trong hệ thống. Nếu chỉ dùng` <div>` + CSS, thông tin này không được truyền tải.

Tuy vậy, `<div>` vẫn rất cần thiết. Nó phù hợp khi bạn chỉ cần group các phần tử để styling hoặc layout, ví dụ chia grid, flexbox, hoặc bọc nhiều thành phần không mang ý nghĩa nội dung cụ thể.

link videos trong google drive: