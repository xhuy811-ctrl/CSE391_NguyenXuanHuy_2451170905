# PHẦN A - KIỂM TRA ĐỌC HIỂU

## Câu A1: (nguồn tham chiếu:`07_forms_interactive.md`)

1. type="email" → Ô nhập text, tự kiểm tra có @ và domain → Dùng cho form đăng ký, nhận email khách hàng

2. type="password" → Ô nhập ẩn ký tự (•••••), không có validation mặc định → Dùng cho đăng nhập, thanh toán

3. type="text" → Ô nhập văn bản bình thường, không có validation → Dùng cho tên khách hàng, địa chỉ

4. type="number" → Ô nhập số, có nút tăng/giảm, validate số + min/max → Dùng cho số lượng sản phẩm

5. type="tel" → Ô nhập số điện thoại (mobile hiện bàn phím số), không validate chặt → Dùng cho SĐT giao hàng

6. type="url" → Ô nhập link, kiểm tra định dạng URL (http/https) → Dùng cho website cá nhân/seller

7. type="date" → Hiển thị bộ chọn ngày, validate định dạng ngày → Dùng cho chọn ngày giao hàng

8. type="radio" → Nút chọn 1 trong nhiều, có thể required → Dùng cho chọn phương thức thanh toán

9. type="checkbox" → Ô tick chọn nhiều, có thể required → Dùng cho đồng ý điều khoản hoặc chọn nhiều tùy chọn

10. type="file" → Nút upload file, có thể giới hạn loại file → Dùng cho upload ảnh sản phẩm/đánh giá

## Câu A2: (nguồn tham chiếu:`07_forms_interactive.md`)
Trường hợp 1: `<input type="text" required value="">`

- Dự đoán: Trình duyệt hiện thông báo: "Vui lòng điền vào trường này."

- Tại sao: Thuộc tính required đánh dấu đây là trường bắt buộc. Khi giá trị (value) trống, trình duyệt sẽ ngăn không cho gửi form.

Trường hợp 2: `<input type="email" value="abc">`

- Dự đoán: Trình duyệt hiện thông báo: "Vui lòng bao gồm một dấu '@' trong địa chỉ email. 'abc' còn thiếu một dấu '@'."

- Tại sao: type="email" yêu cầu dữ liệu phải tuân thủ định dạng email. Chuỗi "abc" vi phạm quy tắc này vì không có ký tự @.

Trường hợp 3: `<input type="number" min="1" max="10" value="15">`

- Dự đoán: Trình duyệt hiện thông báo: "Giá trị phải nhỏ hơn hoặc bằng 10."

- Tại sao: Thuộc tính max="10" thiết lập giới hạn trên cho con số được nhập. Giá trị 15 vượt quá giới hạn này nên không hợp lệ.

Trường hợp 4: `<input type="text" pattern="[0-9]{10}" value="abc123">`

- Dự đoán: Trình duyệt hiện thông báo: "Vui lòng khớp với định dạng được yêu cầu."

- Tại sao: pattern="[0-9]{10}" là một biểu thức chính quy yêu cầu đúng 10 chữ số (từ 0-9). Chuỗi "abc123" chứa ký tự chữ và sai độ dài nên bị chặn.

Trường hợp 5: `<input type="password" minlength="8" value="123">`

- Dự đoán: Trình duyệt hiện thông báo: "Vui lòng kéo dài văn bản này thành 8 ký tự trở lên (hiện bạn đang sử dụng 3 ký tự)."

- Tại sao: minlength="8" quy định số lượng ký tự tối thiểu phải nhập. Vì "123" chỉ có 3 ký tự, nó chưa đủ độ dài an toàn theo thiết lập.

## Câu A3: Accessibility (nguồn tham chiếu: Accessibility trong chương 07)

1. Tại sao <label for="email"> quan trọng cho người dùng Screen Reader?
- Dự đoán: Khi người dùng focus vào ô nhập liệu, Screen Reader sẽ đọc to: "Email, edit text".
- Tại sao: Thuộc tính for liên kết logic với id của input. Nếu thiếu, máy đọc chỉ báo là "ô nhập văn bản" mà không rõ mục đích, khiến người khiếm thị không biết phải điền gì.

2. Khi nào dùng <fieldset> + <legend>? Cho ví dụ cụ thể.
- Sử dụng: Dùng để nhóm các ô nhập liệu có liên quan mật thiết (như nhóm Radio buttons hoặc thông tin địa chỉ) để tạo ngữ cảnh chung.
- Ví dụ cụ thể:
```html
<fieldset>
    <legend>Chọn phương thức thanh toán</legend>
    <input type="radio" id="visa" name="pay"><label for="visa">Thẻ Visa</label>
    <input type="radio" id="cod" name="pay"><label for="cod">Tiền mặt</label>
</fieldset>
```
3. aria-label dùng khi nào? Tại sao KHÔNG nên dùng khi đã có `<label>`?
- Dùng khi giao diện không thể hiển thị văn bản nhãn và muốn nút đó có hình ảnh,aria-label sẽ giúp máy đọc hiểu được chức năng của nút.
- Gây nhiễu: Khi có cả hai, trình đọc màn hình có thể bị "bối rối" hoặc đọc lặp lại thông tin không cần thiết.

