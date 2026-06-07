const students = [
    { name: "An", math: 8, physics: 7, cs: 9, gender: "M" },
    { name: "Bình", math: 6, physics: 9, cs: 7, gender: "F" },
    { name: "Chi", math: 9, physics: 6, cs: 8, gender: "F" },
    { name: "Dũng", math: 5, physics: 5, cs: 6, gender: "M" },
    { name: "Em", math: 10, physics: 8, cs: 9, gender: "F" },
    { name: "Phong", math: 3, physics: 4, cs: 5, gender: "M" },
    { name: "Giang", math: 7, physics: 7, cs: 7, gender: "F" },
    { name: "Huy", math: 4, physics: 6, cs: 3, gender: "M" },
];

function calcAverage(student) {
  return student.math * 0.4 + student.physics * 0.3 + student.cs * 0.3;
}

function classify(avg) {
  if (avg >= 8.0) return 'Giỏi';
  if (avg >= 6.5) return 'Khá';
  if (avg >= 5.0) return 'Trung bình';
  return 'Yếu';
}

function processStudents(list) {
  return list.map(s => {
    const avg = calcAverage(s);
    const rounded = Math.round(avg * 100) / 100; // 2 decimals
    return Object.assign({}, s, { average: rounded, classification: classify(avg) });
  });
}

// Run and print results
const processed = processStudents(students);
console.log('Danh sách sinh viên (điểm trung bình + xếp loại):');
processed.forEach(s => {
  console.log(`${s.name} - AVG: ${s.average.toFixed(2)} - ${s.classification}`);
});

module.exports = { students, calcAverage, classify, processStudents };
