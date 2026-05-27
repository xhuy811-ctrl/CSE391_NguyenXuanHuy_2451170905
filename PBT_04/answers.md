# Phần A :

## Câu A1 — 5 Loại Positioning

| Position   | Vẫn chiếm chỗ trong flow?           | Tham chiếu vị trí                                                                                  | Cuộn theo trang?                                                                                                                                                                                                  | Use case                                                                   |
| ---------- | ----------------------------------- | -------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------- |
| `static`   | Có, ở vị trí bình thường trong flow | Không dùng `top/right/bottom/left`, vị trí mặc định theo flow                                      | Có                                                                                                                                                                                                                | Layout mặc định, phần tử không cần định vị đặc biệt                        |
| `relative` | Có, vẫn giữ chỗ trong flow          | Dựa trên vị trí ban đầu của chính nó trong flow                                                    | Có                                                                                                                                                                                                                | Dịch chuyển nhẹ phần tử so với vị trí gốc mà không làm đổi flow xung quanh |
| `absolute` | Không, không chiếm chỗ trong flow   | Dựa trên `nearest positioned ancestor` (không `static`); nếu không có thì dựa trên `body`/viewport | Không, không cuộn theo trang nếu trong body? Thực ra phần tử vẫn di chuyển khi trang cuộn nếu nằm trong container có vị trí cố định với viewport, nhưng nếu không có ancestor cố định thì nó di chuyển cùng trang | Hiển thị popup, tooltip, overlay, đặt chính xác phần tử trong container    |
| `fixed`    | Không, không chiếm chỗ              | Dựa trên viewport (hay `browser window`)                                                           | Không, cố định trong viewport khi cuộn                                                                                                                                                                            | Header/fixed bar, button luôn hiện, thanh điều hướng cố định               |
| `sticky`   | Có, chiếm chỗ ban đầu               | Dựa trên vị trí bình thường trong flow, sau đó trở thành cố định khi cuộn tới ngưỡng               | Có, nhưng khi dính thì nó cố định với viewport cho đến khi container cha hết                                                                                                                                      | Header sticky, bảng tiêu đề dính, điều hướng bên khi cuộn                  |

### Giải thích thêm

- `absolute` tham chiếu tới `body` khi không có ancestor được định vị (position khác `static`). Khi phần tử cha có `position: relative|absolute|fixed|sticky`, đó là `nearest positioned ancestor` và `absolute` sẽ định vị relative so với nó.
- `nearest positioned ancestor` nghĩa là phần tử cha gần nhất trong cây DOM có `position` khác `static`. Nếu không có, `body` hoặc viewport được dùng làm tham chiếu.

### Ghi chú

- `static` là giá trị mặc định.
- `relative` thay đổi vị trí hiển thị nhưng vẫn giữ chỗ trong layout.
- `absolute` và `fixed` không chiếm chỗ, nên phần tử khác có thể lấp vào khoảng trống.
- `sticky` là sự kết hợp: ban đầu theo flow, sau đó cố định khi cuộn đến vị trí xác định.

## Câu A2 — Flexbox vs Grid

### Trường hợp 1

.container { display: flex; }
.item { flex: 1; }
4 items → Bố cục: một hàng, 4 cột bằng nhau.

Diagram:
[Item1][Item2][Item3][Item4]

### Trường hợp 2

.container { display: flex; flex-wrap: wrap; }
.item { width: 45%; margin: 2.5%; }
6 items → Bố cục: 3 hàng, mỗi hàng 2 cột.

Diagram:
[Item1][Item2]
[Item3][Item4]
[Item5][Item6]

### Trường hợp 3

.container { display: flex; justify-content: space-between; align-items: center; }
3 items → Bố cục: một hàng, 3 items dàn đều chiều ngang, căn giữa chiều dọc.

Diagram:
[Item1] [Item2] [Item3]

### Trường hợp 4

.container { display: grid; grid-template-columns: 200px 1fr 200px; gap: 20px; }
3 items → Bố cục: một hàng với 3 cột, cột giữa co dãn còn 2 cột bên cố định 200px.

Diagram:
[Item1:200px] [Item2:1fr] [Item3:200px]

### Trường hợp 5

