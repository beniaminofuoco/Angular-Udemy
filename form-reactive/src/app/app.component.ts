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
        'username': new FormControl(null, Validators.required),
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
}
