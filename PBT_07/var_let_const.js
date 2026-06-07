// Đoạn 1
console.log('Đoạn 1 output:', x);
var x = 5;

// Đoạn 2
try {
  console.log('Đoạn 2 output:', y);
} catch (e) {
  console.log('Đoạn 2 Error:', e.message);
}
let y = 10;

// Đoạn 3
const z = 15;
try {
  z = 20;
} catch (e) {
  console.log('Đoạn 3 Error:', e.message);
}
console.log('Đoạn 3 giá trị z:', z);

// Đoạn 4
const arr = [1, 2, 3];
arr.push(4);
console.log('Đoạn 4 output:', arr);

// Đoạn 5
let a = 1;
{
  let a = 2;
  console.log('Trong block:', a);
}
console.log('Ngoài block:', a);
