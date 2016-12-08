# sizes-extent

> When given the `sizes` attribute of a responsive image and a range of screen
> widths, will calculate the maximum and minimum widths of the image that will
> be displayed.

## Installation

```
$ npm install --save sizes-extent
```

## Usage

```
const sizesExtent = require('sizes-extent');

sizesExtent('(max-width: 1000px) 100vw, 30vw'); // [300, 1000]
```

## License

Released under the MIT license.
