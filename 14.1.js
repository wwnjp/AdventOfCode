const fs = require('fs');
const set = fs.readFileSync('./inputs/14.txt', 'utf-8').trim().split('\n');

let _mask = '';
let _mem = [];

const getAddr = memS => parseInt(memS.replace(/[^\d]/g, ''));

const applyMask = v => {
	const vv = parseInt(v).toString(2).padStart(36, '0');
	
	return parseInt(_mask
		.split('')
		.map(b => parseInt(b))
		.map((b, i) => isNaN(b) ? vv[i] : b)
		.join(''), 2);
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
