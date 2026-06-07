## PHẦN A — KIỂM TRA ĐỌC HIỂU (25 điểm)

### Câu A1 (5đ) — var / let / const
- **Dự đoán:**
	- Đoạn 1: `undefined` (hoisted declaration, assignment sau)
	- Đoạn 2: ReferenceError (temporal dead zone của `let`)
	- Đoạn 3: TypeError (không thể gán lại `const`)
	- Đoạn 4: In ra `[1, 2, 3, 4]` (mutate mảng `const` được phép)
	- Đoạn 5: In `Trong block: 2` rồi `Ngoài block: 1` (block scope của `let`)

- **Hành động:** Tạo file kiểm thử [var_let_const.js](var_let_const.js) để chạy kiểm tra.

## Câu A2 — Data Types & Coercion
- **Dự đoán (theo thứ tự):**
	- `typeof null` => "object"
	- `typeof undefined` => "undefined"
	- `typeof NaN` => "number"
	- `"5" + 3` => "53" (toán tử `+` nối chuỗi nếu có chuỗi)
	- `"5" - 3` => 2 (phép `-` ép cả hai về number)
	- `"5" * "3"` => 15 (ép về number)
	- `true + true` => 2 (true -> 1)
	- `[] + []` => "" (cả hai thành chuỗi rỗng)
	- `[] + {}` => "[object Object]" (arr->"", {} -> "[object Object]")
	- `{ } + []` => 0 or "[object Object]" (tùy parser; khi đặt ở dòng bắt đầu, `{}` bị hiểu là block, kết quả có thể là 0) — thực tế trong console Chrome `{} + []` cho 0 (vì `{}` là block rỗng, rồi `+[]` => 0)

- **Giải thích khác biệt `"5" + 3` vs `"5" - 3`:**
	- Toán tử `+` với một toán hạng là chuỗi sẽ thực hiện nối chuỗi (string concatenation). Vì vậy `"5" + 3` chuyển `3` thành chuỗi → "53".
	- Toán tử `-` chỉ định kiểu số; nó ép cả hai toán hạng về số (ToNumber) → `"5" - 3` = 5 - 3 = 2.
## Câu A3 — So sánh == vs ===
- **Dự đoán (true/false):**
	- `5 == "5"` => true
	- `5 === "5"` => false
	- `null == undefined` => true
	- `null === undefined` => false
	- `NaN == NaN` => false
	- `0 == false` => true
	- `0 === false` => false
	- `"" == false` => true

- **Quy tắc:** Nên dùng `===` (so sánh nghiêm ngặt) để tránh ép kiểu bất ngờ; chỉ dùng `==` khi bạn thật sự muốn so sánh sau khi ép kiểu theo quy tắc của JavaScript.

## Câu A4 — Truthy & Falsy**
- **Danh sách tất cả các giá trị falsy trong JS:**
	- `false`
	- `0` (và `-0`)
	- `0n` (BigInt zero)
	- `""` (empty string)
	- `null`
	- `undefined`
	- `NaN`

- **Dự đoán in ra:**
	- `if ("0")` => In `A` (chuỗi "0" là truthy)
	- `if ("")` => Không in `B` (empty string falsy)
	- `if ([])` => In `C` (empty array truthy)
	- `if ({})` => In `D` (empty object truthy)
	- `if (null)` => Không in `E` (null falsy)
	- `if (0)` => Không in `F` (0 falsy)
	- `if (-1)` => In `G` (non-zero là truthy)
	- `if (" ")` => In `H` (chuỗi có space là truthy)

## Câu A5 — Template Literals
- **Viết lại bằng template literal:**
	- Cách 1: `var greeting = `Xin chào ${name}! Bạn ${age} tuổi.`;`
	- Cách 2: `var url = `https://api.example.com/users/${userId}/orders?page=${page}`;`
	- Cách 3:
		`var html = `<div>
	<h1>${title}</h1>
	<p>${description}</p>

	<p>Giá: ${price}đ</p>
</div>`;`

## PHẦN C — SUY LUẬN (20 điểm)
### C1 — Debug JavaScript (10đ)

	Dưới đây là phiên bản sửa lỗi của đoạn code ban đầu kèm giải thích các lỗi và cách sửa:

	// Mã đã sửa
	function tinhGiaGiamGia(giaBan, phanTramGiam) {
		const gia = Number(giaBan);
		if (!Number.isFinite(gia)) {
			return "Lỗi: Giá bán không hợp lệ";
		}

		if (typeof phanTramGiam !== 'number' || phanTramGiam < 0 || phanTramGiam > 100) {
			return "Phần trăm giảm không hợp lệ";
		}

		const giamGia = gia * phanTramGiam / 100;
		const giaSauGiam = gia - giamGia;

		if (giaSauGiam === 0) {
			console.log("Sản phẩm miễn phí!");
		}

		return giaSauGiam;
	}

	// Test
	const gia = tinhGiaGiamGia("100000", 20);
	console.log("Giá sau giảm: " + gia + "đ");

	const gia2 = tinhGiaGiamGia(50000, 110);
	console.log("Giá: " + gia2);

	// Ví dụ vòng lặp: dùng `let` thay vì `var` để tránh lỗi ẩn khi dùng callback bất đồng bộ
	for (let i = 0; i < 3; i++) {
		setTimeout(() => console.log('i =', i), 0);
	}

	Danh sách lỗi tìm được và cách sửa:

	- Lỗi 1: `if (phanTramGiam  100)` — thiếu toán tử so sánh.
		- Sửa: kiểm tra phạm vi hợp lệ, ví dụ `if (phanTramGiam < 0 || phanTramGiam > 100)`.

	- Lỗi 2: `if (giaSauGiam = 0)` — dùng phép gán thay vì so sánh.
		- Sửa: dùng `if (giaSauGiam === 0)`.

	- Lỗi 3: `giaBan` có thể là chuỗi (ví dụ "100000"); không ép kiểu sẽ gây lỗi trong phép toán.
		- Sửa: ép kiểu bằng `Number(giaBan)` và kiểm tra với `Number.isFinite`.

	- Lỗi 4: Không kiểm tra `phanTramGiam` là số hợp lệ (ví dụ 110%). Cần validate phạm vi 0–100.

	- Lỗi 5: Đoạn code bị cắt ở cuối (`for (var i = 0; i`), thiếu phần còn lại của vòng lặp.

	- Lỗi 6 (ẩn): Sử dụng `var` trong vòng lặp kết hợp với callback (ví dụ `setTimeout`) dẫn tới tất cả callback tham chiếu cùng một biến `i` — kết quả không như mong muốn.
		- Sửa: dùng `let i = 0` để mỗi lần lặp có phạm vi block riêng.

	Tóm tắt: sửa các lỗi cú pháp, logic, và ép kiểu như trên sẽ khiến hàm hoạt động đúng cho cả input chuỗi và số, và tránh lỗi scoping khi dùng callback.


