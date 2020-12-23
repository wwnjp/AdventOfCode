const fs = require('fs');
// Read the file in, since the players are separated by \n\n, split on that, which 
// will dump input into 2 player blobs
const input = fs.readFileSync('./inputs/22.txt', 'utf-8').trim().split('\n\n');

// Parse out the cards by player. We can throw out the names (everything before the ":"
// after the ':', it's 1 card per line. map(Number) will convert to int from a string.
// after this runs, you'll 1 array in players: (using 22.test.txt as example)
// [ [9, 2, 6, 3, 1], [5, 8, 4, 7, 10] ]
const players = input
	.map(i => i
		.split(':\n')[1]
		.split('\n')
		.map(Number));

// game will end when 1 player has 0 cards
// while every player still has cards... 
while (players.every(p => p.length)) {
	// plays pull out the first card from each deck (p.shift()).
	// return from the .shift() is the first value, popped off the array.
	const plays = players.map(p => p.shift());

	// we want to know the index of the winner, which would be whichever has the highest card
	// Math.max(...plays) finds the number, .indexOf() finds the player who won.
	const winner = plays.indexOf(Math.max(...plays));

	// winner getes both cards, at the bottom of their deck, highest first.
	players[winner].push(...plays.sort((a, b) => a > b ? -1 : 1));
}

// find the winning player, map the value of the card with its inverse index, sum it all
console.log('PART 1', players.find(p => p.length).map((c, i, a) => c * (a.length - i)).reduce((a, b) => a + b, 0));
