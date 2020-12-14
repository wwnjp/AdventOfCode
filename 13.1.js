const fs = require('fs');
let notes = fs.readFileSync('./inputs/13.txt', 'utf-8').trim().split('\n');

const timestamp = notes[0];
const busses = notes[1].split(',').filter(b => b !== 'x').map(d => parseInt(d));

let minT = timestamp;
let minB = 0;

busses.map(b => {
	let t = 0;

	while (t < timestamp) t +=b;

	if ((minT === timestamp) || (minT > t)) {
		minT = t;
		minB = b;
	}

	return t;
});

console.log('PART 1', (minT - timestamp) * minB);
