import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { VALID } from '@angular/forms/src/model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  genders = ['male', 'female'];
  signupForm: FormGroup;
  // Scriverò un validatore che controlla che l'Username NON SIA uno dei valori 
  // presenti nell'Array
  forbiddenUsers =['Beniamino', 'Rossella'];

  ngOnInit(){
    // Inizializziamo il form programmaticamente andando ad associare
    // ai vari componenti presenti in pagina dei controlli e relativi valori di default.
    // In questo approccio quando vogliamo associare delle properties
    // (required, validatori) ad un componente front-end, specifichiamo TUTTO.
    this.signupForm = new FormGroup({
      // Il primo parametro del FormControl è l'eventuale valore di default 
      // Il secondo è un validatore(o un array di validatori) legati al componente

      // E'anche possibile annidare FormGroup, questo naturalmente deve avvenire anche
      // a frot-end con l'utilizzo del tag FormGroupName
      'userData': new FormGroup({
         // Aggiungo il validatore al campo username 
         // IMP -> Aggiungo il metodo bind al validatore per dire a Javascript 
         // di utilizzare i validatori di questa classe
        'username': new FormControl(null, [Validators.required, this.forbiddenNames.bind(this)]), 
        'email': new FormControl(null, [Validators.required, Validators.email])
      }),
      'gender': new FormControl('male'),
      'hobbies': new FormArray([])
    });
  }

  // Tale metodo viene associato al form in pagina tramite la 
  // properties (ngSubmit)="onSubmit()
  onSubmit(){
    // Stampiamo il valore della variabile in console
    console.log(this.signupForm);
  }

  onAddHobby(){
    const control = new FormControl(null, Validators.required);
    (<FormArray>this.signupForm.get('hobbies')).push(control);
  }

  // Un validatore non è altro che una funzione che ritorna qualcosa
  // Per validare un campo dobbiamo passare al validatore il controllo (control: FormControl)
  // Il validatore restituirà una mappa con chiave di tipo String e valore boolean {[s: string]:boolean}
  // IMPORTANTE -> se la validazione va a buon fine DOBBIAMO RESTITUIRE NULL oppure OMETTERE IL RETURN
  forbiddenNames(control: FormControl):{[s: string]:boolean}{
    // Se NON trova il valore, il metodo indexOf restituirà -1
    if(this.forbiddenUsers.indexOf(control.value) !== -1){
      // Il return contiene una chiave fittizia e il valore boolean 
      // che indica se la validazione ha generato errore o meno.
      return {nameIsForbidden : true};
    }
    return null;
  }
}
