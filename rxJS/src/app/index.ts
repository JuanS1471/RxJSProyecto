import { Observable, Observer } from 'rxjs';
import { map, filter } from 'rxjs/operators';
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

mpipe.subscribe(myObserver);
