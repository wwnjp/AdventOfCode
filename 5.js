const fs = require('fs');

const _TR = {'B':1, 'R':1, 'F':0, 'L':0};
const i = fs.readFileSync('./inputs/5.txt', 'utf-8').trim();
let max = 0;
let ids = Array(2048).fill(0);

i.split('\n')
	.map(_ => _.replace(/./g, c => _TR[c]))
	.map(_ => parseInt(_, 2))
	.forEach(_ => {
		const [row, col] = [_>>3, _&7];
		const seatId = row * 8 + col;
		ids[seatId] = 1;
		max = Math.max(max, seatId);
		min = Math.min(max, seatId);
	});

console.log('PART 1: Max seatId', max);
console.log('PART 2: Your Seat ', ids.findIndex((x, i) => i > min && !x));
