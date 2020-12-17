const fs = require('fs');
const input = fs.readFileSync('./inputs/16.txt', 'utf-8').trim().split('\n');

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


const getInvalids = ticket => {
	return ticket.filter(v => {
		let yes = [];
		for (rule in rules) {
			yes.push(rules[rule].map(r => {
				const [min, max] = r.split('-').map(f => parseInt(f));
				return (v >= min && v <= max);
			}).some(r => r));
		}
		console.log('>>', v, yes);

		return yes.every(y => !y);
	});
};

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
console.log('My: ', my);
console.log('Is Valid: ', getInvalids(my));

const invalids = [];
other.forEach(o => {
	getInvalids(o).forEach(v => invalids.push(v));
});



console.log('PART 1:', invalids.reduce((a, b) => a + b, 0)); 
