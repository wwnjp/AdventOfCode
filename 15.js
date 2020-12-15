
const nums = [2,0,6,12,1,3];

let game = nums;
let rounds = 2020; // PART 1
//let rounds = 30000000; // PART 2
let turn = nums.length - 1;


// storing the hash of which numbers we've seen
// makes this run much faster.
// after init:
// [0] = 0 //0th index
// [3] = 1
// [6] = 2
// When program runs, look in the finds to see if it exists
let finds = [];
game.forEach((g, i) => finds[g] = i); 


while (turn < rounds) {
	if (turn % 100000 === 0) {
		console.log(turn, ~~((turn / rounds) * 100) + '%');
	}

	p = finds[game[turn]] !== undefined ? finds[game[turn]] : -1;

	game.push(p < 0 ? 0 : turn - p);
	finds[game[turn]] = turn;

	turn++;
}

console.log('TURN ', turn, game[turn - 1]);
