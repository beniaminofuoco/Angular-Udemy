import { Observable } from "rxjs/Observable";
import { CanDeactivate, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";

export interface CanComponentDeactivate{
    canDeactivate: ()=> Observable<boolean> | Promise<boolean> | boolean;
}

export class CanDeactivateGuard implements CanDeactivate<CanComponentDeactivate>{

    // Questo avrà come parametri:
    // 1- Il componente che possiamo disattivare che implemente l'interfaccia CanComponentDeactivate
    // 2- La rotta attuale, cioè da dove provengo
    // 3- Lo stato corrente
    // 4- La stato che voglio in uscita(PARAMETRO OPZIONALE)
    canDeactivate(component: CanComponentDeactivate, currentRoute: ActivatedRouteSnapshot,
            currentState: RouterStateSnapshot, nextState?:RouterStateSnapshot ):
            Observable<boolean> | Promise<boolean> | boolean{
        
        return component.canDeactivate();
    }
}