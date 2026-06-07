function startGame() {
  const secret = Math.floor(Math.random() * 100) + 1;
  const maxAttempts = 7;
  const previous = new Set();
  let attempts = 0;

  while (attempts < maxAttempts) {
    const input = prompt(`Lần ${attempts + 1} / ${maxAttempts} - Nhập số (1-100):`);
    if (input === null) {
      alert('Bạn đã hủy trò chơi.');
      return;
    }

    const trimmed = input.trim();
    if (trimmed === '') {
      alert('Giá trị không hợp lệ. Vui lòng nhập số từ 1 đến 100.');
      continue;
    }

    const guess = Number(trimmed);
    if (!Number.isInteger(guess) || guess < 1 || guess > 100) {
      alert('Giá trị không hợp lệ. Vui lòng nhập số nguyên từ 1 đến 100.');
      continue;
    }

    if (previous.has(guess)) {
      alert('Bạn đã đoán số này rồi!');
      continue; // không tính lượt
    }

    previous.add(guess);
    attempts++;

    if (guess === secret) {
      alert(`Đúng rồi! Bạn đoán đúng sau ${attempts} lần!`);
      return;
    }

    if (guess < secret) {
      alert('Cao hơn');
    } else {
      alert('Thấp hơn');
    }
  }

  // Nếu hết lượt
  alert(`Hết lượt! Số đúng là ${secret}.`);
}

// Gắn sự kiện cho button
document.addEventListener('DOMContentLoaded', () => {
  const btn = document.getElementById('startBtn');
  if (btn) btn.addEventListener('click', startGame);
});
