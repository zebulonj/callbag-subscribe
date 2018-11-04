const test = require( 'tape' );

const subscribe = require( '.' );

const range = function* ( start, end ) {
  let current = start;

  while ( current <= end ) {
    yield current;
    current = current + 1;
  }
}

test( "subscribe() should pull from its source", assert => {
  assert.plan( 2 );

  const source = ( type, data ) => {
    const iter = range( 0, 3 );

    if ( type === 0 ) data( 0, ( t ) => {
      if ( t === 1 ) {
        const { done, value } = iter.next();

        if ( done ) data( 2 );
        else data( 1, value );
      }
    });
  };

  let events = [];
  subscribe({
    next: val => events.push( val ),
    complete: () => assert.pass( 'The source should be exhausted (and complete).' )
  })( source );

  assert.deepEqual( events, [0, 1, 2, 3], 'The sink should pull the expected events.' );
  assert.end();
});

test( "subscribe() should return a disposal function", assert => {
  assert.plan( 2 );

  const source = ( type, data ) => {
    if ( type === 0 ) data( 0, source );
    if ( type === 2 ) {
      assert.pass( 'The source should receive a termination.' );
    }
  };

  const dispose = subscribe({
    next: val => val
  })( source );

  assert.equal( typeof dispose, 'function', 'The subscribe method should return a function.' );

  dispose();

  assert.end();
});

test("subscribe() should accept a function", assert => {
  assert.plan( 1 );

  const source = ( type, data ) => {
    const iter = range( 0, 3 );

    if ( type === 0 ) data( 0, ( t ) => {
      if ( t === 1 ) {
        const { done, value } = iter.next();

        if ( done ) data( 2 );
        else data( 1, value );
      }
    });
  };

  let events = [];
  subscribe(val => events.push( val ))( source );

  assert.deepEqual( events, [0, 1, 2, 3], 'The sink should pull the expected events.' );
  assert.end();
});
