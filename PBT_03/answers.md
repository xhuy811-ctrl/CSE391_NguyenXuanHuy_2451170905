## PHẦN A - KIỂM TRA ĐỌC HIỂU
# Câu A1 — 3 Cách nhúng CSS
1. Inline CSS
- CSS viết trực tiếp trong thẻ HTML bằng thuộc tính `style` .
- Vd: '<p style = "color : red ; font-size: 20px;">Xin chào </p>
-Ưu điểm: Nhanh, đơn giản,dùng ngay cho 1 phần tử
-Nhược điểm : Code khó đọc khi nhiều CSS ,khó tái sử dụng ,khó bảo trì
-Khi nên dùng : test nhanh ,chỉnh 1 phần tử nhỏ , demo đơn giản
2. Internal CSS
- CSS viết trong thẻ `<style>` bên trong file HTML.
- VD:
```html
<!DOCTYPE html>
<html>
<head>
    <style>
        p{
            color : blue ;
            font-size : 20px ;
        }
    </style>
</head>

<body>
    <p>Xin chào</p>\
</body>
</html>
```
- Ưu điểm : Quản lý CSS dễ hơn inline , không cần file riêng , áp dụng cho nhiều phần tử . 
- Nhược điểm : HTML dài và rối nếu CSS nhiều , không tái sử dụng cho nhiều trang .
- Khi nên dùng : Website nhỏ  , trang đơn , bài tập học HTML/CSS.
3. External CSS
- CSS viết ở dang jfile riêng `.css` rồi liên kết với HTML bằng đường `<link>` . 
-VD :
HTML:
```html
<!DOCTYPE html>
<html>
<head>
    <link rel = "stylesheet" href = "style.css " >
</head>

<body>
    <p>Xin chào</p>
</body>
</html>
```
CSS:
```css
p{
    color : green ; 
    font-size : 20px ; 
}
```
- Ưu điểm : code sạch , chuyên nghiệp , dễ bảo trì , tái sử dụng cho nhiều trang , tải nhanh hơn nhờ cache .
- Nhược điểm : Cần tạo file riêng , hơi phức tạp với người mới 
- Nên dùng khi : website thật , dự án lớn , nhiều trang HTML dùng chung CSS

# Câu A2 :
```css 
1. h1                    → Chọn: <h1>ShopTLU</h1>
2. .price                → Chọn: <p class="price">25.990.000đ</p>
                                 <p class="price">45.990.000đ</p>
3. #app header           → Chọn: <header class="top-bar dark">... </header>
4. nav a:first-child     → Chọn: <a href="/" class="active">Home</a>
5. .product.featured h2  → Chọn: <h2>MacBook Pro</h2>
6. article > p           → Chọn: <p class="price">25.990.000đ</p>
                                <p>Mô tả sản phẩm...</p>
                                <p class="price">45.990.000đ</p>
                                <p>Mô tả sản phẩm...</p>
7. a[href="/"]           → Chọn: <a href="/" class="active">Home</a>
8. .top-bar.dark h1      → Chọn: <h1>ShopTLU</h1>
```

# Câu A3 :
```css
/* Trường hợp 1: content-box (mặc định) */
.box-1 {
    width : 400px;
    padding : 20px;
    border : 5px solid back ;
    margin : 10px; 
}
```
→ Chiều rộng hiển thị = 400 + 20*2 + 5*2 = 450px
→ Không gian chiếm trên trang = 450 + 10*2 = 470px

```css
/* Trường hợp 2: border-box */
.box-2 {
    box-sizing: border-box;
    width: 400px;
    padding: 20px;
    border: 5px solid black;
    margin: 10px;
}
```
→ Chiều rộng hiển thị = 400px (bao gồm cả padding và border)
→ Kích thước content thực tế = 400 - 20*2 - 5*2 = 350px
→ Không gian chiếm trên trang = 400 + 10*2 = 420px

```css
/* Trường hợp 3: Margin collapse */
.box-a { margin-bottom: 25px; }
.box-b { margin-top: 40px; }
→ Khoảng cách giữa box-a và box-b = 40px;
→ Giải thích tại sao KHÔNG PHẢI 65px : Hai block đứng dọc nhau nên margin dọc sẽ bị collapse(gộp lại) CSS sẽ lấy margin lớn hơn ; max(25, 40) = 40px.
```
Nâng cao: Nếu .box-a có margin-bottom: -10px và .box-b có margin-top: 40px, khoảng cách = 30px , Khi margin collapse có số âm CSS không lấy max() nữa nó dùng công thức : margin lớn nhất + margin nhỏ nhất.

# Câu A4 :
1. Tính specificity score (a, b, c) cho mỗi rule

| Quy tắc | Selector | ID (a) | Class (b) | Tag (c) | Tổng điểm (Score) |
| :--- | :--- | :---: | :---: | :---: | :--- |
| **Rule A** | `p` | 0 | 0 | 1 | 1 |
| **Rule B** | `.price` | 0 | 1 | 0 | 10 |
| **Rule C** | `#main-price` | 1 | 0 | 0 | 100 |
| **Rule D** | `p.price` | 0 | 1 | 1 | 11 |

