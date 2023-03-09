import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { AccountService } from '../account.service';
import { RolesUserService } from '../roles-user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate{
  constructor(public authService: AccountService, public router: Router,private serviceRoles: RolesUserService) { }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
  
    if (!this.authService.isVigenteSession()) {
      this.authService.logout();
      return false;
    }


    if(this.authService.userValue !== null){
      if (this.serviceRoles.onValidarMenu(state.url.toString().replace("/",""))==false)
      {
        this.router.navigate(['unauthorized']);
        return false;
      }else{
        return true;
      }
    }
    this.router.navigate(['login']);
    return false;
    
  }
  
}
