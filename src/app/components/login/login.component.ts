import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
//** izitoast muy lindo para las notificación */
import izitoast from 'izitoast';
import { AdminService } from 'src/app/service/admin.service';


declare var jQuery: any;
declare var $: any;



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public user: any = {};
  public usuario: any = {};
  public token: any = '';



  //***Se llama al servicio adminservice , y el servicio router para redireccionar */
  constructor(private _adminService: AdminService, private _router: Router) {
    this.token = this._adminService.getToken();
  }

  ngOnInit(): void {
    console.log(this.token);

    if (this.token) {
      this._router.navigate(['/']);
    }
  }




  login(loginForm: any) {
    //** ngform tiene un metodo interno llamado valid que valida los datos enviados */
    if (loginForm.valid) {


      let data = {
        email: this.user.email,
        password: this.user.password
      }
      //** se llama al servicio adminService y se agrega la data que viene del formulario */
      this._adminService.login_admin(data).subscribe(
        response => {

          if (response.data == undefined) {
            izitoast.show({
              title: 'ERROR',
              class: 'text-red',
              position: 'topRight',
              color: '#fff',
              titleColor: '#ff0000',
              message: response.message
            })
          } else {
            this.usuario = response.data;
            console.log(this.usuario._id);
            console.log(response.data);
            //** una vez que las credenciales son correctas se guardan los token y el id del usuario logeado */
            localStorage.setItem('token', response.token);
            localStorage.setItem('_id', this.usuario._id);

            this._router.navigate(['/']);
          }






        },
        error => {
          console.log(error);
        }

      );

    } else {
      izitoast.error({
        title: 'Error',
        class: 'text-danger',
        position: 'topRight',
        message: 'Los datos del formulario no son validos'
      })

    }
  }

}
