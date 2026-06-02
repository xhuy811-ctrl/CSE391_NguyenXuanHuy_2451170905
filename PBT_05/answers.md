# PHẦN A — KIỂM TRA ĐỌC HIỂU (20 điểm)

## Câu A1 (5đ) — Viewport & Mobile-First

### 1. Thẻ <meta viewport> chuẩn

```html
<meta name="viewport" content="width=device-width, initial-scale=1.0">
```

**Giải thích từng thuộc tính:**

| Thuộc tính | Ý nghĩa | Giá trị |
|-----------|---------|--------|
| **name="viewport"** | Chỉ định loại metadata | viewport |
| **width=device-width** | Chiều rộng viewport bằng chiều rộng thiết bị | Tự động điều chỉnh theo màn hình |
| **initial-scale=1.0** | Tỷ lệ zoom ban đầu | 1.0 = 100% (không phóng to/thu nhỏ) |
| **user-scalable=yes** (tùy chọn) | Cho phép người dùng phóng to/thu nhỏ | yes / no |
| **minimum-scale** (tùy chọn) | Tỷ lệ zoom tối thiểu | Mặc định 0.25 |
| **maximum-scale** (tùy chọn) | Tỷ lệ zoom tối đa | Mặc định 5.0 |

---

### 2. Nếu THIẾU thẻ <meta viewport>, iPhone sẽ hiển thị trang web như thế nào?

**Khi thiếu thẻ meta viewport:**

- **iPhone sẽ hiển thị trang ở chế độ "Desktop View"** thay vì "Mobile View"
- Chiều rộng mặc định là **980px** (hoặc giá trị viewport mặc định)
- **Nội dung bị thu nhỏ** để vừa với màn hình 390px của iPhone
- Văn bản và các phần tử sẽ **rất nhỏ, khó đọc**
- **UX rất tệ**: người dùng phải pinch-to-zoom để đọc, scroll ngang
- Trang web không responsive và không bắt buộc tuân thủ mobile layout

**Hình ảnh minh họa:**
```
Không có meta viewport:        Có meta viewport:
┌─────────┐                    ┌─────────┐
│ [Wed]   │ (nhỏ)             │ Content │ (vừa vặn)
│ [site]  │ (phóng to để       │fits     │ (tự động
│ zoomed] │  xem)              │ perfectly│ điều chỉnh)
└─────────┘                    └─────────┘
```

---

### 3. Khác biệt giữa Mobile-First và Desktop-First

#### **A. Mobile-First Approach (Dùng media query cho thiết bị lớn hơn)**

```css
/* Mobile-First: CSS cơ bản cho mobile */
.container {
  width: 100%;
  padding: 10px;
  font-size: 14px;
}

.column {
  width: 100%;
  margin-bottom: 20px;
}

/* Nâng cấp cho tablet và desktop */
@media (min-width: 768px) {
  .container {
    max-width: 750px;
    padding: 20px;
  }
  
  .column {
    width: 48%;
    display: inline-block;
    margin-right: 2%;
  }
}

@media (min-width: 1024px) {
  .container {
    max-width: 960px;
  }
  
  .column {
    width: 31%;
    margin-right: 2%;
  }
}
```

#### **B. Desktop-First Approach (CSS mặc định cho desktop, thu nhỏ cho mobile)**

```css
/* Desktop-First: CSS cơ bản cho desktop */
.container {
  max-width: 1200px;
  padding: 40px;
  font-size: 16px;
  margin: 0 auto;
}

.column {
  width: 32%;
  display: inline-block;
  margin-right: 2%;
}

/* Thu nhỏ lại cho thiết bị nhỏ */
@media (max-width: 768px) {
  .container {
    max-width: 100%;
    padding: 10px;
    font-size: 14px;
  }
  
  .column {
    width: 100%;
    display: block;
    margin-right: 0;
    margin-bottom: 20px;
  }
}
```

#### **C. So sánh chi tiết**

| Tiêu chí | Mobile-First | Desktop-First |
|---------|-------------|--------------|
| **CSS cơ bản** | Cho mobile (100% width, nhỏ) | Cho desktop (fixed width, lớn) |
| **Media query** | `@media (min-width: ...)` | `@media (max-width: ...)` |
| **Quy trình thiết kế** | Mobile → Tablet → Desktop | Desktop → Tablet → Mobile |
| **Tối ưu hóa** | Tốt hơn cho mobile | Tốt hơn cho desktop |
| **Performance** | Nhẹ hơn, nhanh hơn trên mobile | Nặng hơn trên mobile |
| **Ưu tiên** | Tập trung vào mobile trước | Tập trung vào desktop trước |

---

