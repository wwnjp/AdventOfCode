const fs = require('fs');


let map = fs.readFileSync('./3.txt', 'utf-8');
map = map.split('\n');

const length = map[0].length;
const directions = [[1, 1], [3, 1], [5, 1], [7, 1], [1, 2]];
let numTrees = directions.map(d => 0);

console.log('INIT', numTrees);

directions.forEach((direction, idx) => {
	let j = 0, k = 0;
	for (let k = 0; k < map.length; k += direction[1]) {
		if (map[k][j] === '#') {
			numTrees[idx]++;
		}
		j = (j + direction[0]) % length;
	}

	console.log('NUM TREES: ', numTrees[idx]);
});

console.log(numTrees.reduce((a, b) => a * b, 1));
