# PHẦN A - KIỂM TRA ĐỌC HIỂU (15 điểm)

## A1 — DOM Tree & querySelector (5đ)

1) Sơ đồ DOM (rút gọn):

- body
  - div (app wrapper)
    - h1 "Todo App"
    - nav
      - a (All)
      - a (Active)
      - a (Completed)
    - form
      - input
      - button "Add"
    - ul#todoList
      - li.todo-item "Learn HTML"
      - li.todo-item "Learn CSS"

2) querySelector / querySelectorAll:

- Chọn thẻ h1:

```js
document.querySelector('h1')
```

- Chọn input trong form:

```js
document.querySelector('form input')
```

- Chọn tất cả `.todo-item`:

```js
document.querySelectorAll('.todo-item')
```

- Chọn link đang active (giả sử có class `active`):

```js
document.querySelector('a.active')
```

- Chọn `li` đầu tiên trong `#todoList`:

```js
document.querySelector('#todoList li:first-child')
```

- Chọn tất cả `a` bên trong `nav`:

```js
document.querySelectorAll('nav a')
```

## A2 — innerHTML vs textContent (5đ)

- `innerHTML`: nhận/ghi một chuỗi HTML và được browser parse thành DOM. Dùng khi bạn cần chèn markup (elements) từ một string.
- `textContent`: nhận/ghi chỉ text thuần, không parse HTML. Dùng khi bạn chỉ muốn hiển thị hoặc đọc text an toàn.

Vì sao `innerHTML` có thể gây XSS:
- Nếu chèn trực tiếp input người dùng vào `innerHTML`, attacker có thể gửi markup chứa mã nguy hiểm (ví dụ `<img onerror=...>` hoặc `<script>`), khiến mã đó được thực thi.

Ví dụ nguy hiểm:

```js
// Giả sử user nhập: <img src=x onerror=alert('XSS')>
const userInput = document.querySelector('#search').value;
document.querySelector('#result').innerHTML = userInput; // ← NGUY HIỂM
```

Sửa an toàn (nếu không cần render HTML):

```js
document.querySelector('#result').textContent = userInput;
```

Nếu bạn cần cho phép một số HTML an toàn, phải sanitize trước (ví dụ dùng DOMPurify):

```js
// với DOMPurify
document.querySelector('#result').innerHTML = DOMPurify.sanitize(userInput);
```

## A3 — Event Bubbling (5đ)

HTML (rút gọn):

```html
<div id="outer">
  <div id="inner">
    <button id="btn">Click me</button>
  </div>
</div>
```

JavaScript handlers (theo đề bài):

- Khi click vào button, thứ tự console.log (mặc định bubbling) là:

```
BUTTON
INNER
OUTER
```

- Nếu trong handler của `#btn` gọi `e.stopPropagation()`, thì propagation dừng lại và output chỉ là:

```
BUTTON
```

---

Hết.
