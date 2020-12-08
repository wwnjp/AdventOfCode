const fs = require('fs');
const __KEY = 'shiny gold bag';
const o = {};

fs.readFileSync('./inputs/7.txt', 'utf-8').trim()
	.split('\n')
	.map(x => {
		const y = x.split(' contain ');
		o[y[0].replace('bags', 'bag')] = y[1].replace('.', '').split(', ');
	});

let matches = [];
let sum1 = 0;

const dedupe = a => {
	let a2 = [];
	a.forEach(i => !a2.includes(i) && a2.push(i));
	return a2;
};

const countKey = search => {
	for (w in o) {
		o[w].forEach(b => {
			if (b.includes(search)) {
				matches.push(w);
				countKey(w);
			}
		});
	}
};

Array.prototype.sum = function() {
	return this.reduce((a, b) => a + (b.length ? b.sum() : b), 0);
}

let sum2 = [];
const howManyBags = (search, num) => {
	return o[search].map(b => {
		if (b === 'no other bags') {
			return num;
		}
		else {
			return howManyBags(b.replace(/\d+\s/, '').replace('bags', 'bag'), parseInt(b) * num);
		}
	});
};

countKey(__KEY);
console.log('PART 1', dedupe(matches).length);

sum2 = howManyBags(__KEY, 1);
console.log('PART 2', sum2.sum());
