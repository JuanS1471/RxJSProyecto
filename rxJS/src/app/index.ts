import { Observable, Observer } from 'rxjs';

const myObserver: Observer<any>{
    next: x =>{
        if(!isNaN(x)){
            console.log(x + 10);
        }else{
            console.log(`'${x}': no es un numero`);
        }
    },
    error: err => console.error(`Error`, err),
    complete: () => console.log("solucionado")
};

const myObservable = new Observable{
    subscriber =>{
        subscriber.next('1');
    }
};

const myObservable2 = new Observable{
    subscriber =>{;
        subscriber.complete()
    }
}

myObservable.subscribe(myObserver);