.container { display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px; }
7 items → Bố cục: 3 cột, 3 hàng. Item cuối nằm ở hàng thứ 3 cột 1, hàng 3 cột 2 và 3 trống.

Diagram:
[Item1][Item2][Item3]
[Item4][Item5][Item6]
[Item7][ ][ ]

# Phần C :

## Câu C1 (10đ) — Flexbox vs Grid: Khi nào dùng gì?

### 1. Navigation bar ngang (logo + menu + buttons)
**Dùng: Flexbox**

**Giải thích:**
- Navigation là **một chiều** (horizontal line).
- Cần **căn chỉnh linh hoạt**: logo bên trái, menu ở giữa, buttons bên phải.
- Flexbox với `justify-content` và `align-items` phù hợp hoàn hảo.
- Dễ quản lý khoảng cách giữa các phần tử với `gap`, `margin`, `space-between`.

**Code mẫu:**
```css
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 20px;
}

.logo { flex: 0 0 auto; }
.menu { flex: 1; display: flex; gap: 20px; }
.buttons { flex: 0 0 auto; }
```

---

### 2. Lưới ảnh Instagram (3 cột đều nhau, số ảnh không biết trước)
**Dùng: Grid**

**Giải thích:**
- Cần **fixed number of columns** (3 cột = 2 chiều).
- Số hàng không xác định → Grid tự động tạo hàng mới.
- Grid với `grid-template-columns: repeat(3, 1fr)` tự động wrap items.
- Flexbox phải dùng `flex-wrap` + tính toán width, dễ gây lỗi.

**Code mẫu:**
```css
.gallery {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
}

.photo { object-fit: cover; aspect-ratio: 1; }
```

**Responsive:**
```css
@media (max-width: 768px) {
  .gallery {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 480px) {
  .gallery {
    grid-template-columns: 1fr;
  }
}
```

---

### 3. Layout blog: main content + sidebar
**Dùng: Grid (hoặc Flexbox, nhưng Grid tốt hơn)**

**Giải thích:**
- **2 chiều**: main content (lớn) ở bên trái, sidebar (nhỏ) ở bên phải.
- Grid: `grid-template-columns: 2fr 1fr` rõ ràng và dễ điều chỉnh.
- Flexbox cũng được nhưng cần `flex: 2` và `flex: 1` + `align-items: flex-start`.

**Code mẫu (Grid - tốt hơn):**
```css
.blog-container {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 30px;
}

.main-content { /* tự động lấy 2fr */ }
.sidebar { /* tự động lấy 1fr */ }
```

**Code mẫu (Flexbox - cũng được):**
```css
.blog-container {
  display: flex;
  gap: 30px;
}

.main-content { flex: 2; }
.sidebar { flex: 1; align-self: flex-start; }
```

**Responsive:**
```css
@media (max-width: 768px) {
  .blog-container {
    grid-template-columns: 1fr;
  }
}
```

---

### 4. Footer với 4 cột thông tin (Về chúng tôi, Liên kết, Hỗ trợ, Liên hệ)
**Dùng: Grid**

**Giải thích:**
- 4 cột **bằng nhau** → rõ ràng với `grid-template-columns: repeat(4, 1fr)`.
- Grid tự động phân bổ không gian đều cho 4 cột.
- Mỗi cột có tiêu đề + danh sách → 2 chiều trong footer.

**Code mẫu:**
```css
.footer {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
  padding: 40px;
  background: #333;
}

.footer-section h3 { margin-bottom: 15px; }
.footer-section ul { list-style: none; padding: 0; }
.footer-section li { margin-bottom: 10px; }
```

**Responsive:**
```css
@media (max-width: 768px) {
  .footer {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 480px) {
  .footer {
    grid-template-columns: 1fr;
  }
}
```

---

### 5. Card sản phẩm (ảnh trên, text giữa, nút dưới — nút luôn dính đáy)
**Dùng: Kết hợp Grid + Flexbox**

**Giải thích:**
- **Grid cho card ngoài**: `grid-template-rows: auto 1fr auto` (ảnh - content - nút).
- **Flexbox cho text phần**: quản lý paragraph và title.
- Mấu chốt: content (`.description`) phải co dãn (`flex: 1`), nút luôn dưới dùng `align-self: flex-end`.
- Hoặc dùng Grid: `grid-row` 3 nút ở hàng cuối dù text dài hay ngắn.