### 4. Tại sao Mobile-First được khuyên dùng? (Các lý do chính)

✅ **1. Tối ưu hóa hiệu suất (Performance)**
- Mobile users tải ít CSS hơn
- Các media query cho desktop chỉ được xử lý khi cần
- Trang web mobile tải nhanh hơn

✅ **2. Ưu tiên người dùng mobile**
- > 60% traffic từ mobile devices
- Mobile users là ưu tiên cao nhất
- Cải thiện UX trên màn hình nhỏ trước

✅ **3. CSS sạch hơn và dễ bảo trì**
- Bắt đầu từ cơ bản → thêm phức tạp
- Dễ debug và bổ sung tính năng
- Giảm CSS overrides không cần thiết

✅ **4. Responsive Design tự nhiên hơn**
- Tất cả thiết bị đều được hỗ trợ đầy đủ
- Kích thước layout tự động mở rộng
- Không cần phải "cắt bớt" cho mobile

✅ **5. SEO tốt hơn**
- Google ưa tiên mobile-first indexing
- Trang mobile tốt → ranking cao hơn

✅ **6. Trải nghiệm người dùng tốt hơn**
- Người dùng không phải cuộn ngang
- Nút bấm không bị chặt, dễ click
- Thích ứng tự nhiên với màn hình lớn

---

## Kết luận

**Mobile-First là cách tiếp cận hiện đại và được khuyên dùng** vì:
- Phù hợp với xu hướng sử dụng mobile
- Tối ưu hóa hiệu suất
- CSS sạch và bảo trì tốt
- Cải thiện SEO
- Đáp ứng nhu cầu người dùng mobile trước

---

## Câu A2 (5đ) — Breakpoints

Ghi lại breakpoints chuẩn (theo Bootstrap). Cho mỗi breakpoint: kích thước pixel, thiết bị đại diện, ví dụ số cột cho lưới sản phẩm.

- **`xs` (<576px)**
  - Kích thước: <576px
  - Thiết bị đại diện: điện thoại nhỏ (portrait)
  - Ví dụ lưới sản phẩm: 1 cột

- **`sm` (≥576px)**
  - Kích thước: 576px — 767.98px
  - Thiết bị đại diện: điện thoại lớn / phablet
  - Ví dụ lưới sản phẩm: 2 cột

- **`md` (≥768px)**
  - Kích thước: 768px — 991.98px
  - Thiết bị đại diện: tablet (portrait/landscape nhỏ)
  - Ví dụ lưới sản phẩm: 3 cột

- **`lg` (≥992px)**
  - Kích thước: 992px — 1199.98px
  - Thiết bị đại diện: laptop nhỏ / tablet landscape
  - Ví dụ lưới sản phẩm: 4 cột

- **`xl` (≥1200px)**
  - Kích thước: 1200px — 1399.98px
  - Thiết bị đại diện: laptop lớn / desktop nhỏ
  - Ví dụ lưới sản phẩm: 5 cột

- **`xxl` (≥1400px)**
  - Kích thước: ≥1400px
  - Thiết bị đại diện: desktop lớn / màn hình rộng
  - Ví dụ lưới sản phẩm: 6 cột

> Ghi chú: Đây là gợi ý tiêu chuẩn theo Bootstrap; tùy case cụ thể (khoảng cách, chiều rộng thẻ, hình ảnh) có thể điều chỉnh số cột.

---

## Câu A3 (5đ) — Media Queries

### Đề bài
Đọc CSS sau, cho biết ở mỗi kích thước màn hình, `.container` có width bao nhiêu?

```css
.container { 
  width: 100%; 
  padding: 10px; 
}

@media (min-width: 576px) { 
  .container { width: 540px; } 
}

@media (min-width: 768px) { 
  .container { width: 720px; } 
}

@media (min-width: 992px) { 
  .container { width: 960px; } 
}

@media (min-width: 1200px) { 
  .container { width: 1140px; } 
}
```

### Lời giải

**Cách phân tích:**
1. Kích thước mặc định: `width: 100%` (100% chiều rộng màn hình)
2. Các media query áp dụng lần lượt theo điều kiện `min-width`
3. Media query nào có `min-width` lớn nhất ≤ chiều rộng màn hình sẽ được áp dụng

**Bảng kết quả:**

| Chiều rộng màn hình | Media query áp dụng | `.container` width |
|------------------|------------------|------------------|
| **375px** (iPhone SE) | Không | **100%** (= 375px) |
| **600px** | `@media (min-width: 576px)` | **540px** |
| **800px** | `@media (min-width: 768px)` | **720px** |
| **1000px** | `@media (min-width: 992px)` | **960px** |
| **1400px** | `@media (min-width: 1200px)` | **1140px** |

