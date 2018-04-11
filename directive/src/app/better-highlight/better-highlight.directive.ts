import { Directive,  OnInit, ElementRef, Renderer2, HostListener, HostBinding, Input } from '@angular/core';

@Directive({
  selector: '[appBetterHighlight]'
})
export class BetterHighlightDirective implements OnInit {
  // Modo per passare il colore dinamicamente
  @Input() defaultColor: string = 'transparent';
  @Input() highlightColor: string = 'blue';

  // Questa annotation ci permette di cambiare delle properties in maniera
  // molto più veloce
  @HostBinding('style.backgroundColor') backgroundColor: string;

  
  constructor(private elemRef: ElementRef,private renderer: Renderer2) { }
  
  ngOnInit(){
    this.backgroundColor = this.defaultColor;
    // Questa soluzione è migliore rispetto alla precedente perchè utilizza il metodo
    // setStyle che accede al DOM su qualsiasi Broweser.
    // this.renderer.setStyle(this.elemRef.nativeElement, 'background-color', 'blue');
  }
  
  @HostListener('mouseenter') mouseover(eventData: Event){
    // this.renderer.setStyle(this.elemRef.nativeElement, 'background-color', 'blue'); 
    this.backgroundColor = this.highlightColor;
  }

  @HostListener('mouseleave') mouseleave(eventData: Event){
    // this.renderer.setStyle(this.elemRef.nativeElement, 'background-color', 'transparent'); 
    this.backgroundColor = this.defaultColor;
  }

}
