import { Component, OnInit } from '@angular/core';
import { ServersService } from './servers.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-servers',
  templateUrl: './servers.component.html',
  styleUrls: ['./servers.component.css']
})
export class ServersComponent implements OnInit {
  private servers: { id: number, name: string, status: string }[] = [];

  constructor(private serversService: ServersService, private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.servers = this.serversService.getServers();
  }

  onReload() {
    // 1- Così non fa niente, perchè Angular capisce che siamo già nella stessa pagina
    // this.router.navigate(['/servers']);

    // 2- Così abbiamo un path relativo, ma Angula continua a non fare niente perchè
    // capisce che siamo nella stessa pagina
    // this.router.navigate(['servers']);

    // 3- Passiamo un ulteriore paramentro al metodo Navigate, in cui diciamo in che
    // pagina siamo.Anche questa soluzione però non funziona perchè andiamo a selezionare
    // una rotta che non esiste.
    // this.router.navigate(['servers'], {relativeTo: this.route});

  }

}
