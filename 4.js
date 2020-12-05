const fs = require('fs');


let passports = fs.readFileSync('./4.txt', 'utf-8');
passports = passports.split('\n\n');
let numValid = 0;
let numValid2 = 0;

const keys = ['byr', 'iyr', 'eyr', 'hgt', 'hcl', 'ecl', 'pid', 'cid'];
const reqd = ['byr', 'iyr', 'eyr', 'hgt', 'hcl', 'ecl', 'pid'];
const __ECL = ['amb', 'blu', 'brn', 'gry', 'grn', 'hzl', 'oth'];
keys.sort();
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

.forEach(p => {
	let isValid2 = true;
	if (parseInt(p['byr']) < 1920 ||
		parseInt(p['byr']) > 2002) {
		console.log('FAIL BYR', p['byr']);
		isValid2 = false;
	}
	else {
		console.log('VALID BYR', p['byr']);
	}

	if (parseInt(p['iyr']) < 2010 ||
		parseInt(p['iyr']) > 2020) {
		console.log('FAIL IYR', p['iyr']);
		isValid2 = false;
	}
	else {
		console.log('VALID IYR', p['iyr']);
	}
	if (parseInt(p['eyr']) < 2020 ||
		parseInt(p['eyr']) > 2030) {
		console.log('FAIL EYR', p['eyr']);
		isValid2 = false;
	}
	else {
		console.log('VALID EYR', p['eyr']);
	}

	// HGT
	if (/cm/.test(p['hgt'])) {
		if (parseInt(p['hgt']) < 150 ||
			parseInt(p['hgt']) > 193) {
			console.log('FAIL HGT CM', p['hgt']);
			isValid2 = false;
		}
		else {
			console.log('VALID HGT CM', p['hgt']);
		}
	}
	else if (/in/.test(p['hgt'])) {
		if (parseInt(p['hgt']) < 59 ||
			parseInt(p['hgt']) > 76) {
			console.log('FAIL HGT IN', p['hgt']);
			isValid2 = false;
		}
		else {
			console.log('VALID HGT IN', p['hgt']);
		}
	}
	else {
		isValid2 = false;
		console.log('FAIL HGT NO UNIT', p['hgt']);
	}

	// HCL
	if (!/\#[0-9a-f]{6}/.test(p['hcl'])) {
		isValid2 = false;
		console.log('FAIL HCL', p['hcl']);
	}
	else if (p['hcl'].length !== 7) {
		isValid2 = false;
	}
	else {
		console.log('VALID HCL', p['hcl']);
	}

	// ECL
	if (!__ECL.includes(p['ecl'])) {
		isValid2 = false;
		console.log('FAIL ECL', p['ecl']);
	}
	else {
		console.log('VALID ECL', p['ecl']);
	}

	if (!/[0-9]{9}/.test(p['pid'])) {
		isValid2 = false;
		console.log('FAIL PID', p['pid']);
	}
	else if (p['pid'].length !== 9) {
		console.log('FAIL PID LENGTH', p['pid'].length);
		isValid2 = false;
	}
	else {
		console.log('VALID PID', p['pid']);
	}

	//console.log(p, isValid2);
	isValid2 && numValid2++;
});

console.log('Num Valid 1: ', numValid);

console.log('Num Valid 2: ', numValid2);
