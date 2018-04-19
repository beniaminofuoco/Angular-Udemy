import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Observer, Subscription } from 'rxjs/Rx';
import 'rxjs/Rx';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {
  customSubscription: Subscription;
  constructor() { }

  ngOnInit() {
    // Questa versione sfrutta le classi messe a disposizione da Angular

    const myNumbers = Observable.interval(1000).map(
      (data: number) =>{
        return data *2;
      }
    );
    myNumbers.subscribe(
    (number: number) => {
       console.log(number);
      }
    );

    // Adesso realizziamo noi un Observable
    const myObservable = Observable.create((observer: Observer<string>)=> {
      setTimeout(() => {
        observer.next('First Package');
      }, 2000);
      setTimeout(() => {
        observer.next('Second Package');
      }, 4000);
      setTimeout(() => {
        // observer.next('This does not work');
        observer.complete();
      }, 5000);
      setTimeout(() => {
        observer.next('Third package!');
      }, 6000);
    });
    this.customSubscription= myObservable.subscribe(
      (data: string) => {console.log(data);},
      (error: string) => {console.log(error);},
      () => {console.log('Completed');}
    );
  }


  /**
   * Tale metodo è necessario per fare in modo che non restino processi appesi
   * nel momento in cui io carico un altro componente.
   * 
   * E' fortemente richiesto implementare il metodo ngOnDestroy() 
   * e chiudere tutte le sottoscrizioni.
   */
  ngOnDestroy(){
    this.customSubscription.unsubscribe();
  }
}
