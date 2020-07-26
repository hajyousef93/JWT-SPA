import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router,private authservice:AuthService){}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot):boolean {
      if(this.authservice.isLogin)
    return true;
    else {
      this.router.navigate(['/user/login']);
      return false;
    }
  }
  
}
