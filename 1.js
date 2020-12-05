const fs = require('fs');

let i = fs.readFileSync('./inputs/1.txt', 'utf-8');
const SUM = 2020;

i = i.split('\n').map(f => parseInt(f));
i.sort((a, b) => a > b ? 1 : -1);

i.forEach(n => {
	// PART 1
	//const TARGET = SUM;
	// i
	
	// PART 2
	const TARGET = SUM - n;
	i.filter(i => i < n)

	// Same for both
	.forEach(j => {
		if (i.includes(TARGET - j)) {
			// Will print for every member of match
			console.log('MATCH: ', n, j, TARGET-j, (n * j * (TARGET - j)));
		}
	});
});
