const fs = require('fs');
const _TR = {'B':1, 'R':1, 'F':0, 'L':0};

let i = fs.readFileSync('./inputs/5.txt', 'utf-8');
let max = 0;
let ids = Array(2048).fill(0);

i.split('\n')
	.filter(f => f.length > 0)
	.map(f => f.replace(/./g, c => _TR[c]))
	.forEach(f => {
		let row = parseInt(f.substr(0, 7), 2);
		let col = parseInt(f.substr(7, 3), 2);
		let seatId = row * 8 + col;
		
		ids[seatId] = seatId;
		max = Math.max(max, seatId);
		//console.log(`Row ${row}, column, ${col}, seatId ${seatId}`);
	});

console.log('Part 1: ', max);
console.log('PART 2: Your Seat ', ids.findIndex((x, i) => i > 100 && !x));
