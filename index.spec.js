const test = require( 'tape' );

const subscribe = require( './index' );

test( "disposal", assert => {
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
