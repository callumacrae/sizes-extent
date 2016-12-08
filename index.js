const range = [320, 1280];

function sizesExtent(sizes) {
	const extent = sizes
		.split(/\s*,\s*/)

		// Parse sizes so we can work with it more efficiently
		.map((segment) => {
			const match = /(?:\(((?:max|min)-width): (\d+(?:\.\d+)?)px\)\s*)?(.+)/.exec(segment);

			return {
				conditional: match[1],
				conditionalValue: match[2] && Number(match[2]),
				value: match[3]
			};
		})

		// Iterate through segments, calculating min and max px of each segment
		.map((segment, i, segments) => {
			if (!segment.value.includes('vw')) {
				return [parseFloat(segment.value), parseFloat(segment.value)];
			}

			const previous = segments[i - 1];
			let minWidth, maxWidth;

			// Calculate min and max width of screen for this segment
			if (segments[0].conditional === 'max-width') {
				minWidth = previous ? previous.conditionalValue : range[0];
				maxWidth = segment.conditional ? segment.conditionalValue : range[1];
			} else {
				minWidth = segment.conditional ? segment.conditionalValue : range[0];
				maxWidth = previous ? previous.conditionalValue : range[1];
			}

			// Calculate min and max width of image for this segment
			return [calculate(minWidth, segment.value), calculate(maxWidth, segment.value)];
		})

		// Calculate overall min and max
		.reduce(([min, max], [segmentMin, segmentMax]) => {
			return [Math.min(min, segmentMin), Math.max(max, segmentMax)];
		}, [Infinity, 0]);

	return (isNaN(extent[0]) || isNaN(extent[1])) ? null : extent;
}

function calculate(width, segmentValue) {
	if (!segmentValue.includes('calc(')) {
		return width / 100 * parseFloat(segmentValue);
	}

	const match = /calc\((\d+(?:\.\d+)?)vw\s*([+-])\s*(\d+(?:\.\d+)?)px\)/.exec(segmentValue);

	if (!match) {
		return null;
	}

	return width / 100 * Number(match[1]) + (match[2] === '+' ? 1 : -1) * Number(match[3]);
}

module.exports = sizesExtent;