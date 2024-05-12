import { Component } from '@angular/core';
import { CreareventoComponent } from './crearevento/crearevento.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CreareventoComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {

}
