import { Observable, Observer, of, pipe } from 'rxjs';
import { map, filter, delay, scan, tap } from 'rxjs/operators';

const myObservable = new Observable((subscriber) => {
  subscriber.next('HOLA');
  subscriber.next(10);
  subscriber.next(20);
  subscriber.error('error');
});
const myObservable2 = new Observable((subscriber) => {
  subscriber.complete();
});

//myObservable.subscribe(myObserver);
const mpipe = myObservable.pipe(
  filter((r: any) => !isNaN(r)),
  map((r: any) => {
    return r + 10;
  })
);

const myObserver: Observer<any> = {
  next: (x) => {
    if (!isNaN(x)) {
      console.log(x + 10);
    } else {
      console.log(`'${x}': no es un numero`);
    }
  },
  error: (err) => console.error(err),
  complete: () => console.log('mi trabajo aqui esta realizado'),
};

const toggle = () =>
  pipe(
    scan((acc, value: any) => {
      const newValue = value.a;
      if (newValue % 2 === 0) {
        acc.push(newValue);
      }
      return acc;
    }, []),
    tap((v) => console.log(v))
  );

const fakeData = [{ a: 1 }, { a: 2 }, { a: 3 }, { a: 4 }];

const source2 = of(...fakeData).pipe(
  toggle(),
  map((x) => `Hello ${x.a}!`)
);

const source = of('wordl').pipe(
  map((x) => `hello ${x}`),
  tap((ev) => console.log(ev + 'asd')),
  delay(5000),
  scan((acc, one) => acc + one, 'Prueba'),
  filter((x) => x.includes('hola'))
);
source.subscribe();
source2.subscribe(console.log);
mpipe.subscribe(myObserver);
