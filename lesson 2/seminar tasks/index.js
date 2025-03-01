const calculateResultSumNp = require('./calculateResultSum');
// const color = require('color');
const colors = require('@colors/colors');

function calculateResultSum(purchases, discount) {
    let total = purchases.reduce((acc,  purchase) => acc += purchase, 0);

    total = total * discount;
    return total;
}

const total = calculateResultSum([12.1, 32.2, 43.1], 0.9);

console.log(colors.green(total)); // total = 78.66000000000001

const totalNp = calculateResultSumNp.calculateResultSumNp([12.1, 32.2, 43.1], 0.9);

console.log(colors.bgBrightBlue(totalNp));  // total = 78.66
