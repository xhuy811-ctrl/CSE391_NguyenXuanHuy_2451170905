function calculate(num1, operator, num2) {
  // Validate inputs are finite numbers
  if (!Number.isFinite(num1) || !Number.isFinite(num2)) {
    return "Lỗi: Input không phải số";
  }

  // Handle division/modulo by zero
  if ((operator === "/" || operator === "%") && num2 === 0) {
    return "Lỗi: Không thể chia cho 0";
  }

  switch (operator) {
    case "+":
      return num1 + num2;
    case "-":
      return num1 - num2;
    case "*":
      return num1 * num2;
    case "/":
      return num1 / num2;
    case "%":
      return num1 % num2;
    case "**":
      return num1 ** num2;
    default:
      return `Lỗi: Operator '${operator}' không hợp lệ`;
  }
}

// Tests
console.log(calculate(10, "+", 5));    // → 15
console.log(calculate(10, "/", 0));    // → "Lỗi: Không thể chia cho 0"
console.log(calculate(10, "^", 5));    // → "Lỗi: Operator '^' không hợp lệ"
console.log(calculate("abc", "+", 5)); // → "Lỗi: Input không phải số"
console.log(calculate(2, "**", 10));   // → 1024

module.exports = { calculate };