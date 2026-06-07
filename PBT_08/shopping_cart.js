function createCart() {
    // Private data - Dữ liệu nội bộ không thể truy cập trực tiếp từ bên ngoài
    let items = [];
    let discount = { type: 'none', value: 0 };

    return {
        // 1. Thêm sản phẩm (nếu đã có → tăng quantity)
        addItem(product, quantity = 1) {
            const existingItem = items.find(item => item.id === product.id);
            if (existingItem) {
                existingItem.quantity += quantity;
            } else {
                items.push({ ...product, quantity });
            }
        },

        // 2. Xóa sản phẩm theo id
        removeItem(productId) {
            items = items.filter(item => item.id !== productId);
        },

        // 3. Cập nhật số lượng
        updateQuantity(productId, newQuantity) {
            const item = items.find(item => item.id === productId);
            if (item) {
                item.quantity = newQuantity;
            }
        },

        // 4. Tính tổng tiền (sau khi áp dụng giảm giá)
        getTotal() {
            const subtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
            
            if (discount.type === 'percent') {
                return subtotal * (1 - discount.value / 100);
            } else if (discount.type === 'fixed') {
                return Math.max(0, subtotal - discount.value);
            }
            
            return subtotal;
        },

        // 5. Áp dụng mã giảm giá
        applyDiscount(code) {
            switch (code) {
                case "SALE10":
                    discount = { type: 'percent', value: 10 };
                    break;
                case "SALE20":
                    discount = { type: 'percent', value: 20 };
                    break;
                case "FREESHIP":
                    discount = { type: 'fixed', value: 30000 };
                    break;
                default:
                    discount = { type: 'none', value: 0 };
                    console.log("⚠️ Mã giảm giá không hợp lệ");
            }
        },

        // 6. In giỏ hàng dạng bảng
        printCart() {
            const f = (n) => n.toLocaleString('vi-VN');
            console.log("\n┌" + "─".repeat(58) + "┐");
            console.log(`│ # │ ${"Sản phẩm".padEnd(15)} │ ${"SL".padEnd(2)} │ ${"Đơn giá".padEnd(12)} │ ${"Tổng".padEnd(12)} │`);
            
            items.forEach((item, index) => {
                const itemTotal = item.price * item.quantity;
                console.log(`│ ${index + 1} │ ${item.name.padEnd(15)} │ ${item.quantity.toString().padEnd(2)} │ ${f(item.price).padStart(12)} │ ${f(itemTotal).padStart(12)} │`);
            });

            console.log("├" + "─".repeat(58) + "┤");
            console.log(`│ Tổng cộng: ${f(this.getTotal()).padStart(43)}đ │`);
            console.log("└" + "─".repeat(58) + "┘");
        },

        // 7. Lấy tổng số sản phẩm (tổng quantity)
        getItemCount() {
            return items.reduce((total, item) => total + item.quantity, 0);
        },

        // 8. Xóa toàn bộ giỏ
        clearCart() {
            items = [];
            discount = { type: 'none', value: 0 };
        }
    };
}

// === TEST THEO PBT08 ===
const cart = createCart();
cart.addItem({ id: 1, name: "iPhone 16", price: 25990000 }, 1);
cart.addItem({ id: 3, name: "AirPods Pro", price: 6990000 }, 2);
cart.addItem({ id: 1, name: "iPhone 16", price: 25990000 }, 1); // Tăng lên 2

cart.printCart();

cart.applyDiscount("SALE10");
cart.printCart();

console.log("Số SP:", cart.getItemCount()); // → 4
cart.removeItem(3);
console.log("Sau xóa:", cart.getItemCount()); // → 2