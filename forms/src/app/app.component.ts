import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  @ViewChild('f') form: NgForm;
  // 'pet' è il value che abbiamo assegnato al valore della combo in pagina
  defaultQuestion = 'pet';
  answer = '';
  genders = ['male', 'female'];
  user = {
    username: '',
    email: '',
    secret: '',
    answer: '',
    gender: ''
  };
  submitted = false;

  /**
   * Vogliamo che questo metodo venga associato al bottone in pagina 
   * e inserisca un valore all'interno del campo username.
   * Per far ciò ci sono due modi.
   */
  suggestUserName() {
    const suggestedName = 'Superuser';
    // Il primo metodo consiste nell'usare il metodo setValue 
    // che sovrascrive tutti valori del form
    //this.form.setValue({
    //  userData:{
    //    username: suggestedName,
    //    email: ''
    //  },
    //  secret: 'pet',
    //  questionAnswer: '',
    //  gender: 'male'
    // });

    // Il secondo metodo è quello più pulito, in quanto va a popolare 
    // solo il campo username.
    this.form.form.patchValue({
      userData: {
        username: suggestedName
      }
    });

  }

  onSubmit() {
    this.submitted = true;
    this.user.username = this.form.value.userData.username;
    this.user.email = this.form.value.userData.email;
    this.user.secret = this.form.value.secret;
    this.user.answer = this.form.value.questionAnswer;
    this.user.gender = this.form.value.gender;

    this.form.reset();
  }

  // Questa soluzione prevede l'invio del Form nel momento in cui facciamo
  // Submit. La soluzione in cui mappiamo il form tramite @ViewChild ci permette
  // di accede al form anche prima 
  // onSubmit(form: NgForm){
  //   console.log(form);
  // }
}
