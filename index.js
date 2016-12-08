const range = [320, 1280];

function sizesExtent(sizes) {
	return sizes
		.split(/\s*,\s*/)

		// Parse sizes so we can work with it more efficiently
		.map((segment) => {
			const match = /(?:\(((?:max|min)-width): (\d+)px\)\s*)?(\d+)(px|vw)/.exec(segment);

			return {
				conditional: match[1],
				conditionalValue: match[2] && Number(match[2]),
				value: Number(match[3]),
				valueUnit: match[4]
			};
		})

		// Iterate through segments, calculating min and max px of each segment
		.map((segment, i, segments) => {
			if (segment.valueUnit === 'px') {
				return [segment.value, segment.value];
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
			return [minWidth / 100 * segment.value, maxWidth / 100 * segment.value];
		})

		// Calculate overall min and max
		.reduce(([min, max], [segmentMin, segmentMax]) => {
			return [Math.min(min, segmentMin), Math.max(max, segmentMax)];
		}, [Infinity, 0]);
}

module.exports = sizesExtent;