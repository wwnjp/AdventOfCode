const fs = require('fs');
const o = fs.readFileSync('./inputs/9.txt', 'utf-8').trim().split('\n').map(l => parseInt(l));

const preamble = 25;
let invalid = 0;

const isValidSum = (x, a) => {
	let isValid = false;
	
	a.forEach(n => {
		if (a.includes(x - n)) {
			isValid = true;
		}
	});

	return isValid;
};

o.forEach((x, i) => {
	if (i > preamble) {
		if (!isValidSum(x, o.slice(i - preamble, i))) {
			console.log('PART 1: ', x)
			invalid = x;
		}
	}
});



let min = 0;
let max = 0;
o.filter(_ => _ < invalid).forEach((_, i) => {
	sum = 0;
	i2 = i;

	while (sum < invalid) {
		sum = o.slice(i, ++i2).reduce((a, b) => a + b, 0);

		if (sum === invalid) {
			min = Math.min(...o.slice(i, i2));
			max = Math.max(...o.slice(i, i2));

			console.log('PART 2: ', min + max);
			break;
		}
	}
});
