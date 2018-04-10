import { Component, OnInit, Input, OnChanges, SimpleChanges, DoCheck, AfterContentInit, AfterContentChecked, AfterViewInit, AfterViewChecked, OnDestroy, ViewChild, ElementRef, ContentChild} from '@angular/core';

@Component({
  selector: 'app-server-element',
  templateUrl: './server-element.component.html',
  styleUrls: ['./server-element.component.css']
})
export class ServerElementComponent implements OnInit, OnChanges, DoCheck,
 AfterContentInit, AfterContentChecked, AfterViewInit, AfterViewChecked, OnDestroy{
  @Input('srvElement') element: { type: string, name: string, content: string }
  @Input() name: string;
  @ViewChild('heading') header: ElementRef; // mappa elementi presenti nella View html del Server Element
  // ContentChild ci permette di mappare elementi presenti nel content, 
  // cioè esterni al componente Server element.
  @ContentChild('contentParagraph') paragraph: ElementRef; 

  // Viene chiamato quando carichiamo la pagina ed ogni volta che creiamo un
  // ServerElementComponent
  constructor() {
    console.log("Chiamato il Costruttore!!");
  }

  // Viene chiamato quando carichiamo la pagina ed ogni volta che creiamo un
  // ServerElementComponent
  ngOnInit() {
    console.log('Chiamato il ngOnInit!!');
    // In questo stato il componente non è stato ancora costruito....vedi afterViewInit
    console.log('Text Content: '+ this.header.nativeElement.textContent);
    // In questo stato il componente non è stato ancora costruito....vedi afterContentInit
    console.log('Text Content Paragraph: '+ this.paragraph.nativeElement.textContent);
  }

  // Viene chiamato solo quando un elemento, a cui è aggangiato il metodo,viene modificato.
  ngOnChanges(changes: SimpleChanges) {
    console.log('Chiamato il ngOnchanges!!');
    console.log(changes); 
    // changes -> E' l'elemento che viene passato alla pagina,
    // cioè "element" definito alla riga 9.
  }

  // Viene chiamato automaticamente dopo ogni evento e viene usato per
  // controllare/modificare un determinato valore a runtime.
  ngDoCheck(){
    console.log('Chiamato il ngDoCheck!!');
  }

  // Viene richiamato una sola volta, subito dopo aver caricato il contenuto
  // iniziale, nel nostro il form contenente gli input text e i buttons.
  // Successivamente se facciamo delle modifiche, questo metodo non verrà
  // più richiamato.
  ngAfterContentInit(){
    console.log('Chiamato il ngAfterContentInit!!');
    // 
    console.log('Text Content Paragraph: '+ this.paragraph.nativeElement.textContent);
  }

  // Viene richiamato dopo ogni modifica del context.
  ngAfterContentChecked(){
    console.log('Chiamato il ngAfterContentChecked!!');
  }

  // Simile ad ngAfterContentInit, ma agisce a livello di View e non di content.
  ngAfterViewInit(){
    console.log('Chiamato il ngAfterVIEWInit!!');
    // Qui il componente è stato costruito...e quindi sarà valorizzato.
    console.log('Text Content: '+ this.header.nativeElement.textContent);
  }
  // Simile ad ngAfterContentChecked, ma agisce a livello di View e non di content.
  ngAfterViewChecked(){
    console.log('Chiamato il ngAfterVIEWChecked!!');
  }

  ngOnDestroy(){
    console.log('Chiamato il ngOnDestroy!!');
  }
}