## Câu A4: (nguồn tham chiếu:`06_graphics_multimedia.md`)

**1. Thuộc tính loading="lazy" trên thẻ <img>**
- **Giải thích:** Đây là kỹ thuật "lười tải", chỉ cho phép hình ảnh được tải xuống khi người dùng cuộn trang đến gần vị trí của ảnh đó.
- **Cải thiện:** Giúp giảm thời gian tải trang ban đầu, tiết kiệm băng thông và tăng hiệu suất (Performance) cho website.
- **Khi nào KHÔNG nên dùng:** Không dùng cho những ảnh nằm ở phần đầu trang (Above the fold) mà người dùng thấy ngay khi vừa mở web, vì nó sẽ làm ảnh hiện ra chậm hơn (gây trễ LCP).

**2. Thẻ <video> và các định dạng**
- **Tại sao dùng nhiều <source>:** Để đảm bảo tính tương thích. Mỗi trình duyệt hỗ trợ các bộ giải mã (codec) khác nhau, trình duyệt sẽ tự chọn định dạng đầu tiên mà nó hỗ trợ để phát.
- **3 format video web phổ biến:** 
    1. MP4 (phổ biến nhất, tương thích mọi nơi).
    2. WebM (nén tốt hơn, chất lượng cao, mã nguồn mở).
    3. Ogg (định dạng tự do, ít dùng hơn nhưng vẫn quan trọng).

**3. Thuộc tính alt trên <img> và cách viết tốt**
- **Công dụng:** Cung cấp văn bản thay thế nếu ảnh lỗi không hiển thị và giúp trình đọc màn hình (Screen Reader) mô tả ảnh cho người khiếm thị.
- **Viết alt cho 3 trường hợp:**
    1. **Ảnh iPhone 16:** `alt="Điện thoại iPhone 16 Pro màu Titan Sa mạc mặt trước và sau"` (Mô tả chi tiết sản phẩm).
    2. **Ảnh trang trí:** `alt=""` (Để trống để trình đọc màn hình bỏ qua, không gây nhiễu).
    3. **Ảnh biểu đồ doanh thu Q1/2026:** `alt="Biểu đồ cột cho thấy doanh thu Q1/2026 tăng trưởng 15% so với cùng kỳ năm ngoái"` (Tóm tắt thông tin quan trọng nhất của biểu đồ).

## Câu A5: (nguồn tham chiếu:`06_graphics_multimedia.md`)
1. Cách 1: Chỉ dùng thẻ `<img>`
- Đặc điểm: Đây là cách dùng ảnh đơn thuần. Nó chỉ nhúng một tệp hình ảnh vào trang web mà không có bất kỳ giải thích hay chú thích đi kèm nào hiển thị trên màn hình.

- Khi nào dùng: Dùng cho các hình ảnh đóng vai trò là một phần của nội dung hoặc trang trí, không cần có chú thích văn bản bên dưới để giải thích ý nghĩa.

- Ví dụ thực tế: Ảnh Avatar người dùng trong phần profile, ảnh đại diện chỉ cần hiển thị, tên người dùng đã có thẻ `<h2>` hoặc `<span>` riêng bên cạnh, không cần chú thích "Đây là ảnh đại diện".

2. Cách 2: Dùng `<figure>` kết hợp `<figcaption>`
- Đặc điểm: Đây là cách dùng ảnh theo cụm nội dung. Thẻ `<figure>` bao bọc ảnh, và `<figcaption>` cung cấp một chú thích hiển thị rõ ràng cho bức ảnh đó.

- Khi nào dùng: Dùng khi hình ảnh là một đơn vị nội dung độc lập (như minh họa, sơ đồ, ảnh sản phẩm) mà nếu nhấc cả cụm này đặt sang chỗ khác trong bài viết, nội dung chính vẫn không bị ảnh hưởng. Nó giúp người dùng (và Google) hiểu rõ mối liên hệ giữa ảnh và dòng chú thích đi kèm.

- Ví dụ thực tế: Ảnh sản phẩm đi kèm với tên và giá ngay bên dưới. Việc dùng `<figure>` giúp nhóm chúng lại thành một khối thống nhất.
```html
<figure>
    <img src="product.jpg" alt="iPhone 16 Pro Max 256GB Titan">
    <figcaption>iPhone 16 Pro Max — 25.990.000đ</figcaption>
</figure>
```

