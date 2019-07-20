import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, Route } from '@angular/router';



import { HttpService } from '../_shared/services/http/http.service';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(private router : Router,private httpservice: HttpService) { }
  canActivate():boolean{
    if(this.httpservice.loggedIn()){
      return true
    }else{
      this.router.navigate(['/login']);
      return false
    }
  }
}
