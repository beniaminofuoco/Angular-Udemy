import { Component, OnInit } from '@angular/core';

import { ServersService } from '../servers.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { CanComponentDeactivate } from './can-deactive-guard.service';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-edit-server',
  templateUrl: './edit-server.component.html',
  styleUrls: ['./edit-server.component.css']
})
export class EditServerComponent implements OnInit, CanComponentDeactivate {
  server: { id: number, name: string, status: string };
  serverName = '';
  serverStatus = '';
  allowEdit = false;
  changesSaved = false;

  constructor(private serversService: ServersService,
    private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    // Questi due sono i metodi per recuperari i parametri dalla URL
    // naturalmente questo accade solo quando il componente viene creato(onInit)
    console.log(this.route.snapshot.queryParams);
    console.log(this.route.snapshot.fragment);

    // Naturalmente è possibile anche sottoscriversi alle modifiche
    this.route.queryParams.subscribe((queryParam: Params) => {
      this.allowEdit = queryParam['allowEdit'] === '1' ? true : false;
    })
    this.route.fragment.subscribe()
    const idServer  = +this.route.snapshot.params['id'];
    this.server = this.serversService.getServer(idServer);
    this.route.params.subscribe(
      (param : Params) => {
        this.server = this.serversService.getServer(+param['id']);
      }
    );


    this.serverName = this.server.name;
    this.serverStatus = this.server.status;
  }

  onUpdateServer() {
    this.serversService.updateServer(this.server.id, {
      name: this.serverName,
      status: this.serverStatus
    });

    this.changesSaved = true;
    this.router.navigate(['../'], { relativeTo: this.route });

  }

  canDeactivate(): Observable<boolean> | Promise<boolean> | boolean {
    if (!this.allowEdit) {
      return true;
    }

    if ((this.serverName !== this.server.name || this.serverStatus !== this.server.status) &&
      !this.changesSaved) {
      return confirm('Do you want to discard the changes?');
    } else {
      return true;
    }
  }
}
