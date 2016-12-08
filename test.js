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
		input: '(max-width: 1000px) 100vw, 30vw',
		output: [300, 1000]
	},
	{
		input: '(min-width: 800px) 400px, 50vw',
		output: [160, 400]
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

	if (JSON.stringify(extent) === JSON.stringify(testCase.output)) {
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