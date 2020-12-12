const fs = require('fs');
let dir = fs.readFileSync('./inputs/12.txt', 'utf-8').trim().split('\n');

let _es = 0, _ew = 10;
let _ns = 0, _nw = 1;

const l = v => {
	// 90 x , y   -> y , -x;
	// 180 x, y -> -x, -y;
	// 270 x, y -> -y, x;

	switch (v) {
		case 90: t = _nw; _nw = _ew; _ew = -t; break;
		case 180: _nw = -_nw; _ew = -_ew; break;
		case 270: t = _nw; _nw = -_ew; _ew = t; break;
		default: break;
	}
}

const r = v => {
	// 90 x , y   -> y , -x;
	// 180 x, y -> -x, -y;
	// 270 x, y -> -y, x;

	switch (v) {
		case 90: t = _nw; _nw = -_ew; _ew = t; break;
		case 180: _nw = -_nw; _ew = -_ew; break;
		case 270: t = _nw; _nw = _ew; _ew = -t; break;
		default: break;
	}
}

const go = (d, v) => {
	switch(d) {
		case 'N': _nw += v; break;
		case 'S': _nw -= v; break;
		case 'E': _ew += v; break;
		case 'W': _ew -= v; break;
		default: break;
	}
};

const go2 = (v) => {
	_ns += _nw * v;
	_es += _ew * v;
};

dir.forEach(_ => {
	let d = _.substr(0,1);
	let v = parseInt(_.substr(1));

	switch(d) {
		case 'N':
		case 'S':
		case 'E':
		case 'W': go(d, v); break;
		case 'L': l(v); break;
		case 'R': r(v); break;
		case 'F': go2(v); break;
		default: break;
	}

	console.log('>>>', _, _es, _ns, _ew, _nw);
});

console.log('PART 2', Math.abs(_es) + Math.abs(_ns));
