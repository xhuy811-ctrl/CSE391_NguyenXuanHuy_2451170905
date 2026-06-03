### PHẦN A — ĐỌC HIỂU (20 điểm)

#### Câu A1 (10đ) — Grid System

Đọc tài liệu Grid System (12 cột). Layout cho HTML chứa 4 box ở 3 kích thước:

| Kích thước | Số cột (grid) | Bố cục các Box |
|---|---:|---|
| < 768px | 12 | Mỗi box chiếm toàn bộ hàng (col-12) — xếp dọc: Box1, Box2, Box3, Box4 |
| 768px - 991px | 12 | Dùng `col-md-6` → 2 cột/row: [Box1 Box2] trên hàng 1, [Box3 Box4] trên hàng 2 |
| ≥ 992px | 12 | Dùng `col-lg-3` → 4 cột/row: [Box1 Box2 Box3 Box4] (cả 4 box trên cùng 1 hàng) |

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


