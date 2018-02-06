const subscribe = ({ next, error, complete }) => source => {
  source(0, (t, d) => {
    if (t === 1) next(d);
    if (t === 2 && !d && complete) complete();
    if (t === 2 && !!d && error) error( d );
  });
}

module.exports = subscribe;
