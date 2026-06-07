## 🅱️ TRACK A — BOOTSTRAP 5

### PHẦN A — ĐỌC HIỂU (20 điểm)

#### Câu A1 (10đ) — Grid System

Đọc tài liệu Grid System (12 cột). Layout cho HTML chứa 4 box ở 3 kích thước:

| Kích thước    | Số cột (grid) | Bố cục các Box                                                                 |
| ------------- | ------------: | ------------------------------------------------------------------------------ |
| < 768px       |            12 | Mỗi box chiếm toàn bộ hàng (col-12) — xếp dọc: Box1, Box2, Box3, Box4          |
| 768px - 991px |            12 | Dùng `col-md-6` → 2 cột/row: [Box1 Box2] trên hàng 1, [Box3 Box4] trên hàng 2  |
| ≥ 992px       |            12 | Dùng `col-lg-3` → 4 cột/row: [Box1 Box2 Box3 Box4] (cả 4 box trên cùng 1 hàng) |

Câu hỏi thêm: `col-md-6` nghĩa là ở điểm ngắt `md` (>=768px) và lớn hơn, phần tử chiếm 6/12 cột (tức 50% chiều rộng). Không cần viết `col-sm-12` vì khi chỉ định `col-md-6`, các kích thước nhỏ hơn `md` mặc định sẽ xếp chồng (stack) và chiếm toàn bộ hàng — hành vi này là mặc định của hệ thống grid (classes áp dụng từ breakpoint được chỉ định trở lên).

#### Câu A2 (10đ) — Utilities & Components

1. `d-none d-md-block`

- `d-none` đặt `display: none` ở mọi breakpoint (ẩn mặc định).
- `d-md-block` đặt `display: block` từ breakpoint `md` trở lên (>=768px).
- Kết luận: phần tử **ẩn** trên màn nhỏ (`xs`, `sm` <768px) và **hiển thị block** trên `md`, `lg`, `xl` (>=768px).

2. Năm spacing utilities (margin/padding) và ý nghĩa:

- `mt-3`: margin-top theo scale (ví dụ trong Bootstrap 5 `mt-3` tương đương `margin-top: 1rem`).
- `px-4`: padding-left và padding-right theo scale (x-axis padding).
- `mb-auto`: margin-bottom: auto (thường dùng để đẩy phần tử chiếm không gian còn lại trong flexbox).
- `mx-2`: margin-left và margin-right (horizontal margin) theo scale.
- `py-1`: padding-top và padding-bottom (vertical padding) nhỏ.

Ghi chú: các lớp có dạng `{m|p}{t|b|s|e|x|y|-}{0|1|2|3|4|5|auto}` — m/p = margin/padding; t/b/s/e = top/bottom/start/end; x/y = horizontal/vertical; số là độ lớn theo hệ số của framework.

3. Khác nhau giữa `.container`, `.container-fluid`, `.container-md`:

- `.container`: container responsive có chiều rộng cố định thay đổi theo các breakpoint (tức có max-width tùy breakpoint), không chiếm 100% luôn.
- `.container-fluid`: luôn chiếm toàn bộ chiều rộng (width: 100%) ở mọi breakpoint.
- `.container-md`: là container cụ thể cho breakpoint `md`: nó **là fluid (100%) dưới md**, và **có chiều rộng cố định từ md trở lên** — tức container trở nên fixed-width khi >= md.

### PHẦN C — PHÂN TÍCH (20 điểm)

#### Câu C1 (10đ) — Tùy biến Bootstrap

1. **Quy trình:** Cần công cụ biên dịch SASS (như Live Sass Compiler). Tạo file `.scss`, khai báo `$primary: #E63946;` trước khi `@import "bootstrap"`, sau đó biên dịch ra file `.css`.
2. **Tại sao dùng SASS?** Giúp thay đổi đồng bộ (nút, link, alert tự đổi màu theo) và giữ code sạch, tránh lạm dụng `!important` để ghi đè CSS thủ công.

#### Câu C2 (10đ) — So sánh

