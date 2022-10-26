import { Injectable } from '@angular/core';
import { Observable, filter, map, Observer, pipe, scan, tap, of, delay, fromEvent, mergeMap, interval, skipUntil, shareReplay, catchError, ReplaySubject, BehaviorSubject } from 'rxjs';
import * from 'jquery';
@Injectable({
  providedIn: 'root'
})
export class RxjsLabService {

  constructor() { }
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
  const mpipe = this.myObservable.pipe(
    filter((r: any) => !isNaN(r)),
    map((r: any) => {
      return r + 10;
    })
  );
  
  myObserver: Observer<any> = {
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
  
  toggle = () =>
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
  
  fakeData = [{ a: 1 }, { a: 2 }, { a: 3 }, { a: 4 }];
  
  source2 = of(...this.fakeData).pipe(
    this.toggle(),
    map((x) => `Hello ${x.a}!`)
  );
  
  source = of('wordl').pipe(
    map((x) => `hello ${x}`),
    tap((ev) => console.log(ev + 'asd')),
    delay(5000),
    scan((acc, one) => acc + one, 'Prueba'),
    filter((x) => x.includes('hola'))
  );
  this.source.subscribe();
  this.source2.subscribe(console.log);
  this.mpipe.subscribe(this.myObserver);
  ///////////////////////////////////////////
  const API_URL = 'https://rickandmortyapi.com/api/character/1';
  
  const click$ = fromEvent(document, 'click');
  
  click$
    .pipe(
      map(data => {
        if (data.isTrusted) {
          return 10;
        }
      }),
      mergeMap((id) => $.getJSON(`${API_URL}${id}`)),

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
  
  ///////////////////////////////////////////////////////
  
  const saludo = new ReplaySubject();
  
  of(1, 2, 3, 4, 5, 6).subscribe((v) => saludo.next(`${v}`));
  
  saludo.subscribe((x) => console.log('primera', x));
  
  
  //
  const saludo2 = new BehaviorSubject('');
  
  of(1, 2, 3, 4, 5, 6).subscribe((v) => saludo.next(`${v}`));
  
  saludo2.subscribe((x) => console.log('primera', x));
  
}
