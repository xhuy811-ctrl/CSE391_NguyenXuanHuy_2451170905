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

Câu C1

1. Network Errors (Mất mạng giữa chừng):

```javascript
// Kiểm tra online/offline
window.addEventListener('online', () => {
    console.log('Đã kết nối lại!');
    retryFailedRequests();  // Thử lại các request đã fail
});

window.addEventListener('offline', () => {
    showMessage('Mất kết nối mạng!');
});

// Kiểm tra trước khi fetch
async function safeFetch(url) {
    if (!navigator.onLine) {
        throw new Error('Không có kết nối mạng');
    }
    return await fetch(url);
}
```

2. API Errors (Server trả lỗi):

```javascript
async function handleAPIErrors(response) {
    if (response.ok) return response; // 200-299: OK
    
    // Xử lý từng loại lỗi
    switch (response.status) {
        case 400:
            throw new Error('Dữ liệu gửi lên không hợp lệ');
        case 401:
            // Redirect đến trang đăng nhập
            window.location.href = '/login';
            break;
        case 403:
            throw new Error('Bạn không có quyền truy cập');
        case 404:
            throw new Error('Không tìm thấy dữ liệu');
        case 429:
            // Too Many Requests - Đợi và thử lại
            const retryAfter = response.headers.get('Retry-After') || 60;
            throw new Error(`Quá nhiều request. Vui lòng đợi ${retryAfter} giây`);
        case 500:
            throw new Error('Lỗi server. Vui lòng thử lại sau');
        case 503:
            throw new Error('Server đang bảo trì');
        default:
            throw new Error(`Lỗi HTTP: ${response.status}`);
    }
}
```

3. Timeout (API chậm > 10 giây):

```javascript
/
 * Fetch với timeout - Hủy request nếu quá chậm
 * @param {string} url - URL cần gọi
 * @param {number} ms - Thời gian timeout (milli giây)
 */
async function fetchWithTimeout(url, ms = 10000) {
    // AbortController để hủy fetch
    const controller = new AbortController();
    
    // Hẹn giờ hủy request
    const timeoutId = setTimeout(() => {
        controller.abort();  // Hủy fetch
    }, ms);
    
    try {
        const response = await fetch(url, {
            signal: controller.signal  // Liên kết với controller
        });
        clearTimeout(timeoutId);  // Xóa timer nếu thành công
        return response;
    } catch (error) {
        clearTimeout(timeoutId);
        
        if (error.name === 'AbortError') {
            throw new Error(`Request timeout sau ${ms/1000} giây`);
        }
        throw error;  // Ném lại các lỗi khác
    }
}

// Sử dụng:
try {
    const response = await fetchWithTimeout('https://api.example.com', 5000);
    const data = await response.json();
} catch (error) {
    console.error(error.message);  // "Request timeout sau 5 giây"
}
```

4. Retry Logic (Thử lại 3 lần nếu lỗi):

```javascript
/
 * Fetch với retry - Tự động thử lại khi lỗi
 * @param {string} url - URL cần gọi
 * @param {number} maxRetries - Số lần thử tối đa
 * @param {number} delay - Thời gian chờ giữa các lần (ms)
 */
async function fetchWithRetry(url, maxRetries = 3, delay = 1000) {
    let lastError;
    
    for (let attempt = 1; attempt <= maxRetries; attempt++) {
        try {
            console.log(`Thử lần ${attempt}/${maxRetries}...`);
            
            const response = await fetch(url);
            
            if (!response.ok) {
                throw new Error(`HTTP ${response.status}`);
            }
            
            return response;  // Thành công → trả về
            
        } catch (error) {
            lastError = error;
            console.warn(`Lần ${attempt} thất bại:`, error.message);
            
            // Nếu chưa hết lần retry → đợi rồi thử lại
            if (attempt < maxRetries) {
                console.log(`Đợi ${delay}ms rồi thử lại...`);
                await new Promise(r => setTimeout(r, delay));
                delay *= 2;  // Exponential backoff (1s → 2s → 4s)
            }
        }
    }
    
    // Hết lần retry mà vẫn lỗi
    throw new Error(`Thất bại sau ${maxRetries} lần thử: ${lastError.message}`);
}

// Sử dụng:
try {
    const response = await fetchWithRetry('https://api.example.com', 3);
    const data = await response.json();
} catch (error) {
    console.error('Không thể kết nối:', error.message);
}
```

