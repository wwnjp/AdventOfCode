const fs = require('fs');

const _TR = {'B':1, 'R':1, 'F':0, 'L':0};
const i = fs.readFileSync('./inputs/5.txt', 'utf-8');
let max = 0;
let ids = Array(2048).fill(0);

// Each line is an input, so split on \n 
// to create set of inputs
i.split('\n')
	// blank line gets pulled in for 
	// some reason, so get rid of it
	.filter(_ => _.length)
	// for each input, translate to 
	// corresponding binary value as defined above
	.map(_ => _.replace(/./g, c => _TR[c]))
	// convert each entry to binary
	.map(_ => parseInt(_, 2))
	.forEach(_ => {
		// since the number is the first 8 bits are "row" 
		// and last 3 are "column", we can take the whole binary value
		// and shift right 3 to get the row and bit mask with 0b00000000111 (7) 
		// to get the column
		const [row, col] = [_>>3, _&7];
		const seatId = row * 8 + col;
		
		// keep track of all the seats we've found and track we've found it.
		// keeping an array of id[seatId] means we can O(1) find the missing val
		ids[seatId] = 1;
		// keep track of the max seatId we've found
		max = Math.max(max, seatId);
		//console.log(`Row ${row}, column, ${col}, seatId ${seatId}`);
	});

console.log('PART 1: Max seatId', max);
// Find the index of the one we haven't found from above.
// small cheat here: since looking at the values we found that the first 100 rows aren't used,
// we can chop them out. Here !x is a shorthand for (x === 0)
console.log('PART 2: Your Seat ', ids.findIndex((x, i) => i > 100 && !x));
