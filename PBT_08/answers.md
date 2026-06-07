## PHẦN A — KIỂM TRA ĐỌC HIỂU (20 điểm)
### Câu A1 (5đ) — Function Declaration vs Expression vs Arrow

**1. Ba cách viết hàm:**

*   **Function Declaration:**
```javascript
function tinhThueBaoHiem(luong) {
    const thue = luong > 11000000 ? luong * 0.1 : 0;
    return { thue, thuc_nhan: luong - thue };
}
```

*   **Function Expression:**
```javascript
const tinhThueBaoHiem = function(luong) {
    const thue = luong > 11000000 ? luong * 0.1 : 0;
    return { thue, thuc_nhan: luong - thue };
};
```

*   **Arrow Function:**
```javascript
const tinhThueBaoHiem = (luong) => {
    const thue = luong > 11000000 ? luong * 0.1 : 0;
    return { thue, thuc_nhan: luong - thue };
};
```

**2. Giải thích về Hoisting:**
Ba cách này **có khác nhau** về hoisting:
*   **Function Declaration:** Được hoisting hoàn toàn. Bạn có thể gọi hàm trước khi khai báo.
*   **Function Expression & Arrow Function:** Không được hoisting theo cách tương tự. Vì chúng được gán vào biến (`const` hoặc `let`), chúng sẽ nằm trong "Temporal Dead Zone" và không thể truy cập trước khi dòng code khai báo được thực thi.

**Ví dụ cụ thể:**
```javascript
// OK: Function Declaration chạy bình thường
console.log(cach1(12000000)); 
function cach1(luong) { return luong * 0.1; }

// LỖI: ReferenceError: Cannot access 'cach2' before initialization
console.log(cach2(12000000));
const cach2 = (luong) => luong * 0.1;
```
### Câu A2 (5đ) — Scope & Closure
**Đoạn 1:**
```javascript
const c = counter();
console.log(c.increment());  // 1
console.log(c.increment());  // 2
console.log(c.increment());  // 3
console.log(c.decrement());  // 2
console.log(c.getCount());   // 2
```

**Đoạn 2:**
```javascript
// Output sau 200ms:
// var: 3
// var: 3
// var: 3
// let: 0
// let: 1
// let: 2
```

**Giải thích tại sao `var` và `let` cho kết quả khác nhau:**

- **var**: Có function scope, không có block scope. Biến `i` là chung cho cả vòng lặp. Khi setTimeout chạy sau 100ms, vòng lặp đã kết thúc và `i = 3`. Nên cả 3 lần đều in ra 3.

- **let**: Có block scope. Mỗi lần lặp tạo ra một biến `j` riêng. setTimeout nhớ được giá trị `j` của lần lặp đó nhờ closure. Nên in ra 0, 1, 2.

---
### Câu A3 (5đ) — Array Methods
```javascript
const nums = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

// 1. Lấy các số chẵn
const soChans = nums.filter(n => n % 2 === 0);
// → [2, 4, 6, 8, 10]

// 2. Nhân mỗi số với 3
const nhanBa = nums.map(n => n * 3);
// → [3, 6, 9, 12, 15, 18, 21, 24, 27, 30]

// 3. Tính tổng tất cả
const tongCong = nums.reduce((sum, n) => sum + n, 0);
// → 55

// 4. Tìm số đầu tiên > 7
const timDuoc = nums.find(n => n > 7);
// → 8

// 5. Kiểm tra CÓ số > 10 không
const coSoLon = nums.some(n => n > 10);
// → false

// 6. Kiểm tra TẤT CẢ đều > 0
const tatCaDuongKhong = nums.every(n => n > 0);
// → true

// 7. Tạo mảng "Số X là [chẵn/lẻ]"
const danhSachChanLe = nums.map(n => `Số ${n} là ${n % 2 === 0 ? "chẵn" : "lẻ"}`);
// → ["Số 1 là lẻ", "Số 2 là chẵn", ...]

// 8. Đảo ngược mảng (không mutate gốc)
const daoNguoc = [...nums].reverse();
// → [10, 9, 8, 7, 6, 5, 4, 3, 2, 1]
```
### Câu A4 (5đ) — Object Destructuring & Spread

**1. Dự đoán kết quả:**

- `console.log(name, price, ram, color)` → `iPhone 16 25990000 8 Titan`

- `console.log(specs)` → `ReferenceError: specs is not defined` (Do `specs` chỉ đóng vai trò là "mẫu" để bóc tách, không được khai báo thành biến).

- `updated.price` → `23990000` (Giá trị mới ghi đè giá trị cũ).

- `product.price` → `25990000` (Không đổi, vì spread tạo object mới cho các thuộc tính cấp 1).

- `product.specs.ram` → `16`

**2. Giải thích "Spread gotcha":**

- Tại sao `product.specs.ram` lại là `16`?

- **Lý do:** Toán tử Spread (`...`) chỉ thực hiện **Shallow Copy** (sao chép nông). 

- Đối với các thuộc tính là Object lồng nhau (như `specs`), nó chỉ sao chép **địa chỉ bộ nhớ (tham chiếu)** chứ không tạo ra object mới bên trong.

- Vì vậy, cả `copy.specs` và `product.specs` đều đang trỏ chung vào một vùng dữ liệu. Khi thay đổi thuộc tính bên trong `copy.specs`, object gốc `product.specs` cũng bị thay đổi theo.

## PHẦN C — SUY LUẬN (20 điểm)
### Câu C1 (10đ) — Refactor Code
**Code sau khi refactor:**

```javascript
function processOrders(orders) {
    // Bước 1: Lọc orders đã hoàn thành và total > 100000
    var filtered = orders.filter(function(order) {
        return order.status === "completed" && order.total > 100000;
    });
    
    // Bước 2: Tạo object mới với discount
    var mapped = filtered.map(function(order) {
        return {
            id: order.id,
            customer: order.customer,
            total: order.total,
            discount: order.total * 0.1,
            finalTotal: order.total * 0.9
        };
    });
    
    // Bước 3: Sắp xếp theo finalTotal giảm dần
    var sorted = mapped.sort(function(a, b) {
        return b.finalTotal - a.finalTotal;
    });
    
    return sorted;
}
```

### Câu C2 (10đ) — Thiết kế API
```javascript
const miniArray = {
    // map: chạy qua từng phần tử, áp dụng fn, thêm vào mảng mới
    map(arr, fn) {
        let result = [];
        for (let i = 0; i < arr.length; i++) {
            result.push(fn(arr[i], i, arr));
        }
        return result;
    },

    // filter: chạy qua từng phần tử, nếu fn trả true thì giữ lại
    filter(arr, fn) {
        let result = [];
        for (let i = 0; i < arr.length; i++) {
            if (fn(arr[i], i, arr)) {
                result.push(arr[i]);
            }
        }
        return result;
    },

    // reduce: gom tất cả lại thành 1 giá trị
    reduce(arr, fn, initialValue) {
        let acc = initialValue;
        for (let i = 0; i < arr.length; i++) {
            acc = fn(acc, arr[i], i, arr);
        }
        return acc;
    }
};

// Test:
console.log(miniArray.map([1,2,3], x => x * 2));           // → [2, 4, 6]
console.log(miniArray.filter([1,2,3,4], x => x > 2));       // → [3, 4]
console.log(miniArray.reduce([1,2,3,4], (a, b) => a + b, 0)); // → 10
```