---

Câu C2

| Method | Khi nào resolve? | Khi nào reject? | Use case |
|--------|------------------|-----------------|----------|
| `Promise.all()` | Khi TẤT CẢ promises fulfill | Khi BẤT KỲ promise reject | Load nhiều dữ liệu cần ĐỦ (trang sản phẩm cần cả info + giá + ảnh) |
| `Promise.allSettled()` | Luôn resolve (sau khi tất cả xong) | KHÔNG BAO GIỜ reject | Dashboard hiện nhiều widget - 1 widget lỗi không ảnh hưởng widget khác |
| `Promise.race()` | Khi promise ĐẦU TIÊN settle (fulfill hoặc reject) | Khi promise đầu tiên reject | Implement timeout, đua giữa fetch và timer |
| `Promise.any()` | Khi BẤT KỲ promise fulfill | Khi TẤT CẢ promises reject | Load từ nhiều server, lấy server nhanh nhất |

Ví dụ code thực tế:

1. Promise.all() - Trang chi tiết sản phẩm:

```javascript
// Trang sản phẩm CẦN TẤT CẢ thông tin để hiển thị
async function loadProductPage(productId) {
    try {
        // Gọi song song 3 API - tất cả phải thành công
        const [product, reviews, relatedItems] = await Promise.all([
            fetch(`/api/products/${productId}`).then(r => r.json()),
            fetch(`/api/products/${productId}/reviews`).then(r => r.json()),
            fetch(`/api/products/${productId}/related`).then(r => r.json())
        ]);
        
        // Chỉ render khi có ĐỦ data
        renderProductPage(product, reviews, relatedItems);
        
    } catch (error) {
        // NẾU 1 API LỖI → toàn bộ fail
        showError('Không thể tải trang sản phẩm');
    }
}
```

2. Promise.allSettled() - Dashboard với nhiều widget:

```javascript
// Dashboard có nhiều widget - 1 widget lỗi không ảnh hưởng các widget khác
async function loadDashboard() {
    const results = await Promise.allSettled([
        fetch('/api/weather').then(r => r.json()),
        fetch('/api/news').then(r => r.json()),
        fetch('/api/stocks').then(r => r.json()),  // API này có thể lỗi
        fetch('/api/emails').then(r => r.json())
    ]);
    
    // Xử lý từng kết quả riêng biệt
    results.forEach((result, index) => {
        const widgets = ['weather', 'news', 'stocks', 'emails'];
        const widgetName = widgets[index];
        
        if (result.status === 'fulfilled') {
            renderWidget(widgetName, result.value);
        } else {
            renderWidgetError(widgetName, 'Không thể tải dữ liệu');
        }
    });
}
```

3. Promise.race() - Timeout cho API chậm:

```javascript
// Đua giữa fetch và timer - ai về trước thắng
async function fetchWithTimeout(url, timeout = 5000) {
    const fetchPromise = fetch(url);
    
    const timeoutPromise = new Promise((_, reject) => {
        setTimeout(() => {
            reject(new Error('Request timeout!'));
        }, timeout);
    });
    
    // Promise nào xong trước sẽ quyết định kết quả
    return Promise.race([fetchPromise, timeoutPromise]);
}

// Sử dụng:
try {
    const response = await fetchWithTimeout('/api/slow-endpoint', 3000);
    const data = await response.json();
} catch (error) {
    console.error(error.message);  // "Request timeout!" nếu quá 3 giây
}
```

4. Promise.any() - Load từ nhiều CDN:

```javascript
// Load ảnh từ nhiều CDN - lấy CDN nào nhanh nhất
async function loadImageFromFastestCDN(imagePath) {
    const cdns = [
        'https://cdn1.example.com',
        'https://cdn2.example.com', 
        'https://cdn3.example.com'
    ];
    
    try {
        // Chỉ cần 1 CDN thành công là đủ
        const response = await Promise.any(
            cdns.map(cdn => fetch(`${cdn}/${imagePath}`))
        );
        
        return await response.blob();
        
    } catch (error) {
        // Chỉ vào đây khi TẤT CẢ CDN đều lỗi
        throw new Error('Tất cả CDN đều không khả dụng');
    }
}
```
