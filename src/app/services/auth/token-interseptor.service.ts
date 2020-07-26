import { Injectable, Injector } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class TokenInterseptorService implements HttpInterceptor {

  constructor(private injector: Injector,private router:Router) {}
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (localStorage.getItem('token') != null) {
        const clonedReq = req.clone({
            headers: req.headers.set('Authorization', 'Bearer ' + localStorage.getItem('token'))
        });
        return next.handle(clonedReq).pipe(
            tap(
                succ => { },
                err => {
                    if (err.status == 401){
                        localStorage.removeItem('token');
                        this.router.navigateByUrl('/user/login');
                    }
                }
            )
        )
    }
    else
        return next.handle(req.clone());
}

  // // INTERCEPTORS are not dependable classes so we need to use
  // // Injector to hold the required dependencies
  // intercept(req: HttpRequest<any>, next: HttpHandler) {
  //   const authService = this.injector.get(AuthService);
  //   const tokenReq = req.clone({
  //     setHeaders: {
  //       Authorization: `Bearer ${authService.getToken()}`
  //     }
  //   });
  //   return next.handle(tokenReq);
  // }
}