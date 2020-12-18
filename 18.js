const fs = require('fs');
const hw = fs.readFileSync('./inputs/18.txt', 'utf-8').trim().split('\n');
const re = /\([\d\s\+\*]+\)/;

// PART 1
// combine sequentially
//
// keep a running sum (start with the first num)
// if we find a +, add the next num, (shortcut i + 1)
// if we find a *, mul the next num (shortcut i + 1)
// return sum
const combine1 = str => {
	let s = str.replace(/[()]/g, '').split(' ');
	let sum = parseInt(s[0]);

	for (let i = 1; i < s.length; i++) {
		if (s[i] === '+') {
			sum += parseInt(s[++i]);
		}
		else if (s[i] === '*') {
			sum *= parseInt(s[++i]);
		}
	}

	return sum;
};

// PART 2 
// all addition happens before multiplication
//
// '1 + 2 * 3 + 4' -- Split on ' * '
// ['1 + 2', '3 + 4'] -- for each entry, 
// '1 + 2' 
// '3 + 4' -- split on ' + ', apply add();
// [3 , 7] -- apply mul();
// 21
const mul = _ => _.reduce((a, b) => a * b, 1);
const add = _ => _.reduce((a, b) => parseInt(a) + parseInt(b), 0);

const combine2 = str => {
	let s = str.replace(/[()]/g, '');

	return mul(s.split(' * ').map(s2 => add(s2.split(' + '))));
};

// @f is the function to apply for PART 1 / 2, combine1, or combine2
calc = f => 
	hw.map(l => {
		let l2 = l;
		let exec;

		// find any inner (), and split them out
		// e.g., 1 + (2 * 3) + 4  -> 
		//		'1 + ' + combineF('(2 * 3)') + ' + 4'
		// repeat until no () remain
		while (exec = re.exec(l2)) {
			str = exec[0];
			idx = exec.index;

			// PART 1
			// l2 = l2.substring(0, idx) + combine1(str) +  l2.substring(idx + str.length)
			l2 = l2.substring(0, idx) + f(str) +  l2.substring(idx + str.length)
		}

		// PART 1
		// return combine1(l2);
		return f(l2);
	}).reduce((a, b) => a + b, 0);


console.log('PART 1', calc(combine1));
console.log('PART 2', calc(combine2));
