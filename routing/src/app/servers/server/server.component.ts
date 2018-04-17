import { Component, OnInit, OnDestroy } from '@angular/core';

import { ServersService } from '../servers.service';
import { ActivatedRoute, Params, Router, Data } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-server',
  templateUrl: './server.component.html',
  styleUrls: ['./server.component.css']
})
export class ServerComponent implements OnInit, OnDestroy {
  server: { id: number, name: string, status: string };
  serverSub: Subscription;

  constructor(private serversService: ServersService,
    private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    // Recupero i dati dinamicamente del Server dinamicamente
    this.route.data.subscribe(
      (data: Data) => {
        this.server = data['server'];
      }
    );


    //const idParam = +this.route.snapshot.params['id'];
    //this.server = this.serversService.getServer(idParam);
    //this.serverSub = this.route.params.subscribe(
    //  (params: Params) => {
    //    this.server = this.serversService.getServer(+params['id']);
    //  }
    //);
  }

  onEdit() {
    this.router.navigate(['edit'], { relativeTo: this.route, queryParamsHandling: 'preserve' });
  }


  ngOnDestroy() {
    this.serverSub.unsubscribe();
  }
}
