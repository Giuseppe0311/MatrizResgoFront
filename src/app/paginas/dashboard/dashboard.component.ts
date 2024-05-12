import { Component } from '@angular/core';
import { CreareventoComponent } from './crearevento/crearevento.component';
import { TablaseventosComponent } from './tablaseventos/tablaseventos.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CreareventoComponent, TablaseventosComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {

}
