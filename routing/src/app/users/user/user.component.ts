import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit, OnDestroy {
  user: {id: number, name: string};
  paramSubscribe: Subscription;

  constructor(private route:ActivatedRoute) { }

  ngOnInit() {
    // I parametri recuperati sono quelli che abbiamo speficato nella route
    // definita nell'appModule
    this.user = {
      id: this.route.snapshot.params['id'],
      name: this.route.snapshot.params['name']
    };
    // L'approccio precente funziona...ma non in tutti i casi.
    // In particolare se aggiorniamo la URL da dentro la stessa pagina, Angular NON 
    // RICREA il componente e quindi cambia la URL ma non i dati recuperati dalla stessa.
    // Per ovviare a ciò mi SOTTOSCRIVO alla lista di parametri che recupero dalla URL (PARAMS)
    // che al contrario dell'oggetto SNAPSHOT è subscribe.
    this.paramSubscribe = this.route.params.subscribe(
      (params: Params) => {
        this.user.id = params['id'];
        this.user.name = params['name'];
      }
    
    );
  }

  ngOnDestroy(){
    // Angular AUTOMATICAMENTE elimina la nostra subscribe nel momento in cui viene
    // caricato un nuovo componente, e siccome la nostra subscribe viene fatta nell'onInit
    // quando verrebbe ricreato il componente la sottoscrizione verrebbè ricreata.

    // Detto questo è bene sapere che nel caso in cui dovessimo fare una subscribe all'interno
    // della stessa pagina...possiamo eliminarla implementando l'interfaccia OnDestroy e
    // il medodo ngOnDestroy.
    this.paramSubscribe.unsubscribe();
  }

}