1. **So sánh:**
   - **CSS thuần:** Viết nhiều dòng code, tốn thời gian tự chỉnh responsive, nhưng tự do tùy biến.
   - **Bootstrap:** Code cực ngắn (dùng class), dev rất nhanh, responsive có sẵn nhưng UI dễ bị rập khuôn.
2. **Nên dùng:** Dự án cần nhanh (MVP), trang quản trị (Admin), làm việc nhóm cần quy chuẩn.
3. **Không nên dùng:** Website có thiết kế độc bản, sáng tạo cao hoặc yêu cầu dung lượng file CSS phải cực nhẹ.

## 🌊 TRACK B — TAILWINDCSS

#### Câu A1 (10đ) — Utility Classes

Ví dụ HTML (Tailwind classes):

```html
<div class="flex items-center p-4 bg-white rounded-lg shadow">
  <img src="avatar.jpg" alt="User" class="w-12 h-12 rounded-full mr-4" />
  <div class="flex-1">
    <div class="font-semibold text-gray-900">Nguyễn Văn A</div>
    <div class="text-sm text-gray-500">Frontend Developer</div>
  </div>
  <button
    class="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded"
  >
    Follow
  </button>
</div>
```

Giải thích các class (theo format yêu cầu):

- flex → display: flex
- items-center → align-items: center
- p-4 → padding: 1rem (16px)
- bg-white → background-color: #ffffff
- rounded-lg → border-radius: 0.5rem
- shadow → box-shadow (một shadow chuẩn của Tailwind)
- w-12 → width: 3rem (48px)
- h-12 → height: 3rem (48px)
- rounded-full → border-radius: 9999px (circular)
- mr-4 → margin-right: 1rem (16px)
- flex-1 → flex: 1 1 0% (chiếm không gian còn lại)
- font-semibold → font-weight: 600
- text-gray-900 → color: #111827 (dark gray)
- text-sm → font-size: 0.875rem (14px)
- text-gray-500 → color: #6B7280 (muted gray)
- bg-blue-500 → background-color: #3B82F6
- hover:bg-blue-600 → on hover: background-color: #2563EB
- text-white → color: #ffffff
- font-medium → font-weight: 500
- py-2 → padding-top/bottom: 0.5rem (8px)
- px-4 → padding-left/right: 1rem (16px)
- rounded → border-radius: 0.25rem

Ghi chú: một số giá trị màu/radius/spacing là giá trị tham chiếu trong Tailwind và có thể khác nhẹ tuỳ cấu hình theme.

#### Câu A2 (10đ) — Responsive & States

1. Prefix responsive `md:`, `lg:`, `xl:` — áp lớp chỉ từ breakpoint tương ứng trở lên. Ví dụ: `md:grid-cols-2 lg:grid-cols-4` nghĩa là:

- Ở viewport < `md` (mobile): không áp `grid-cols-*` (mặc định 1 cột hoặc theo cấu trúc hiện có).
- Ở `md` (>=768px) trở lên: áp `grid-cols-2` (2 cột).
- Ở `lg` (>=1024px) trở lên: ghi đè bằng `grid-cols-4` (4 cột).

2. State modifiers:

- `hover:` → áp style khi phần tử ở trạng thái `:hover` (di chuột lên).
- `focus:` → áp style khi phần tử có `:focus` (tập trung, ví dụ từ bàn phím hoặc click).
- `active:` → áp style khi phần tử ở trạng thái `:active` (đang nhấn giữ chuột/touch).
- `group-hover:` → áp style cho phần tử khi container cha có class `group` và đang `:hover`; dùng để thay đổi nhiều phần tử phụ thuộc vào trạng thái hover của nhóm.

3. Class Tailwind cho "Ẩn trên mobile, hiện dạng flex trên tablet trở lên":

- `hidden md:flex` (tương đương `d-none d-md-flex` của Bootstrap)

Ghi chú: breakpoints mặc định Tailwind: `sm`=640px, `md`=768px, `lg`=1024px, `xl`=1280px, `2xl`=1536px — có thể cấu hình lại trong `tailwind.config.js`.
