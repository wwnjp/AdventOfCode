const fs = require('fs');

const _TR = {'B':1, 'R':1, 'F':0, 'L':0};
const i = fs.readFileSync('./inputs/5.txt', 'utf-8');
let max = 0;
let ids = Array(2048).fill(0);

i.split('\n')
	.filter(_ => _.length)
	.map(_ => _.replace(/./g, c => _TR[c]))
	.map(_ => parseInt(_, 2))
	.forEach(_ => {
		const [row, col] = [_>>3, _&7];
		const seatId = row * 8 + col;
		
		ids[seatId] = seatId;
		max = Math.max(max, seatId);
		//console.log(`Row ${row}, column, ${col}, seatId ${seatId}`);
	});

console.log('Part 1: ', max);
console.log('PART 2: Your Seat ', ids.findIndex((x, i) => i > 100 && !x));
