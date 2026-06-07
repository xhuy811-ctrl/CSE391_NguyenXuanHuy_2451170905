// 1. pipe() — Nối chuỗi functions (Function Composition)
function pipe(...fns) {
    return function(initialValue) {
        return fns.reduce((acc, fn) => fn(acc), initialValue);
    };
}

// Test Pipe
const processValue = pipe(
    x => x * 2,        // 5 -> 10
    x => x + 10,       // 10 -> 20
    x => x.toString(), // 20 -> "20"
    x => "Kết quả: " + x
);

console.log("=== TEST PIPE ===");
console.log(processValue(5)); // → "Kết quả: 20"


// 2. memoize() — Cache kết quả dựa trên tham số đầu vào
function memoize(fn) {
    const cache = new Map();
    return function(...args) {
        const key = JSON.stringify(args);
        if (cache.has(key)) {
            return cache.get(key);
        }
        const result = fn(...args);
        cache.set(key, result);
        return result;
    };
}

// Test Memoize
const expensiveCalc = memoize((n) => {
    console.log("Đang tính...");
    let result = 0;
    for (let i = 0; i < n; i++) result += i;
    return result;
});

console.log("\n=== TEST MEMOIZE ===");
console.log(expensiveCalc(1000000)); // Lần 1: In "Đang tính..."
console.log(expensiveCalc(1000000)); // Lần 2: Lấy từ cache, không in "Đang tính..."


// 3. debounce() — Chờ user ngừng gõ/hành động trong khoảng 'delay' mới thực hiện
function debounce(fn, delay) {
    let timeoutId;
    return function(...args) {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
            fn.apply(this, args);
        }, delay);
    };
}

// Test Debounce
const search = debounce((query) => {
    console.log("Searching:", query);
}, 500);

console.log("\n=== TEST DEBOUNCE (Xem log sau 500ms) ===");
search("a");
search("ab");
search("abc"); // Chỉ "abc" được thực hiện sau 500ms tính từ lần gọi cuối


// 4. retry() — Thử lại hàm bất đồng bộ nếu xảy ra lỗi
async function retry(fn, maxAttempts = 3) {
    let lastError;
    for (let i = 0; i < maxAttempts; i++) {
        try {
            return await fn();
        } catch (error) {
            lastError = error;
            console.log(`Lần thử ${i + 1} thất bại. Đang thử lại...`);
        }
    }
    throw new Error(`Thất bại sau ${maxAttempts} lần thử. Lỗi cuối: ${lastError.message}`);
}

// Test Retry (Giả lập hàm fetch lỗi)
const fetchData = () => {
    return Math.random() > 0.8 ? Promise.resolve("Dữ liệu đã tải!") : Promise.reject(new Error("Lỗi mạng"));
};

retry(fetchData, 5)
    .then(res => console.log("\n=== TEST RETRY ===\nSuccess:", res))
    .catch(err => console.error("\n=== TEST RETRY ===\nFailed:", err.message));