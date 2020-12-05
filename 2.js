const fs = require('fs');


let i = fs.readFileSync('./2.txt', 'utf-8');
let matches = 0;
let matches2 = 0;

i = i.split('\n').filter(q => q.length > 0);

i.forEach(pw => {
	const entries = pw.split(' ');
	const nums = entries[0].split('-');
	const letter = entries[1].replace(':', '');
	const input = entries[2];

	const inputParsed = input.replace(new RegExp('[^' + letter + ']', 'gi'), '');
	if (inputParsed.length >= nums[0] && inputParsed.length <= nums[1]) {
		matches++;
	}

	if ((input[nums[0] - 1] === letter) ^ (input[nums[1] - 1] === letter)) {
		matches2++;
	}
});

console.log('TOTAL (PART 1):', matches);
console.log('TOTAL (PART 2):', matches2);

