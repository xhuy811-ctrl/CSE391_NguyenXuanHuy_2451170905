function formatVND(n) {
  return new Intl.NumberFormat('vi-VN').format(Math.round(n)) + 'đ';
}

function computeBill(items, options = {}) {
  // items: [{ name, price, qty }]
  // options: { date: Date or weekday string, tipPercent: number (0-100) }
  const date = options.date instanceof Date ? options.date : (options.date ? new Date(options.date) : new Date());
  const weekday = date.getDay(); // 0 Sun .. 3 Wed .. 6 Sat

  // subtotal before discounts
  let rawTotal = 0;
  for (const it of items) {
    rawTotal += it.price * (it.qty || 1);
  }

  // base discount
  let discountPercent = 0;
  if (rawTotal > 1000000) discountPercent = 15;
  else if (rawTotal > 500000) discountPercent = 10;

  // extra Wednesday discount (+5%)
  if (weekday === 3) discountPercent += 5; // Wednesday

  const discountAmount = rawTotal * (discountPercent / 100);
  const subtotal = rawTotal - discountAmount;

  const vatPercent = 8;
  const vatAmount = subtotal * (vatPercent / 100);

  const tipPercent = options.tipPercent ? options.tipPercent : 0;
  const tipAmount = subtotal * (tipPercent / 100);

  const total = subtotal + vatAmount + tipAmount;

  return {
    items,
    rawTotal,
    discountPercent,
    discountAmount,
    subtotal,
    vatPercent,
    vatAmount,
    tipPercent,
    tipAmount,
    total,
    date
  };
}

function renderReceipt(bill) {
  const lines = [];
  lines.push('HÓA ĐƠN NHÀ HÀNG');
  lines.push('');

  // items
  bill.items.forEach((it, idx) => {
    const name = it.name;
    const qty = it.qty || 1;
    const price = it.price;
    const lineTotal = price * qty;
    // format: "1. Phở bò      x2    @65k  = 130k"
    const left = `${idx+1}. ${name}`;
    const mid = `x${qty} @${formatVND(price)}`;
    const right = `${formatVND(lineTotal)}`;
    lines.push({ left, mid, right });
  });

  // summary lines
  const summary = [];
  summary.push({ k: 'Tổng cộng:', v: formatVND(bill.rawTotal) });
  summary.push({ k: `Giảm giá (${bill.discountPercent}%):`, v: formatVND(bill.discountAmount) });
  summary.push({ k: `Tạm tính:`, v: formatVND(bill.subtotal) });
  summary.push({ k: `VAT (${bill.vatPercent}%):`, v: formatVND(bill.vatAmount) });
  if (bill.tipPercent && bill.tipPercent > 0) summary.push({ k: `Tip (${bill.tipPercent}%):`, v: formatVND(bill.tipAmount) });
  summary.push({ k: 'THANH TOÁN:', v: formatVND(bill.total) });

  // compute width
  const itemLines = bill.items.map((it, idx) => {
    const left = `${idx+1}. ${it.name}`;
    const mid = `x${it.qty||1} @${formatVND(it.price)}`;
    const right = formatVND(it.price * (it.qty||1));
    return `${left} ${mid} ${right}`;
  });
  const summaryLines = summary.map(s => `${s.k} ${s.v}`);

  const allLines = [ ...itemLines, ...summaryLines, '' ];
  let maxLen = Math.max(...allLines.map(l => l.length), 40);
  maxLen = Math.min(maxLen, 80);

  const top = '╔' + '═'.repeat(maxLen + 2) + '╗';
  const bot = '╚' + '═'.repeat(maxLen + 2) + '╝';
  const sep = '╠' + '═'.repeat(maxLen + 2) + '╣';

  let out = top + '\n';
  // header centered
  const header = 'HÓA ĐƠN NHÀ HÀNG';
  out += '║ ' + header.padStart(Math.floor((maxLen+header.length)/2)).padEnd(maxLen+1) + '║\n';
  out += sep + '\n';

  // items
  bill.items.forEach((it, idx) => {
    const left = `${idx+1}. ${it.name}`;
    const mid = `x${it.qty||1} @${formatVND(it.price)}`;
    const right = formatVND(it.price * (it.qty||1));
    const line = `${left} ${mid}`;
    const padded = line.padEnd(maxLen - right.length + 1);
    out += '║ ' + padded + right + ' ║\n';
  });

  out += sep + '\n';
  summary.forEach(s => {
    const k = s.k;
    const v = s.v;
    const left = k;
    const padded = left.padEnd(maxLen - v.length + 1);
    out += '║ ' + padded + v + ' ║\n';
  });

  out += sep + '\n';
  // final total line already included as last summary
  out += bot + '\n';

  return out;
}

// Sample run when executed directly
if (require && require.main === module) {
  const items = [
    { name: 'Phở bò', price: 65000, qty: 2 },
    { name: 'Trà đá', price: 5000, qty: 3 },
    { name: 'Bún chả', price: 55000, qty: 1 }
  ];
  // Example: Wednesday discount: pass a Wednesday date or set date string
  const options = { date: new Date('2026-06-03'), tipPercent: 5 }; // 2026-06-03 is Wednesday
  const bill = computeBill(items, options);
  console.log(renderReceipt(bill));
}

module.exports = { computeBill, renderReceipt, formatVND };
