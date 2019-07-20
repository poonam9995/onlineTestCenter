import { Injectable ,Injector} from '@angular/core';
import {HttpInterceptor } from '@angular/common/http';
import { HttpService } from './_shared/services/http/http.service';
@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor {
  constructor(private injector : Injector) { }
  intercept(req, next){
    let httpService = this.injector.get(HttpService)    
    let tokenizedReq = req.clone({
      setHeaders:{
        Authorization :`Bearer ${httpService.getToken()}`
      }
    })
    console.log("jhgjhg",tokenizedReq);
    return next.handle(tokenizedReq)
  }
}
