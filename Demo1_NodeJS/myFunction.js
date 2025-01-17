//1st to export function
exports.isPrime = (n) => {
  for (let i = 2; i < n; i++) {
    if (n % i === 0) {
      return false;
    }
  }
  return true;
};

//2nd to export function
function isPerfectSquare (n) {
    if (Math.sqrt(n) % 1 === 0) {
      return true;
    }
    return false;
}
function square (n) {
  return n * n;
}

function perimeter (a,b){
    return 2 * (a + b);
}
module.exports = { isPerfectSquare, square, perimeter };