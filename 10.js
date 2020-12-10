const fs = require('fs');
const o = fs.readFileSync('./inputs/10.txt', 'utf-8').trim().split('\n').map(l => parseInt(l));
const diffs = [];
const occ = Array(5).fill(0);

o.unshift(0);
o.sort((a, b) => a > b ? 1 : -1);
o.push(o[o.length - 1] + 3);

// PART 1
o.map((v, i) => o[i + 1] ? o[i + 1] - v : 0).forEach(d => d && occ[d]++);
console.log('PART 1:', occ[1] * occ[3]);

// PART 2
let num = 0;
let _con = [];

// Note: needs to be a for loop because we muck with i in the loop
// .forEach() would probably cry at that.
for (i = 0; i < o.length; i++) {
	let off = i + 1;
	let con = 0;

	while (o[off] - o[off - 1] === 1) {
		con++;
		i = off++;
	}

	con > 1 && _con.push(con + 1);
}

const f = n => 
	n === 0 ? 0 : 
	n < 3 ? 1 : 
	f(n - 1) + f(n - 2) + f(n - 3);

console.log('PART 2:', _con.map(f).reduce((a, b) => a * b, 1))

