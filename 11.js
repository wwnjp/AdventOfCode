const fs = require('fs');
let map = fs.readFileSync('./inputs/11.txt', 'utf-8').trim().split('\n').map(_ => _.split(''));
const is = (c,y,x) => map[y] && map[y][x] && map[y][x] === c;

const look = (y,x,dx,dy) => {
	let xx=x,yy=y;
	do {xx+=dx;yy+=dy;} while (is('.',yy,xx));
	return is('#',yy,xx);
};

const yarp = (y,x) => 
	[[-1,-1],[0,-1],[1,-1],[-1,0],[1,0],[-1,1],[0,1],[1,1]]
		.map(s=>look(y,x,s[0],s[1]))
		.filter(s=>s).length;

const changes = (t) => 
	map.map((line,y) => 
		line.map((l,x) => 
			(is('L',y,x) && !yarp(y,x))?'#':
			(is('#',y,x) && yarp(y,x)>t)?'L':
			l));

const sameee = _ => JSON.stringify(_) === JSON.stringify(map);
const ct = m => m.map(_ => _.join('')).join('').split('').filter(_ => _ === '#').length;

const up = t => {
	const _m = changes(t);

	if (sameee(_m)) throw ct(_m);
	return map = _m;
}

try {
	while(up(4));
}
catch (e) {
	console.log('PART 2:', e);
}

