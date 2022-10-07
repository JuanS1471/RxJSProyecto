import { Observable, Observer, of } from 'rxjs';
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
  error: (err) => console.error(`ERROR`, err),
  complete: () => console.log('mi trabajo aqui esta realizado'),
};

const source = of("wordl").pipe(
  map(x => `hello ${x}`),
  tap(ev => console.log(ev + "asd")),
  delay(5000),
  scan((acc, one) => acc + one, "Prueba"),
  filter(x => x.includes("hola"))
);
source.subscribe()

mpipe.subscribe(myObserver);