### Giải thích chi tiết

- **375px (iPhone SE)**: 
  - <576px → không vào media query nào 
  - Sử dụng CSS mặc định: `width: 100%` 
  - **Kết quả: 100% (375px)**

- **600px**: 
  - ≥576px ✓ nhưng <768px ✗ 
  - Áp dụng: `@media (min-width: 576px)` 
  - **Kết quả: 540px**

- **800px**: 
  - ≥576px ✓, ≥768px ✓ nhưng <992px ✗ 
  - Áp dụng: `@media (min-width: 768px)` (mới nhất/cao nhất) 
  - **Kết quả: 720px**

- **1000px**: 
  - ≥576px ✓, ≥768px ✓, ≥992px ✓ nhưng <1200px ✗ 
  - Áp dụng: `@media (min-width: 992px)` 
  - **Kết quả: 960px**

- **1400px**: 
  - ≥576px ✓, ≥768px ✓, ≥992px ✓, ≥1200px ✓ 
  - Áp dụng: `@media (min-width: 1200px)` (cao nhất) 
  - **Kết quả: 1140px**

> **Lưu ý:** `padding: 10px` không ảnh hưởng đến `width` (nó thêm khoảng trắng bên trong).

---

## Câu A4 (5đ) — SCSS Basics

Giải thích 4 tính năng chính của SCSS và cho ví dụ. Tại sao trình duyệt KHÔNG đọc được file .scss? Cần bước gì để chuyển SCSS → CSS?

---

### 1. Variables (Biến)

**Ý tưởng:** Lưu trữ giá trị (màu, kích thước, font) dưới dạng biến để tái sử dụng.

**SCSS:**
```scss
$primary-color: #007bff;
$secondary-color: #6c757d;
$border-radius: 8px;
$font-size-base: 16px;

.button {
  background-color: $primary-color;
  border-radius: $border-radius;
  font-size: $font-size-base;
}

.button-secondary {
  background-color: $secondary-color;
  border-radius: $border-radius;
}
```

**CSS được biên dịch:**
```css
.button {
  background-color: #007bff;
  border-radius: 8px;
  font-size: 16px;
}

.button-secondary {
  background-color: #6c757d;
  border-radius: 8px;
}
```

**Lợi ích:** Thay đổi màu 1 chỗ, tất cả nơi dùng biến cũng thay đổi.

---

### 2. Nesting (Lồng CSS)

**Ý tưởng:** Viết CSS lồng nhau theo cấu trúc HTML, giảm lặp lại selector.

**SCSS:**
```scss
.navbar {
  background-color: #333;
  padding: 10px;

  .navbar-item {
    color: white;
    padding: 8px 16px;

    &:hover {
      background-color: #555;
    }

    &.active {
      font-weight: bold;
      border-bottom: 2px solid #007bff;
    }
  }

  .navbar-brand {
    font-size: 24px;
    font-weight: bold;
  }
}
```

**CSS được biên dịch:**
```css
.navbar {
  background-color: #333;
  padding: 10px;
}

.navbar .navbar-item {
  color: white;
  padding: 8px 16px;
}

.navbar .navbar-item:hover {
  background-color: #555;
}

.navbar .navbar-item.active {
  font-weight: bold;
  border-bottom: 2px solid #007bff;
}

.navbar .navbar-brand {
  font-size: 24px;
  font-weight: bold;
}
```

**Lợi ích:** Code ngắn gọn, dễ đọc, tránh viết lại selector nhiều lần. (Lưu ý: `&` đại diện cho selector cha)

---

### 3. Mixins (@mixin, @include)

**Ý tưởng:** Tạo khối CSS tái sử dụng (như function), có thể nhận tham số.

**SCSS:**
```scss
// Định nghĩa mixin
@mixin flex-center {
  display: flex;
  justify-content: center;
  align-items: center;
}

@mixin border-radius($radius: 4px) {
  border-radius: $radius;
  -webkit-border-radius: $radius;
  -moz-border-radius: $radius;
}

@mixin button-style($bg-color, $text-color: white) {
  background-color: $bg-color;
  color: $text-color;
  padding: 10px 20px;
  border: none;
  cursor: pointer;
  
  &:hover {
    opacity: 0.8;
  }
}

// Sử dụng mixin
.container {
  @include flex-center;
  height: 100vh;
}

.card {
  @include border-radius(12px);
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.btn-primary {
  @include button-style(#007bff);
}

.btn-success {
  @include button-style(#28a745);
}

.btn-danger {
  @include button-style(#dc3545, #fff);
}
```

