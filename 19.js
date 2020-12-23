const fs = require('fs');
const input = fs.readFileSync('./inputs/19.test.txt', 'utf-8').trim().split('\n\n');

let rules = [];
let data = input[1].split('\n');

// Parse Rules
input[0].split('\n').forEach(i => {
	let [key, rule] = i.split(': ');
	if (rule.indexOf('"') > -1) {
		rules[key] = rule.replace(/\"/g, '');
	}
	else {
		if (rule.indexOf('|') > -1) {
			rules[key] = rule.split(' | ').map(r => r.split(' ').map(i => parseInt(i)));
		}
		else {
			rules[key] = rule.split(' ').map(i => parseInt(i));
		}
	}
});

/*
 *   4 1 5
 *   a 23 | 32 b
 *   a 44|55 45|54 45|54 b
 *   a aa|bb ab|ba ab|ba b
 *
 *   a aa ab ab b
 *   a aa ab ba b
 *   a aa ba ab b
 *   a aa ba ba b
 *   a bb ab ab b
 *   a bb ab ba b
 *   a bb ba ab b
 *   a bb ba ba b
 *
 *
 */


data.forEach(l => {
	let bits = l.split('');
	
});


console.log('RULES', rules);

