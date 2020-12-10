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
	// WIP
	n === 5 ? 7 :
	n === 4 ? 4 :
	n === 3 ? 2 :
	0;


console.log('PART 2:', _con.map(f).reduce((a, b) => a * b, 1))


/*
3 -> 2
1, 2, 3 
1, 3 
1, 2 XX
2, 3 XX
1    XX
2    XX
3    XX

4 -> 4
1, 2, 3, 4 
1, 3, 4
1, 2, 4
2, 3, 4 XX
1, 2, 3 XX
1, 2 XX 
1, 3 XX
1, 4 
2, 3 XX
2, 4 XX
1, 4 XX
1  XX
2  XX
3  XX
4  XX

5 -> 7
1, 2, 3, 4, 5
1, 2, 3, 5
1, 3, 4, 5
1, 2, 4, 5
2, 3, 4, 5 XX
1, 2, 3, 4 XX
1, 2, 5
1, 3, 5
1, 4, 5
1, 2, 3 XX
1, 2, 4 XX
2, 3, 4 XX
2, 3, 5 XX
3, 4, 5 XX
1, 2 XX
1, 3 XX
1, 4 XX
1, 5 XX > 4
2, 3 XX 
2, 4 XX
2, 5 XX
3, 4 XX
3, 5 XX
4, 5 XX
1 XX
2 XX
3 XX
4 XX
5 XX
 */
