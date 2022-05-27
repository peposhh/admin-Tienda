import { Injectable } from '@angular/core';
import { GLOBAL } from "./Global";

import { Observable } from "rxjs";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { JwtHelperService } from "@auth0/angular-jwt";

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  public url;
  public helper;


  constructor(private _http: HttpClient,) {

    this.url = GLOBAL.url,
      this.helper = new JwtHelperService()


  }


  login_admin(data: any): Observable<any> {
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this._http.post(this.url + 'login_admin', data, { headers: headers });
  }





  getToken() {
    return localStorage.getItem('token');
  }



  public isAuthenticated(allowRoles: any): boolean {
    const token = localStorage.getItem('token');
    console.log(token);


    if (!token) {
      return false
    }


    try {
      var decodedToken = this.helper.decodeToken(<any>token);

      console.log(decodedToken);

      if (!decodedToken) {

        console.log('No accesos')
        localStorage.removeItem('token')
        return false
      }
    } catch (error) {
      localStorage.removeItem('token')
      return false
    }



    return allowRoles.includes(decodedToken['role']);
  }


}
