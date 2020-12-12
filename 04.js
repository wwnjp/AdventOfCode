const fs = require('fs');

let passports = fs.readFileSync('./inputs/4.txt', 'utf-8');
passports = passports.split('\n\n');
let numValid = 0;
let numValid2 = 0;

const reqd = ['byr', 'iyr', 'eyr', 'hgt', 'hcl', 'ecl', 'pid'];
const __ECL = ['amb', 'blu', 'brn', 'gry', 'grn', 'hzl', 'oth'];
reqd.sort();

// Parse Obj
passports = passports.map(p => {
	const entries = p.split(/\s/);
	let o = {};
	p.split(/\s/).forEach(e => {
		if (e.length) {
			o[e.split(':')[0]] = e.split(':')[1];
		}
	});
	return o;
});


// PART 1
passports.filter(p => {
	let k = Object.keys(p);
	let isValid = true;
	reqd.forEach(r => {
		if (!k.includes(r)) {
			isValid = false;
		}
	});

	isValid && numValid++;
	return isValid;
})

// PART 2
.forEach(p => {
	let isValid = true;
	
	// BYR
	if (parseInt(p['byr']) < 1920 ||
		parseInt(p['byr']) > 2002) {
		isValid = false;
	}

	// IYR
	if (parseInt(p['iyr']) < 2010 ||
		parseInt(p['iyr']) > 2020) {
		isValid = false;
	}

	// EYR
	if (parseInt(p['eyr']) < 2020 ||
		parseInt(p['eyr']) > 2030) {
		isValid = false;
	}

	// HGT
	if (/cm/.test(p['hgt'])) {
		if (parseInt(p['hgt']) < 150 ||
			parseInt(p['hgt']) > 193) {
			isValid = false;
		}
	}
	else if (/in/.test(p['hgt'])) {
		if (parseInt(p['hgt']) < 59 ||
			parseInt(p['hgt']) > 76) {
			isValid = false;
		}
	}
	else {
		isValid = false;
	}

	// HCL
	if (!/\#[0-9a-f]{6}/.test(p['hcl'])) {
		isValid = false;
	}
	else if (p['hcl'].length !== 7) {
		isValid = false;
	}

	// ECL
	if (!__ECL.includes(p['ecl'])) {
		isValid = false;
	}

	// PID
	if (!/[0-9]{9}/.test(p['pid'])) {
		isValid = false;
	}
	else if (p['pid'].length !== 9) {
		isValid = false;
	}

	isValid && numValid2++;
});

console.log('PART 1: Num Valid: ', numValid);
console.log('PART 2: Num Valid: ', numValid2);
