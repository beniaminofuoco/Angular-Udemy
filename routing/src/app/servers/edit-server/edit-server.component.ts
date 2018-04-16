import { Component, OnInit } from '@angular/core';

import { ServersService } from '../servers.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit-server',
  templateUrl: './edit-server.component.html',
  styleUrls: ['./edit-server.component.css']
})
export class EditServerComponent implements OnInit {
  server: {id: number, name: string, status: string};
  serverName = '';
  serverStatus = '';

  constructor(private serversService: ServersService, private route: ActivatedRoute) { }

  ngOnInit() {
    // Questi due sono i metodi per recuperari i parametri dalla URL
    // naturalmente questo accade solo quando il componente viene creato(onInit)
    console.log(this.route.snapshot.queryParams);
    console.log(this.route.snapshot.fragment);

    // Naturalmente è possibile anche sottoscriversi alle modifiche
    // this.route.queryParams.subscribe()
    // this.route.fragment.subscribe()

    this.server = this.serversService.getServer(1);
    this.serverName = this.server.name;
    this.serverStatus = this.server.status;
  }

  onUpdateServer() {
    this.serversService.updateServer(this.server.id, {name: this.serverName, status: this.serverStatus});
  }

}
