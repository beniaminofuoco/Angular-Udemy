import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  serverElements = [];

  onServerAdded(serverDate:{serverName: string, serverContent: string}) {
    this.serverElements.push({
      type: 'server',
      name: serverDate.serverName,
      content: serverDate.serverContent
    });
  }

  onBlueprintAdded(bluePrintCreated:{serverName: string, serverContent: string}) {
    this.serverElements.push({
      type: 'blueprint',
      name: bluePrintCreated.serverName,
      content: bluePrintCreated.serverContent
    });
  }
}
