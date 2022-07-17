import { Component, OnInit } from '@angular/core';
import { ClienteService } from 'src/app/service/cliente.service';
import { interval } from 'rxjs';
import { AdminService } from 'src/app/service/admin.service';

@Component({
  selector: 'app-index-cliente',
  templateUrl: './index-cliente.component.html',
  styleUrls: ['./index-cliente.component.css']
})
export class IndexClienteComponent implements OnInit {

  public clientes: Array<any> = [];
  public filtro_apellidos: Array<any> = [];
  public filtro_correo: Array<any> = [];
  public filtro_rut: Array<any> = [];
  public page = 1
  public pageSize = 5;
  public token;




  constructor(private _clienteService: ClienteService,
    private _adminService: AdminService) {

    this.token = this._adminService.getToken();
    console.log("🚀 ~ file: index-cliente.component.ts ~ line 28 ~ IndexClienteComponent ~ this.token", this.token)

  }

  ngOnInit(): void {
    this.data_init();

  }




  data_init() {
    this._clienteService.listar_cliente_filtro_admin(null, null, this.token)
      .subscribe(
        {
          next: response => {
            this.clientes = response.data;
            console.log(this.clientes);
          },
          error: err => {
            console.log(err.error.msg);
          }

        }


      )


  }






  filtro(tipo: any) {


    if (tipo == 'apellidos') {
      this._clienteService.listar_cliente_filtro_admin(tipo, this.filtro_apellidos, this.token).
        subscribe(
          {
            next: response => {
              this.clientes = response.data;
              console.log(this.clientes);
            },
            error: err => {
              console.log(err.error.msg);
            }
          }
        )
    } else if (tipo == 'correo') {
      this._clienteService.listar_cliente_filtro_admin(tipo, this.filtro_correo, this.token).
        subscribe(
          {
            next: response => {
              this.clientes = response.data;
              console.log(this.clientes);
            },
            error: err => {
              console.log(err.error.msg);
            }
          }
        )
    }

    else if (tipo == 'rut') {
      this._clienteService.listar_cliente_filtro_admin(tipo, this.filtro_rut, this.token).
        subscribe(
          {
            next: response => {
              this.clientes = response.data;
              console.log(this.clientes);
            },
            error: err => {
              console.log(err.error.msg);
            }
          }
        )
    }






  }


}
