PHẦN A — KIỂM TRA ĐỌC HIỂU (15 điểm)

### Câu A1 — Sync vs Async (5đ)

Mã:
```
console.log("1 - Start");

setTimeout(() => console.log("2 - Timeout 0ms"), 0);

Promise.resolve().then(() => console.log("3 - Promise"));

console.log("4 - End");

setTimeout(() => console.log("5 - Timeout 100ms"), 100);

Promise.resolve().then(() => {
    console.log("6 - Promise 2");
    setTimeout(() => console.log("7 - Nested timeout"), 0);
});
```

Thứ tự output:
1 - Start
4 - End
3 - Promise
6 - Promise 2
2 - Timeout 0ms
7 - Nested timeout
5 - Timeout 100ms

Giải thích ngắn: Các câu lệnh đồng bộ chạy ngay trên call stack (`1`, `4`). `Promise.then` enqueue callback vào Microtask Queue (microtasks) và được chạy sau khi call stack rỗng nhưng trước mọi macrotask. `setTimeout` enqueue vào Macrotask Queue (tasks). Vì vậy các microtasks (`3`, `6`) chạy trước macrotasks; macrotasks giữ thứ tự enqueue nên `2` (enqueued trước) chạy trước `7` (enqueued sau trong một microtask). `5` chạy sau ~100ms.

### Câu A2 — Fetch API (5đ)

Mã:
```
async function getData() {
    try {
        const response = await fetch("https://api.example.com/data");
        
        if (!response.ok) {
            throw new Error(`HTTP ${response.status}`);
        }
        
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Failed:", error.message);
        return null;
    }
}
```

1. `await fetch(...)` — `fetch` trả về một `Promise` mà khi resolved trả về một `Response` object; dùng `await` để chờ promise hoàn thành và lấy `Response` trực tiếp.
2. `response.ok` — là `false` khi HTTP status là lỗi (thường 4xx hoặc 5xx). Ví dụ: `404 Not Found`, `401 Unauthorized` (hoặc `403 Forbidden`), `500 Internal Server Error`.
3. `response.json()` — trả về một `Promise` vì quá trình đọc và parse body bất đồng bộ; cần `await` để nhận object JSON đã parse.
4. `try...catch` — bắt các lỗi runtime bất đồng bộ: lỗi network (fetch reject), lỗi do `throw` khi `!response.ok` (ví dụ 404 được kiểm tra và ném), và lỗi parse JSON (nếu body không phải JSON). Lưu ý: `fetch` tự nó không reject vì HTTP 404, nên ta phải kiểm tra `response.ok` và ném lỗi nếu muốn.

### Câu A3 — Promise States & Callback Hell (5đ)

Sơ đồ 3 trạng thái:

- `Pending` → `Fulfilled` (khi `resolve`)
- `Pending` → `Rejected` (khi `reject`)

Callback Hell: Là dạng mã có nhiều callback lồng nhau, khó đọc và khó xử lý lỗi.

Ví dụ 4 cấp (callback hell):
```
doStep1(data1 => {
  doStep2(data2 => {
    doStep3(data3 => {
      doStep4(result => {
        console.log(result);
      });
    });
  });
});
```

Refactor bằng `async/await` (gọn, dễ đọc, dễ xử lý lỗi):
```
async function runSteps() {
  try {
    const data1 = await doStep1();
    const data2 = await doStep2(data1);
    const data3 = await doStep3(data2);
    const result = await doStep4(data3);
    console.log(result);
  } catch (err) {
    console.error(err);
  }
}
```

-- Hết --
