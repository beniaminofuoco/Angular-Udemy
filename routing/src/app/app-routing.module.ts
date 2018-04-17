import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { PageNotFoundComponent } from "./page-not-found/page-not-found.component";
import { EditServerComponent } from "./servers/edit-server/edit-server.component";
import { ServerComponent } from "./servers/server/server.component";
import { ServersComponent } from "./servers/servers.component";
import { UserComponent } from "./users/user/user.component";
import { UsersComponent } from "./users/users.component";
import { HomeComponent } from "./home/home.component";
import { AuthGuard } from "./auth-guard.service";
import { CanDeactivateGuard } from "./servers/edit-server/can-deactive-guard.service";
import { ErrorPageComponent } from "./error-page/error-page.component";
import { ServerResolver } from "./servers/server/server-resolver.service";

const appRoutes: Routes = [
    { path: '', component: HomeComponent },
    {
        path: 'users', component: UsersComponent, children: [
            { path: ':id/:name', component: UserComponent }
        ]
    },
    {
        path: 'servers', 
            // canActivate: [AuthGuard], impatta sia la Root che le rotte "figlie"
            // canActivateChild impatta SOLO le rotte "figlie"
            canActivateChild: [AuthGuard],
            component: ServersComponent, children: [
            { path: ':id', component: ServerComponent, resolve:{server:ServerResolver} },
            { path: ':id/edit', component: EditServerComponent, canDeactivate: [CanDeactivateGuard] }
        ]
    },
    { path: 'not-found', component: ErrorPageComponent, data:{message: 'Page not found!'}},
    { path: '**', redirectTo: '/not-found' }
    // la notazione ** cattura tutti i path non specificati fra le rotte e 
    // in questo caso li reindirizza al componente pageNotFound.
    // IMP -> questa istruzione DEVE STARE ALLA FINE DELL'ELENCO altrimenti tutti
    // i click verranno 'CATTURATI' da questa istruzione.
]

@NgModule({
    imports: [
        // Questa soluzione, commentata, permette di fare l'hash di tutto quello che 
        // PRIMA della root aggiungendo un "#".
        //RouterModule.forRoot(appRoutes, {useHash: true})
        RouterModule.forRoot(appRoutes)
    ],
    exports: [RouterModule]
})
export class AppRoutingModule { }