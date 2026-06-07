// Version 1: Classic FizzBuzz (1..100)
function fizzBuzzClassic(start = 1, end = 100) {
  const out = [];
  for (let i = start; i <= end; i++) {
    let s = '';
    if (i % 3 === 0) s += 'Fizz';
    if (i % 5 === 0) s += 'Buzz';
    out.push(s || String(i));
  }
  return out;
}

// Helper: compute fizzbuzz output for a single number with given rules
function fizzBuzzForNumber(n, rules) {
  let s = '';
  for (const r of rules) {
    if (n % r.divisor === 0) s += r.word;
  }
  return s || String(n);
}

// Version 2: customFizzBuzz(n, rules)
// rules = [{ divisor: 3, word: "Fizz" }, ...]
function customFizzBuzz(n, rules) {
  const out = [];
  for (let i = 1; i <= n; i++) {
    out.push(`${i} = ${fizzBuzzForNumber(i, rules)}`);
  }
  // Print results to console for convenience
  out.forEach(line => console.log(line));
  return out;
}

// Tests
if (require.main === module) {
  console.log('--- Classic FizzBuzz (1..100) sample ---');
  const classic = fizzBuzzClassic();
  console.log(classic.slice(0, 15).join(', ')); // show first 15

  console.log('\n--- customFizzBuzz up to 30 ---');
  customFizzBuzz(30, [
    { divisor: 3, word: 'Fizz' },
    { divisor: 5, word: 'Buzz' },
    { divisor: 7, word: 'Jazz' }
  ]);

  // Specific checks mentioned in prompt
  const rules = [
    { divisor: 3, word: 'Fizz' },
    { divisor: 5, word: 'Buzz' },
    { divisor: 7, word: 'Jazz' }
  ];
  console.log('\n--- Specific values ---');
  console.log('21 =', fizzBuzzForNumber(21, rules)); // FizzJazz
  console.log('15 =', fizzBuzzForNumber(15, rules)); // FizzBuzz
  console.log('35 =', fizzBuzzForNumber(35, rules)); // BuzzJazz
  console.log('105 =', fizzBuzzForNumber(105, rules)); // FizzBuzzJazz
}

module.exports = { fizzBuzzClassic, customFizzBuzz, fizzBuzzForNumber };
