const fs = require('fs');
const set = fs.readFileSync('./inputs/14.txt', 'utf-8').trim().split('\n');

let _mask = '';
let _mem = [];

const getAddr = m => parseInt(m.replace(/[^\d]/g, ''));

const applyVals = (addr, v) => {
	let maskBits = _mask.split('');
	let numAddrs = maskBits.filter(b => b === 'X').length;
	let p = 0;
	let xplace = 0;
	let addrBits = addr.toString(2).padStart(36, '0').split('');

	for (let i = 0; i < Math.pow(2, numAddrs); i++) {
		xplace = 0;
		p = i.toString(2).padStart(numAddrs, '0').split('');

		let memAddr = parseInt(maskBits.map((b, j) => {
			if (b === '1') { return '1'; }
			if (b === '0') { return addrBits[j]; }
			if (b === 'X') { return p[xplace++]; }
		}).map(b => parseInt(b)).join(''), 2);

		_mem[memAddr.toString()] = v;
	}
}


set.forEach(l => {
	let [ins, v] = l.split(' = ');

	if (ins === 'mask') {
		_mask = v;
	}
	if (ins.indexOf('mem') === 0) {
		applyVals(getAddr(ins), parseInt(v));
	}
});

let sum = 0;
for (i in _mem) {
	if (_mem[i]) {
		sum += _mem[i];
	}
}

console.log('PART 2:', sum);
