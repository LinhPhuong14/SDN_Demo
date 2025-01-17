//Review ES6

const ex = require('./myFunction');



//Create excute function solve these requirements
//1. If a > b, print all prime numbers from a to b
//2. If a < b, print all perfect square numbers from b to a
//3. If a = b, print the square of a

function excute(a, b) {
  let results = [];
  if (a > b) {
    for (let i = b; i < a; i++) {
      if (ex.isPerfectSquare(i)) {
        results.push(i);
      }
    }
    console.log(`Cac so chinh phuong tu ${b} den ${a} la: ` + results);
  }
  else if (a < b) {
    for (let i = a; i < b; i++) {
      if (ex.isPrime(i)) {
        results.push(i);
      }
    }
    console.log(`Cac so nguyen to tu ${a} den ${b} la: ` + results);
  } else {
    console.log(ex.square(a) + ` và chu vi` + ex.perimeter(a, b));
  }
}

excute(100, 10);
