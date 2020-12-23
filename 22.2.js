const fs = require('fs');
const input = fs.readFileSync('./inputs/22.txt', 'utf-8').trim().split('\n\n');
const init = input.map(i => i.split(':\n')[1].split('\n').map(Number));


const game = (players, isSub) => {
	let prevPlays = [];

	while (players.every(p => p.length)) {
		let winner;
		// Handle decks we have seen before, if found, player 1 instantly wins
		if (prevPlays.includes(players.map(p => p.join(',')).join(','))) {
			winner = 0;
			break;
		}
		else {
			prevPlays.push(players.map(p => p.join(',')).join(','));
		}

		const plays = players.map(p => p.shift());

		if (players.every((p, i) => p.length >= plays[i])) {
			winner = game(players.map((p,i) => p.slice(0, plays[i])), true);
		} 
		else {
			winner = plays.indexOf(Math.max(...plays));
		}

		players[winner].push(plays.find((p, i) => i === winner));
		players[winner].push(plays.find((p, i) => i !== winner));
	}

	return isSub ? players.findIndex(p => p.length) : players.find(p => p.length);
};

const winnerwinner = game(init, false);

console.log('PART 2', winnerwinner, winnerwinner.map((c, i, a) => c * (a.length - i)).reduce((a, b) => a + b, 0));
