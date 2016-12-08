# sizes-extent

> When given the `sizes` attribute of a responsive image and a range of screen
> widths, will calculate the maximum and minimum widths of the image that will
> be displayed.

## Installation

```
$ npm install --save sizes-extent
```

## Usage

```js
const sizesExtent = require('sizes-extent');

sizesExtent('(max-width: 1000px) 100vw, 30vw'); // [300, 1000]
```

It can handle pretty much anything you throw at it—even `calc()` (although only
simple calculations). See the test cases for some complicated examples.

If something doesn't work, open an issue and I'll fix it (or send a PR!)

If given invalid input or input it doesn't understand, it'll return `null`.

## License

Released under the MIT license.
