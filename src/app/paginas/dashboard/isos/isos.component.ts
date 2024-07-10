import { Component } from '@angular/core';
import { PeticionesapiService } from '../../../services/peticionesapi.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-isos',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './isos.component.html',
  styleUrl: './isos.component.css'
})
export class IsosComponent {

  isos: any[] = [];

  constructor(private peticionesapiService: PeticionesapiService) { }

  ngOnInit(): void {

    const url = import.meta.env.NG_APP_API + '/iso';


    this.peticionesapiService.getApi(url).subscribe(
      (res: any[]) => {
        console.log(res);
        this.isos = res;
      },
      (err: any) => console.error(err)
    );
  }
}
