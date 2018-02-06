# callbag-subscribe

A callbag sink (listener) that connects an Observer a-la RxJS.

_This has just a slightly different signature than [`callbag-observe`](https://github.com/staltz/callbag-observe),
for use with observer objects._

`npm install callbag-subscribe`

## Usage:

```js
import pipe from 'callbag-pipe';
import interval from 'callbag-interval';
import subscribe from 'callbag-subscribe';

const source = interval( 10 );

const observer = {
  next: val => console.log( val ),
  error: err => console.error( err ),
  complete: () => console.log( 'Done!' )
};

pipe(
  source,
  subscribe( observer )
);

// 0
// 1
// 2
// 3
// 4
// 5
// 6
// 7
// 8
// 9
// Done!
```
