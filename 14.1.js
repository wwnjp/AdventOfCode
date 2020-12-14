const fs = require('fs');
const set = fs.readFileSync('./inputs/14.txt', 'utf-8').trim().split('\n');

let _mask = '';
let _mem = [];

const getAddr = memS => parseInt(memS.replace(/[^\d]/g, ''));

const applyMask = v => {
	// Convert the value to 36bit string
	const vv = parseInt(v).toString(2).padStart(36, '0');
	
	return parseInt(_mask					// Take the mask
		.split('')							// Look at every bit
		.map(b => parseInt(b))				// Run it through a parseInt(), if it's 1, or 0, return it, X will throw NaN
		.map((b, i) => isNaN(b) ? vv[i] : b)// for each (b)it, if it's NaN return the bit in the slot vv[i], otherwise, b 
		.join(''), 2);						// smash it back together, convert to number, \o/
}


set.forEach(l => {
	let [ins, v] = l.split(' = ');

	if (ins === 'mask') {
		_mask = v;
	}
	if (ins.indexOf('mem') === 0) {
		_mem[getAddr(ins)] = applyMask(v);
	}
});

console.log('PART 1', _mem.reduce((a, b) => a + b, 0));
