const fs = require('fs');
const dir = fs.readFileSync('./inputs/12.txt', 'utf-8').trim().split('\n');

let _es = 0, _ew = 10;
let _ns = 0, _nw = 1;
let _t;

// 90 x , y   -> y , -x;
// 180 x, y -> -x, -y;
// 270 x, y -> -y, x;
const r = (v, d, d2) => {
	switch (v) {
		case 90: _t = _nw * d2; _nw = _ew * d; _ew = _t; break;
		case 180: _nw = -_nw; _ew = -_ew; break;
		case 270: _t = _nw * d; _nw = _ew * d2; _ew = _t; break;
	}
}

const go = (d, v) => {
	switch(d) {
		case 'N': _nw += v; break;
		case 'S': _nw -= v; break;
		case 'E': _ew += v; break;
		case 'W': _ew -= v; break;
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
		case 'W': go(d, v);    break;
		case 'L': r(v, 1, -1); break;
		case 'R': r(v, -1, 1); break;
		case 'F': go2(v);      break;
	}

	//console.log('>>>', _, _es, _ns, _ew, _nw);
});

console.log('PART 2', Math.abs(_es) + Math.abs(_ns));