# PHẦN B - THỰC HÀNH CODE
## Bài B1: Giải thích trong answers.md tại sao HTML không thể validate confirm password
- HTML chỉ kiểm tra từng ô độc lập: Các thuộc tính như required, pattern, hay minlength chỉ kiểm tra nội dung bên trong chính ô input đó có hợp lệ với quy tắc đặt ra hay không.
- Thiếu logic so sánh: HTML không có khả năng "nhìn" sang ô input khác để so sánh giá trị. Việc kiểm tra xem ô "Xác nhận mật khẩu" có khớp 100% với ô "Mật khẩu" hay không đòi hỏi một phép toán logic .
- Giải pháp: Để thực hiện việc này, chúng ta bắt buộc phải dùng JavaScript (để so sánh giá trị khi người dùng gõ) hoặc kiểm tra ở phía Server (Backend) sau khi form được gửi đi.

# PHẦN C — PHÂN TÍCH & SUY LUẬN 
## Câu C1:
```
Lỗi 1: Dòng 2 — Input "Tên" không có <label>, id, name và required
Sửa: <label for="name">Tên:</label> <input type="text" id="name" name="name" required>

Lỗi 2: Dòng 4 — Input email không có <label>, id, name và required
Sửa: <label for="email">Email:</label> <input type="email" id="email" name="email" required>

Lỗi 3: Dòng 6 — Input password (mật khẩu) không có <label>, id, name và required
Sửa: <label for="password">Mật khẩu:</label> <input type="password" id="password" name="password" required>

Lỗi 4: Dòng 7 — Input password (nhập lại) không có <label>, id, name và required
Sửa: <label for="confirm_password">Nhập lại mật khẩu:</label> <input type="password" id="confirm_password" name="confirm_password" required>

Lỗi 5: Dòng 9 — Input phone không có <label>, type="tel", id, name
Sửa: <label for="phone">Phone:</label> <input type="tel" id="phone" name="phone" value="0901234567">

Lỗi 6: Dòng 11-14 — Select không có <label>, id, name
Sửa: <label for="city">Thành phố:</label> <select id="city" name="city">...

Lỗi 7: Dòng 16-18 — Label không có checkbox input, không liên kết
Sửa: <label><input type="checkbox" id="agree" name="agree" required> Tôi đồng ý điều khoản</label>
```

## Câu C2:
## Câu C2: Thiết kế chiến lược Validation

**1. Viết pattern regex**
- **CMND/CCCD (12 chữ số):** `pattern="[0-9]{12}"`
- **Số tài khoản (10-15 chữ số):** `pattern="[0-9]{10,15}"`
- **PIN (6 chữ số, ẩn):** `type="password" pattern="[0-9]{6}"`

**2. HTML5 validation đủ an toàn cho ứng dụng ngân hàng chưa? Tại sao?**
- **Trả lời:** KHÔNG đủ an toàn.
- **Tại sao:** HTML5 validation dễ dàng bị bypass (vượt qua) bằng cách sử dụng "Inspect Element" để xóa thuộc tính, sử dụng Postman để gửi request trực tiếp, hoặc tắt JavaScript trên trình duyệt. Đối với ngân hàng, đây chỉ là lớp hỗ trợ trải nghiệm người dùng (UX), không phải lớp bảo mật.

**3. 3 loại validation HTML5 KHÔNG THỂ làm được (phải dùng JavaScript)**
- **Kiểm tra tính duy nhất (Availability Check):** Ví dụ kiểm tra xem số tài khoản hoặc email đã tồn tại trong database hay chưa.
- **Xác thực phụ thuộc (Dependent Validation):** Ví dụ ô "Nhập lại mã PIN" phải khớp hoàn toàn với ô "Mã PIN" đã nhập trước đó.
- **Kiểm tra độ mạnh mật khẩu phức tạp:** Ví dụ kiểm tra mã PIN không được là số tiến (123456) hoặc ngày sinh của người dùng.

**4. 2 rủi ro bảo mật nếu chỉ validate trên Frontend mà không có Backend**
- **Dữ liệu rác/Độc hại (Data Corruption & SQL Injection):** Kẻ tấn công có thể gửi các đoạn mã script hoặc dữ liệu sai định dạng gây hỏng cơ sở dữ liệu hoặc chiếm quyền điều khiển hệ thống.
- **Gian lận giao dịch:** Nếu không kiểm tra số dư hoặc quyền hạn ở Backend, kẻ gian có thể chỉnh sửa số tiền gửi đi trong request, dẫn đến thất thoát tài sản của ngân hàng.

Link videos trong google drive: