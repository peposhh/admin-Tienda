import { Component, OnInit } from '@angular/core';
import izitoast from 'izitoast';
import { AdminService } from 'src/app/service/admin.service';
import { ClienteService } from 'src/app/service/cliente.service';
@Component({
  selector: 'app-create-cliente',
  templateUrl: './create-cliente.component.html',
  styleUrls: ['./create-cliente.component.css']
})
export class CreateClienteComponent implements OnInit {


  public cliente: any = {
    genero: ''
  };

  public token;


  constructor(private _clienteService: ClienteService, private _adminService: AdminService) {
    this.token = this._adminService.getToken();
  }

  ngOnInit(): void {
  }


  registro(registroForm: any) {


    if (registroForm.valid) {
      console.log("🚀 ~ file: create-cliente.component.ts ~ line 12 ~ CreateClienteComponent ~ cliente", this.cliente)
      this._clienteService.registro_cliente_admin(this.cliente, this.token).subscribe(
        {
          next: response => {

            console.log(response);
          },
          error: err => {
            console.log(err.error.msg);
          }

        }


      )
    } else {
      izitoast.show({
        title: 'ERROR',
        class: 'text-red',
        position: 'topRight',
        color: '#fff',
        titleColor: '#ff0000',
        message: "Los Datos del formulario no son validos"
      });

    }
  }

}
