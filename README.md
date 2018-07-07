# callbag-subscribe 👜

[![CircleCI](https://img.shields.io/circleci/project/zebulonj/callbag-subscribe.svg)]() [![npm](https://img.shields.io/npm/v/callbag-subscribe.svg)]() [![npm](https://img.shields.io/npm/dt/callbag-subscribe.svg)]()

A callbag sink (listener) that connects an Observer a-la RxJS.

`npm install callbag-subscribe`

## Usage:

### Simple (next only)

```js
import pipe from 'callbag-pipe';
import interval from 'callbag-interval';
import subscribe from 'callbag-subscribe';

const source = interval( 10 );

pipe(
  source,
  subscribe( val => console.log( val ) )
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
```

### Complete observer

```js
import pipe from 'callbag-pipe';
import interval from 'callbag-interval';
import subscribe from 'callbag-subscribe';

const source = interval( 10 );

pipe(
  source,
  subscribe({
    next: val => console.log( val ),
    complete: () => console.log( 'Done!' ),
    error: err => console.error( err )
  })
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

### Disposal

Use the returned disposal function to terminate the subscription.

```js
const source = fromEvent( document.body, 'click' );

const dispose = pipe(
  source,
  subscribe({
    next: ev => console.log( 'Click:', ev )
  })
);

// Do some stuff...

dispose(); // Terminate the subscription.
```
