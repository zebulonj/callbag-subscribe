const subscribe = (listener = {}) => source => {
  if (typeof listener === "function") {
    listener = { next: listener };
  }

  let { next, error, complete } = listener;
  let talkback;

  source(0, (t, d) => {
    if (t === 0) {
      talkback = d;
    }
    if (t === 1 && next) next(d);
    if (t === 1 || t === 0) talkback(1);  // Pull
    if (t === 2) {
      talkback = null;
      if (!d && complete) complete();
      if (!!d && error) error( d );
    }
  });

  const dispose = () => {
    if (talkback) talkback(2);
  }

  return dispose;
}

export default subscribe;
