const fs = require('fs');

const qs = 'abcdefghijklmnopqrstuvwxyz'.split('').map(q => new RegExp(q));
const sets = fs.readFileSync('./inputs/6.txt', 'utf-8').trim().split('\n\n');

const sum1 = sets.map(s => {
	let _y = Array(26).fill(0);
	s.split('\n').forEach(p => qs.forEach((q, i) => q.test(p) && (_y[i] = 1)));
	return _y.reduce((a, b) => a + b, 0);
}).reduce((a, b) => a + b, 0);

const sum2 = sets.map(s => {
	let _y = Array(26).fill(0);
	let g = s.split('\n');
	g.forEach(p => qs.forEach((q, i) => q.test(p) && _y[i]++));
	return _y.reduce((a, b) => a + (b === g.length ? 1 : 0) , 0);
}).reduce((a, b) => a + b, 0);

console.log('PART 1: ', sum1);
console.log('PART 2: ', sum2);
