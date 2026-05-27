# Phần A : 
## Câu A1 — 5 Loại Positioning

| Position | Vẫn chiếm chỗ trong flow? | Tham chiếu vị trí | Cuộn theo trang? | Use case |
|---|---|---|---|---|
| `static` | Có, ở vị trí bình thường trong flow | Không dùng `top/right/bottom/left`, vị trí mặc định theo flow | Có | Layout mặc định, phần tử không cần định vị đặc biệt |
| `relative` | Có, vẫn giữ chỗ trong flow | Dựa trên vị trí ban đầu của chính nó trong flow | Có | Dịch chuyển nhẹ phần tử so với vị trí gốc mà không làm đổi flow xung quanh |
| `absolute` | Không, không chiếm chỗ trong flow | Dựa trên `nearest positioned ancestor` (không `static`); nếu không có thì dựa trên `body`/viewport | Không, không cuộn theo trang nếu trong body? Thực ra phần tử vẫn di chuyển khi trang cuộn nếu nằm trong container có vị trí cố định với viewport, nhưng nếu không có ancestor cố định thì nó di chuyển cùng trang | Hiển thị popup, tooltip, overlay, đặt chính xác phần tử trong container |
| `fixed` | Không, không chiếm chỗ | Dựa trên viewport (hay `browser window`) | Không, cố định trong viewport khi cuộn | Header/fixed bar, button luôn hiện, thanh điều hướng cố định |
| `sticky` | Có, chiếm chỗ ban đầu | Dựa trên vị trí bình thường trong flow, sau đó trở thành cố định khi cuộn tới ngưỡng | Có, nhưng khi dính thì nó cố định với viewport cho đến khi container cha hết | Header sticky, bảng tiêu đề dính, điều hướng bên khi cuộn |

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
[Item1]    [Item2]    [Item3]

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
[Item7][   ][   ]

# Phần C :