**Code mẫu (Grid + Flexbox - tốt nhất):**
```css
.product-card {
  display: grid;
  grid-template-rows: auto 1fr auto;
  gap: 15px;
  padding: 15px;
  border: 1px solid #ddd;
  height: 100%; /* quan trọng */
}

.card-image { 
  width: 100%; 
  aspect-ratio: 1; 
  object-fit: cover; 
}

.card-content {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.card-title { font-weight: bold; font-size: 16px; }
.card-description { flex: 1; color: #666; }

.card-button {
  align-self: flex-start;
  padding: 10px 20px;
  background: #007bff;
  color: white;
  border: none;
  cursor: pointer;
}
```

**Hoặc dùng Flexbox (phức tạp hơn):**
```css
.product-card {
  display: flex;
  flex-direction: column;
  gap: 15px;
  padding: 15px;
  border: 1px solid #ddd;
  height: 100%;
}

.card-image { width: 100%; aspect-ratio: 1; }

.card-content {
  flex: 1; /* nội dung co dãn */
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.card-description { flex: 1; } /* text chiếm chỗ trống */

.card-button {
  align-self: flex-start;
  padding: 10px 20px;
  background: #007bff;
  color: white;
  border: none;
  cursor: pointer;
}
```

---

## Tổng kết

| Tình huống | Dùng gì | Lý do |
|-----------|--------|------|
| 1. Navigation bar | **Flexbox** | Một chiều, cần căn chỉnh linh hoạt |
| 2. Instagram grid | **Grid** | Cột fixed, số hàng không biết trước |
| 3. Blog (main + sidebar) | **Grid** (hoặc Flexbox) | Hai chiều, cột cố định |
| 4. Footer 4 cột | **Grid** | Bố cục 2D, 4 cột bằng nhau |
| 5. Product card | **Grid + Flexbox** | Nút phải ở dưới, dù text dài hay ngắn |

**Nguyên tắc chọn:**
- **Flexbox**: Layout **1 chiều** (hàng hoặc cột), căn chỉnh & spacing linh hoạt.
- **Grid**: Layout **2 chiều**, cột/hàng cố định, hoặc phần tử cần tuân theo grid.
- **Kết hợp**: Phần tử cha là Grid/Flexbox, phần tử con là Flexbox/Grid.

---

## Câu C2 — Mô tả và sửa 3 lỗi CSS Layout

### Lỗi 1: Cards không đều chiều cao — nút "Mua" bị nhảy lên/xuống

**❌ Code lỗi:**
```css
.card-container { display: flex; flex-wrap: wrap; }
.card { width: 30%; margin: 1.5%; }
.card img { width: 100%; }
.card h3 { font-size: 18px; }
.card .btn { padding: 10px; }
```

**📌 Nguyên nhân:**
- `display: flex; flex-wrap: wrap;` + `width: 30%; margin: 1.5%;` tạo ra các card có **chiều cao khác nhau**
- Khi text khác nhau (dài/ngắn), card sẽ có chiều cao khác nhau
- Button không bao giờ dính đáy — nó chỉ nằm dưới cùng của text
- Flexbox chỉ "wrap" items sang hàng tiếp theo, không đảm bảo **chiều cao card bằng nhau**

**✅ Giải pháp: Dùng Grid + Flexbox + height 100%**
```css
/* Container: Grid thay vì Flexbox */
.card-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
}

/* Card: Flexbox + height 100% */
.card {
  display: flex;
  flex-direction: column;
  height: 100%;
  border: 1px solid #ddd;
  border-radius: 4px;
  overflow: hidden;
}

.card img {
  width: 100%;
  height: 200px;
  object-fit: cover;
}

/* Content co dãn chiếm chỗ trống */
.card h3,
.card p {
  padding: 15px;
  margin: 0;
}

.card p {
  flex: 1;  /* ← Chiếc khóa: co dãn chiếm chỗ trống */
}

/* Button dính dưới */
.card .btn {
  padding: 12px 15px;
  background: #667eea;
  color: white;
  border: none;
  cursor: pointer;
  margin-top: auto;  /* ← Đẩy button xuống */
}
```

