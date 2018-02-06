const subscribe = ({ next, error, complete }) => source => {
  let talkback;

  source(0, (t, d) => {
    if (t === 0) {
      talkback = d;
    }
    if (t === 1) next(d);
    if (t === 2 && !d && complete) complete();
    if (t === 2 && !!d && error) error( d );
  });

  const dispose = () => {
    if (talkback) talkback(2);
  }

  return dispose;
}

module.exports = subscribe;
