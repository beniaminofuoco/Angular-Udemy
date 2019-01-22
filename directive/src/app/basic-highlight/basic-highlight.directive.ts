import { Directive, ElementRef, OnInit } from "@angular/core";

@Directive({
    selector: '[appBasicHighlight]'
})
export class BasicHighlightDirective implements OnInit {

    constructor(private elementRef: ElementRef) {
    }

    ngOnInit() {
        // Funziona ma non è la soluzione migliore in quanto, sul alcuni
        // ambienti non è in grado di accedere al DOM e quindi si potrebbero avere dei problemi.
        this.elementRef.nativeElement.style.background = 'green';
    }
}