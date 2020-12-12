const fs = require('fs');
const dir = fs.readFileSync('./inputs/12.txt', 'utf-8').trim().split('\n');

const H = 'NESW'.split('');
let _e = 0;
let _n = 0;
let _h = 1;

const go = (d, v) => {
	switch(d) {
		case 'N': _n += v; break;
		case 'S': _n -= v; break;
		case 'E': _e += v; break;
		case 'W': _e -= v; break;
	}
};

dir.forEach(l => {
	let d = l.substr(0,1);
	let v = parseInt(l.substr(1));

	switch(d) {
		case 'N':
		case 'S':
		case 'E':
		case 'W': go(d, v); break;
		case 'L': _h -= (v / 90); _h %= 4; _h = _h < 0 ? _h + 4: _h; break;
		case 'R': _h += (v / 90); _h %= 4; break;
		case 'F': go(H[_h], v); break;
	}
});

console.log('PART 1', Math.abs(_e) + Math.abs(_n));