2. Element sẽ có màu đỏ.Giải thích:Trình duyệt so sánh từ trái sang phải. Rule C có 1 ID, trong khi tất cả các rule còn lại đều có 0 ID. Vì cột ID "nặng đô" nhất nên Rule C thắng tuyệt đối, bất kể các rule khác có bao nhiêu Class hay Tag đi nữa.

3. Nếu thêm `<p class="price" id="main-price" style="color: orange;">`, element có màu cam

4. Nếu Rule A thêm `!important`, element có màu đỏ. Tại điểm này, Rule A có độ ưu tiên cao nhất do có `!important`, bất kể Rule C có ID hay không. Tuy nhiên, nếu cả Rule A và Rule C đều có `!important`, thì Rule C sẽ thắng vì nó có ID, trong khi Rule A chỉ là một tag selector.

## PHẦN B - THỰC HÀNH CODE 
# Câu B2 : 
```
Hộp 1 (content-box): chiều rộng thực tế = 350px (đo từ DevTools)
Hộp 2 (border-box): chiều rộng thực tế =  300px (đo từ DevTools)
Giải thích sự khác biệt: Với `content-box` , kích thước `width` chỉ tính cho phần nội dung , khiến hộp bị nở ra khi thêm padding/border . Với `border-box` , `width` là kích thước cuối cùng của hộp , giúp kiểm soát layout chính xác và dễ dàng hơn.  
```
# Câu B3:
1 . Liệt kê 10 rules + specificity score 
```css
* : 0,0,0

p : 0,0,1

.text : 0,1,0

.text.highlight : 0,2,0

[id="demo"].text : 0,2,0 (Viết sau nên thắng rule 4)

#demo : 1,0,0

p#demo : 1,0,1

#demo.text : 1,1,0

#demo.text.highlight : 1,2,0

p#demo.text.highlight : 1,2,1
```
2. Element có màu đen. Giải thích: Rule p#demo.text.highlight có điểm Specificity cao nhất (1,2,1). Trong CSS, trình duyệt sẽ chọn quy tắc có độ ưu tiên cao nhất để áp dụng, các quy tắc thấp hơn sẽ bị ghi đè (overwritten).
4. Kết quả không đổi,nếu các rule có điểm Specificity khác nhau. Rule có điểm cao hơn luôn thắng dù nó nằm ở đầu hay cuối file.


## PHẦN C — DEBUG & SUY LUẬN
# Câu C1 :
1.
- Chiều rộng thực tế của sidebar = 300px + 40px + 2px = 342px ; 
- Chiều rộng thực tế của content = 660px + 60px + 2px = 722px ; 
2. Tại sao layout bị vỡ : Tổng chiều rộng sidebar và content là 342px + 722px = 1064px > container 960px không đủ chỗ trống trên 1 hàng nên trình duyệt bắt buộc phải phải đẩy phần tử thứ hai (`.container`) xuống dòng dưới 
3.
Cách 1 : dùng `box-sizing`: `border-box`
- Cách này thay đổi cách tính Box Model sao cho `width` bao gồm cả padding và border. Điều này giúp việc tính toán cực kỳ đơn giản. 
- Logic: Giữ nguyên `width` sao cho 300 + 660 = 960.
- CSS: Thêm box-sizing: border-box; cho các phần tử.
Cách 2 : dùng không dùng border-box 
- Tính toán lại width thủ công (Nếu vẫn dùng content-box)
 Sidebar: width = 300 - 20 - 20 - 1 - 1 = 258px
 Content: width = 660 - 30 - 30 - 1 - 1 = 598px
Lúc này: 258 + 42 (phần dư) = 300px; 598 + 62 (phần dư) = 660px. Tổng = 960px .
# Câu C2 : 
1.
- "Sản phẩm A" (h2): font-size = 20px, color = green
- Giải thích : 
Về font-size:
    -Có selector nhắm trực tiếp: .card .title có độ đặc hiệu là (0, 2, 0).
    -Do đó, nó thắng các giá trị được thừa kế từ .container (14px) hay body (16px).
    -Kết quả: font-size = 20px.
Về color:
    -Có 2 selector nhắm vào màu sắc của nó: #featured .title có độ đặc hiệu là (1, 1, 0) và .highlight có độ đặc hiệu là (0, 1, 0).
    -Thông thường, #featured .title sẽ thắng tuyệt đối vì có ID. Tuy nhiên, thuộc tính .highlight { color: green !important; } sử dụng cờ !important.
    -Trong CSS Cascade, cờ !important có quyền năng tối cao, phá vỡ mọi quy tắc tính điểm độ đặc hiệu thông thường.
    -Kết quả: color = green.
2.
- "Mô tả sản phẩm" (p trong card featured): color = blue
3.
- "Sản phẩm B" (h2): font-size = 20px, color = #333 (màu mặc định của body) hoặc chính xác hơn là phụ thuộc vào User Agent Stylesheet của trình duyệt nếu không bị ghi đè, tuy nhiên ở đây nó ăn theo cơ chế cascade trực tiếp là màu đen/xám tối từ body thông qua inheritance nếu không có selector chỉ định. Hãy xem chi tiết bên dưới.