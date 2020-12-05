const fs = require('fs');


//let i = [1721, 979, 366, 299, 675, 1456];
let i = fs.readFileSync('./1.txt', 'utf-8');
const SUM = 2020;

i = i.split('\n').map(f => parseInt(f));

i.sort((a, b) => a > b ? 1 : -1);
i = i.filter(n => n < SUM);



i.forEach(n => {
	// PART 1
	//const TARGET = SUM;

	// PART 2
	const TARGET = SUM - n;

	// i
	i.filter(i => i < n)
	.forEach(j => {
		if (lessthans.includes(TARGET - j)) {
			console.log('MATCH:: ', n, j, TARGET-j, (n * j * (TARGET - j)));
		}
	});
});
