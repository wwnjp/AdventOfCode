const fs = require('fs');
const o = fs.readFileSync('./inputs/8.txt', 'utf-8').trim().split('\n')
	.map(l => l.split(' '));

let swapped = false;

const runStack = (swapLine) => {
	let acc = 0;
	let i = 0;
	const stack = [];

	while (1) {
		if (!o[i]) {
			console.log('GRACEFUL TERMINATION', acc);
			return true;
		}
		const [cmd, num] = o[i];

		switch (cmd) {
			case 'nop':
				i += (swapLine === i) ? parseInt(num) : 1;
				break;
			case 'acc':
				acc += parseInt(num);
				i++;
				break;
			case 'jmp':
				i += (swapLine === i) ? 1 : parseInt(num);
				break;
			default:
				break;
		}

		if (stack.includes(i)) {
			return swapLine ? false : stack;
		}

		stack.push(i);
	}
};

// Run the first time, build the stack.
const _original = runStack();

_original.forEach(line => {
	if (!/acc/.test(o[line][0])) {
		runStack(line);
	}
});

