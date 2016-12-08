const chalk = require('chalk');
const sizesExtent = require('./');

const cases = [
	{
		input: '50px',
		output: [50, 50]
	},
	{
		input: '50vw',
		output: [160, 640]
	},
	{
		input: 'calc(50vw - 50px)',
		output: [110, 590]
	},
	{
		input: 'calc(50vw + 20px)',
		output: [180, 660]
	},
	{
		input: 'calc(33.5vw + 20.8px)',
		output: [128, 449.6]
	},
	{
		input: '(max-width: 1000px) 100vw, 30vw',
		output: [300, 1000]
	},
	{
		input: '(min-width: 800px) 400px, 50vw',
		output: [160, 400]
	},
	{
		input: '(min-width: 800.5px) 400.2px, 40.2vw',
		output: [128.64, 400.2]
	},
	{
		input: '(max-width: 600px) 100vw, (max-width: 1000px) 30vw, 10vw',
		output: [100, 600]
	},
	{
		input: '(min-width: 1220px) 574px, (min-width: 980px) 454px, (min-width: 740px) 688px, 100vw',
		output: [320, 740]
	},
	{
		input: '(min-width: 1220px) 574px, (min-width: 980px) 454px, (min-width: 740px) 688px, calc(100vw - 40px)',
		output: [280, 700]
	},
	{
		input: '(min-width: 1220px) 376px, (min-width: 980px) 260px, (min-width: 740px) 688px, calc(100vw - 40px)',
		output: [260, 700]
	},
	{
		input: '(min-width: 1220px) calc(100vw + 40px), (min-width: 980px) 260px, (min-width: 740px) 688px, calc(100vw - 40px)',
		output: [260, 1320]
	},
	{
		input: '(min-width: 1220px) calc(99.9vw + 40.5px), (min-width: 980.6px) 257.4px, (min-width: 740.2px) 688px, calc(100.1vw - 40.5px)',
		output: [257.4, 1319.22]
	},
	{
		input: 'broken input',
		output: null
	},
	{
		input: 'calc(nope)',
		output: null
	},
	{
		input: '(min-width: 1220px) calc(100vw + 40px), (min-width: nope) 260px, (min-width: 740px) 688px, calc(100vw - 40px)',
		output: null
	},
	{
		input: '(min-width: 1220px) calc(100vw + 40px), (min-width: 980px) calc(nope), (min-width: 740px) 688px, calc(100vw - 40px)',
		output: null
	}
];

let failures = 0;

cases.forEach((testCase) => {
	const extent = sizesExtent(testCase.input);

	if (equal(extent, testCase.output)) {
		console.log(chalk.bold.green('✓') + ' ' + testCase.input + chalk.dim(' === ' + format(testCase.output)));
	} else {
		console.log(chalk.bold.red('✘ ' + testCase.input));
		console.log(`Expected ${format(testCase.output)}, got ${format(extent)}`);
		console.log();
		failures++;
	}
});

process.exit(failures);

function format(obj) {
	return JSON.stringify(obj).replace(',', ', ');
}

function equal(a, b) {
	if (Array.isArray(a) && Array.isArray(b)) {
		return equal(a[0], b[0]) && equal(a[1], b[1]);
	}

	if (typeof a === 'number' && typeof b === 'number') {
		return Math.abs(a - b) < 1e-10; // For some reason Number.EPSILON won't do
	}

	return a === b;
}