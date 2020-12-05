const fs = require('fs');


let i = fs.readFileSync('./5.txt', 'utf-8');
let max = 0;
let ids = Array(2048).fill(0);

i = i.split('\n').map(f => {
	if (f.length) {
		let row = parseInt(f.substr(0, 8).replace(/B/g, '1').replace(/F/g, '0'), 2);
		let col = parseInt(f.substr(7, 3).replace(/R/g, '1').replace(/L/g, '0'), 2);
		let seatId = row * 8 + col;
		
		ids[seatId] = seatId;
		max = Math.max(max, seatId);
		console.log(`Row ${row}, column, ${col}, seatId ${seatId}`);
	}
});

console.log('MAX: ', max);

console.log(ids.filter((i, d) => d > 100 && d < max && i === 0));
console.log('Your Seat', ids.join(','));
