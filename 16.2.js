const fs = require('fs');
const input = fs.readFileSync('./inputs/16.txt', 'utf-8').trim().split('\n');


// This is a mess, there is definitely a cleaner solution...

let fields = [];
let rules = {};
let my = [];
let other = [];

let section = 0;


const addRule = line => {
	const [name, vals] = line.split(': ');
	rules[name] = vals.split(' or ');
};

const addMy = line => {
	if (line.indexOf(':') === -1) {
		my = line.split(',').map(v => parseInt(v));
	}
};

const addOther = line => {
	if (line.indexOf(':') === -1) {
		other.push(line.split(',').map(v => parseInt(v)));
	}
};


const getInvalids = ticket => 
	ticket.filter(v => {
		let yes = [];
		for (rule in rules) {
			yes.push(rules[rule].map(r => {
				const [min, max] = r.split('-').map(f => parseInt(f));
				return (v >= min && v <= max);
			}).some(r => r));
		}

		return yes.every(y => !y);
	});


const getPossibleMappings = ticket => 
	ticket.map(v => {
		let yes = [];
		for (rule in rules) {
			yes.push(rules[rule].map(r => {
				const [min, max] = r.split('-').map(f => parseInt(f));
				return (v >= min && v <= max);
			}).some(r => r));
		}

		return yes;
	});

// Parse this f of an input file
input.forEach(l => {
	if (l.length === 0) {
		section++;
	}

	else {
		switch (section) {
			case 0: addRule(l); break;
			case 1: addMy(l); break;
			case 2: addOther(l); break;
		}
	}
});

//console.log('Rules: ', rules);
//console.log('My: ', my);
console.log('# Other', other.length);

const good = other.filter(o => {
	return getInvalids(o).length === 0;
});

console.log('# Valid', good.length);


//good.forEach(g => {
//	console.log(g, getPossibleMappings(g));
//});


// Iterate over every rule, find all the trues, set into field
/*
 * 3   15  5     !seat !class    row
 * 9   1   14    !seat           [class, row] -> class
 * 18  5   9     *               [class, seat, row] -> ![class, row], -> seat
 *
 *
 */

const ruleList = Object.keys(rules);
const goodRules = good.map(g => getPossibleMappings(g));


let possibles = goodRules[0].map((_, i) => {
	let pos = Array(goodRules[0].length).fill(true);

	for (let j = 0; j < goodRules.length; j++) {
		for (let k = 0; k < goodRules[j][i].length; k++) {
			if (!goodRules[j][i][k]) {
				pos[k] = false;
			}
		}
	}

	return pos.map((p, i) => p ? i : undefined).filter(p => p !== undefined);
});

const checkFinal = l => l.every(_ => typeof _ === 'number');

while(!checkFinal(possibles)) {
	possibles = possibles.map(p => {
		if (typeof p === 'number') {
			return p;
		}
		if (p.length === 1) {
			return p[0];
		}
		else {
			return p.filter(o => !possibles.includes(o));
		}
	});
}


const finalLabels = possibles.map(p => ruleList[p]);

const finalfinal = finalLabels.map((f, i) => f.indexOf('departure') === 0 ? my[i] : undefined).filter(f => f !== undefined).reduce((a, b) => a * b, 1);

console.log('PART 2: ', finalfinal);