**CSS được biên dịch:**
```css
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

.card {
  border-radius: 12px;
  -webkit-border-radius: 12px;
  -moz-border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.btn-primary {
  background-color: #007bff;
  color: white;
  padding: 10px 20px;
  border: none;
  cursor: pointer;
}

.btn-primary:hover {
  opacity: 0.8;
}

.btn-success {
  background-color: #28a745;
  color: white;
  padding: 10px 20px;
  border: none;
  cursor: pointer;
}

.btn-success:hover {
  opacity: 0.8;
}

.btn-danger {
  background-color: #dc3545;
  color: #fff;
  padding: 10px 20px;
  border: none;
  cursor: pointer;
}

.btn-danger:hover {
  opacity: 0.8;
}
```

**Lợi ích:** Tránh lặp lại code, tham số hóa được, dễ bảo trì.

---

### 4. @extend / Inheritance (Thừa kế)

**Ý tưởng:** Một class thừa kế tất cả các thuộc tính từ class khác, rồi bổ sung thêm.

**SCSS:**
```scss
.btn {
  padding: 10px 20px;
  border: none;
  cursor: pointer;
  border-radius: 4px;
  font-size: 16px;
}

.btn-primary {
  @extend .btn;
  background-color: #007bff;
  color: white;
}

.btn-primary:hover {
  background-color: #0056b3;
}

.btn-secondary {
  @extend .btn;
  background-color: #6c757d;
  color: white;
}

.btn-secondary:hover {
  background-color: #545b62;
}
```

**CSS được biên dịch:**
```css
.btn, .btn-primary, .btn-secondary {
  padding: 10px 20px;
  border: none;
  cursor: pointer;
  border-radius: 4px;
  font-size: 16px;
}

.btn-primary {
  background-color: #007bff;
  color: white;
}

.btn-primary:hover {
  background-color: #0056b3;
}

.btn-secondary {
  background-color: #6c757d;
  color: white;
}

.btn-secondary:hover {
  background-color: #545b62;
}
```

**Lợi ích:** CSS được gộp thông minh, tránh lặp lại style cơ bản.

---

### Sự khác biệt: @extend vs @mixin

| Tiêu chí | @extend | @mixin |
|---------|--------|--------|
| **Cú pháp** | `@extend .class` | `@include mixin-name()` |
| **Kết quả CSS** | Gộp selector vào 1 rule | Lặp lại code |
| **Tham số** | Không | Có |
| **Kích thước CSS** | Nhỏ hơn | Lớn hơn |
| **Khi nào dùng** | Tái sử dụng style đơn giản | Tái sử dụng khối phức tạp hoặc có tham số |

---

### Tại sao trình duyệt KHÔNG đọc được file .scss?

**Lý do:** 
- SCSS là pre-processor language (ngôn ngữ tiền xử lý), trình duyệt **chỉ hiểu CSS** 
- File `.scss` chứa syntax riêng: `$variable`, `@mixin`, `@extend`, nesting...
- Trình duyệt không biết cách xử lý những tính năng này
- **Trình duyệt sẽ báo lỗi** nếu bạn link file `.scss` trực tiếp

**Hình minh họa:**
```
.scss file → [Compiler] → .css file → [Browser] → Hiển thị
```

---

### Quy trình biên dịch SCSS → CSS

**Bước 1: Cài đặt công cụ biên dịch**

Các tùy chọn phổ biến:
- **Node.js + sass package**: `npm install -g sass`
- **VS Code extension**: "Live Sass Compiler" 
- **Online tool**: https://jsoncrack.com/editor (hoặc sassmeister.com)

**Bước 2: Viết file `.scss`**

Ví dụ: `styles.scss`
```scss
$primary: #007bff;

.btn {
  background: $primary;
}
```

**Bước 3: Biên dịch SCSS → CSS**

Dùng command line:
```bash
sass styles.scss styles.css
```

Hoặc watch mode (tự động biên dịch khi file thay đổi):
```bash
sass --watch .:.
```

**Bước 4: Link file `.css` vào HTML**

```html
<link rel="stylesheet" href="styles.css">
```

**Kết quả file `styles.css`:**
```css
.btn {
  background: #007bff;
}
```

---

### Tóm tắt 4 tính năng SCSS

| Tính năng | Ký hiệu | Tác dụng |
|---------|---------|---------|
| **Variables** | `$name: value;` | Lưu giá trị tái sử dụng |
| **Nesting** | Indentation | Viết CSS lồng nhau, giảm selector lặp |
| **Mixins** | `@mixin` / `@include` | Hàm CSS với tham số |
| **@extend** | `@extend .class` | Thừa kế style từ class khác |

> **Lưu ý:** File `.scss` phải được **biên dịch thành `.css`** trước khi trình duyệt có thể đọc được!

---

