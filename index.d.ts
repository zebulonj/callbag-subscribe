import { Source } from 'callbag';

type Listener<T> = (data: T) => any;

type Subscriber<T> = {
    next?: Listener<T>,
    error?: (err: any) => any,
    complete?: () => any,
};

type Dispose = () => void;

declare const subscribe: <T>(
  listener: Listener<T> | Subscriber<T>
) => (source: Source<T>) => Dispose;

export default subscribe;