**🎯 Giải thích:**
- `grid-template-columns: repeat(auto-fit, minmax(250px, 1fr))` → Auto-wrap với min width 250px
- `.card { display: flex; flex-direction: column; height: 100%; }` → Card chiếm hết chiều cao
- `.card p { flex: 1; }` → Paragraph co dãn chiếm chỗ trống
- `.card .btn { margin-top: auto; }` → Button bị đẩy xuống dưới cùng

---

### Lỗi 2: Items không nằm giữa dọc — dính góc trái trên

**❌ Code lỗi:**
```css
.hero {
    height: 100vh;
    display: flex;
}
.hero-content {
    text-align: center;
}
```

**📌 Nguyên nhân:**
- `display: flex;` nhưng **thiếu `justify-content` và `align-items`**
- Flexbox mặc định: items từ **trái sang phải**, từ **trên xuống dưới**
- `text-align: center;` chỉ làm **text giữa**, không làm cho **div giữa**
- Không có `justify-content: center;` (ngang) và `align-items: center;` (dọc)

**✅ Giải pháp: Thêm justify-content & align-items**
```css
.hero {
    height: 100vh;
    display: flex;
    justify-content: center;  /* ← Giữa ngang */
    align-items: center;       /* ← Giữa dọc */
}

.hero-content {
    text-align: center;
}
```

**🎯 Giải thích:**
- `justify-content: center;` → Căn giữa các items theo trục chính (ngang trong flex-direction: row)
- `align-items: center;` → Căn giữa các items theo trục phụ (dọc)
- `text-align: center;` → Chỉ căn text, không căn element

---

### Lỗi 3: Sidebar bị co lại khi content quá dài

**❌ Code lỗi:**
```css
.layout { display: flex; }
.sidebar { width: 250px; }
.content { flex: 1; }
```

**📌 Nguyên nhân:**
- Flexbox mặc định có `flex-shrink: 1` (cho phép **co lại**)
- Khi content quá dài hoặc có scroll, sidebar bị "nén" để content có chỗ
- Sidebar được thu nhỏ từ 250px xuống nhỏ hơn
- Cần bảo vệ sidebar khỏi bị co lại

**✅ Giải pháp - Cách 1: flex-shrink: 0**
```css
.layout { 
    display: flex; 
}

.sidebar { 
    width: 250px; 
    flex-shrink: 0;  /* ← Không cho phép co! */
}

.content { 
    flex: 1;
    overflow-y: auto;  /* Content scroll thay vì sidebar co */
}
```

**✅ Giải pháp - Cách 2: flex shorthand**
```css
.layout { 
    display: flex; 
}

.sidebar { 
    flex: 0 0 250px;  /* grow=0, shrink=0, basis=250px */
}

.content { 
    flex: 1;
    overflow-y: auto;
}
```

**🎯 Giải thích:**
- `flex-shrink: 0` → Nói cho sidebar: "Đừng co lại"
- `flex: 0 0 250px` → Viết gọn: grow=0 (không co dãn), shrink=0 (không co), basis=250px (chiều rộng cơ sở)
- `.content { overflow-y: auto; }` → Content scroll thay vì sidebar co

---

## Tổng kết 3 lỗi CSS Layout

| Lỗi | Nguyên nhân | Giải pháp |
|-----|-----------|----------|
| **1. Cards không đều** | Flexbox flex-wrap + width % không đảm bảo chiều cao | Grid + Flexbox + `height: 100%` + `flex: 1` on content |
| **2. Items không center** | Thiếu `justify-content: center` & `align-items: center` | Thêm cả 2 properties |
| **3. Sidebar co lại** | Flexbox mặc định `flex-shrink: 1` | Thêm `flex-shrink: 0` hoặc `flex: 0 0 250px` |

**Key Takeaways:**
- **Flexbox + height**: Kết hợp chiều cao 100% + flex properties để quản lý layout linh hoạt
- **Center in Flexbox**: `justify-content: center` (ngang) + `align-items: center` (dọc)
- **Prevent shrink**: `flex-shrink: 0` để bảo vệ element khỏi bị co lại khi sibling co dãn

