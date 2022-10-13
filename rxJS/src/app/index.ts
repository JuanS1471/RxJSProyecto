import { interval, Observable, Observer, of, pipe } from 'rxjs';
import { map, filter, delay, scan, tap, mergeMap, skipUntil, shareReplay, catchError } from 'rxjs/operators';
import {ajax} from 'rxjs/ajax'
import { fromEvent } from 'rxjs';

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
///////////////////////////////////////////
const API_URL = 'https://rickandmortyapi.com/api/character/1';

const click$ = fromEvent(document, 'click');

click$
  .pipe(
    map((data) => {
      if (data.isTrusted) {
        return 10;
      }
    }),
    mergeMap((id) => ajax.getJSON(`${API_URL}${id}`)),
    map((data: any) => {
      return `Estado: ${data.status}`;
    })
  )
  .subscribe(console.log);
///////////////////////////////////////////////////////
const interval$ = interval(1000);
const clicks = fromEvent(document, 'click');

const emitAftCLic = interval$.pipe(skipUntil(clicks));

emitAftCLic.subscribe((v) => console.log(v));

const emtAndShare = interval$.pipe(shareReplay());
emtAndShare.subscribe((v) => console.log('share replay1: ' + v));

clicks.subscribe(() => {
  emtAndShare.subscribe((v) => console.log('share replay2: ' + v));
});
////////////////////////////////////////////////////////

of('bien', 'bien2', 'mal')
  .pipe(
    map((v) => {
      if (v === 'mal') {
        throw 'mal saludo';
      }
      return v;
    }),
    catchError((err) => {
      throw 'error: ' + err;
    })
  )
  .subscribe(
    (X) => console.log(X),
    (err) => console.error('ERROR: ' + err)
  );
