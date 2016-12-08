const chalk = require('chalk');
const sizesExtent = require('./');

const ft = ["(min-width: 1220px) 376px, (min-width: 980px) 296px, (min-width: 740px) 688px, calc(100vw - 40px)", "(min-width: 1220px) 574px, (min-width: 980px) 454px, (min-width: 740px) 688px, calc(100vw - 40px)", "(min-width: 1220px) 574px, (min-width: 980px) 454px, (min-width: 740px) 688px, calc(100vw - 40px)", "(min-width: 1220px) 574px, (min-width: 980px) 454px, (min-width: 740px) 688px, calc(100vw - 40px)", "(min-width: 1220px) 574px, (min-width: 980px) 454px, (min-width: 740px) 688px, calc(100vw - 40px)", "(min-width: 1220px) 574px, (min-width: 980px) 454px, (min-width: 740px) 688px, calc(100vw - 40px)", "(min-width: 1220px) 574px, (min-width: 980px) 454px, (min-width: 740px) 688px, calc(100vw - 40px)", "(min-width: 1220px) 574px, (min-width: 980px) 454px, (min-width: 740px) 688px, calc(100vw - 40px)", "(min-width: 1220px) 574px, (min-width: 980px) 454px, (min-width: 740px) 688px, calc(100vw - 40px)", "(min-width: 1220px) 574px, (min-width: 980px) 454px, (min-width: 740px) 688px, calc(100vw - 40px)", "(min-width: 1220px) 574px, (min-width: 980px) 454px, (min-width: 740px) 688px, calc(100vw - 40px)", "(min-width: 740px) NaNpx, calc(NaNvw - NaNpx)", "(min-width: 1220px) 376px, (min-width: 980px) 296px, (min-width: 740px) 688px, calc(100vw - 40px)", "(min-width: 1220px) 376px, (min-width: 980px) 296px, (min-width: 740px) 688px, calc(100vw - 40px)", "(min-width: 1220px) 376px, (min-width: 980px) 296px, (min-width: 740px) 688px, calc(100vw - 40px)", "(min-width: 1220px) 376px, (min-width: 980px) 296px, (min-width: 740px) 688px, calc(100vw - 40px)", "(min-width: 1220px) 376px, (min-width: 980px) 296px, (min-width: 740px) 688px, calc(100vw - 40px)", "(min-width: 1220px) 673px, (min-width: 980px) 533px, (min-width: 740px) 688px, calc(100vw - 40px)", "(min-width: 1220px) 475px, (min-width: 980px) 375px, (min-width: 740px) 334px, calc(100vw - 40px)", "(min-width: 1220px) 376px, (min-width: 980px) 296px, (min-width: 740px) 334px, calc(100vw - 40px)", "(min-width: 1220px) 376px, (min-width: 980px) 296px, (min-width: 740px) 334px, calc(100vw - 40px)", "(min-width: 1220px) 376px, (min-width: 980px) 296px, (min-width: 740px) 334px, calc(100vw - 40px)"]
const misc = ["(max-width: 255px) 255px, 100vw", "(max-width: 697px) 697px, 100vw", ["(max-width: 255px) 255px, 100vw", "(max-width: 697px) 697px, 100vw"]]


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
		input: '(max-width: 1000px) 100vw, 30vw',
		output: [300, 1000]
	},
	{
		input: '(max-width: 600px) 100vw, (max-width: 1000px) 30vw, 10vw',
		output: [100, 600]
	},
	{
		input: '(min-width: 800px) 400px, 50vw',
		output: [160, 400]
	},
	{
		input: '(min-width: 1220px) 574px, (min-width: 980px) 454px, (min-width: 740px) 688px, 100vw',
		output: [320, 740]
	}
	// {
	// 	input: '(min-width: 1220px) 574px, (min-width: 980px) 454px, (min-width: 740px) 688px, calc(100vw - 40px)',
	// 	output: [454, 700]
	// },
	// {
	// 	input: '(min-width: 1220px) 376px, (min-width: 980px) 296px, (min-width: 740px) 688px, calc(100vw - 40px)',
	// 	output: [296, 700]
	// }
];

let failures = 0;

cases.forEach((testCase) => {
	const extent = sizesExtent(testCase.input);

	if (extent.join() === testCase.output.join()) {
		console.log(chalk.bold.green('✓') + ' ' + testCase.input);
	} else {
		console.log(chalk.bold.red('✘ ' + testCase.input));
		console.log(`Expected [${testCase.output}], got [${extent}]`);
		console.log();
		failures++;
	}
});

process.exit(failures);