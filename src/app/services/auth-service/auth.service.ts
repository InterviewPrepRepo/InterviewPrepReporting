import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, RouterStateSnapshot } from '@angular/router';
import { LocalStorageService } from 'angular-web-storage';
import user from 'src/app/models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private local : LocalStorageService) { }

  public isAuthenticated() : boolean {
    if(this.local.get('ipr_currentUser')) {
      return true;
    }
    else {
      return false;
    }
  }

  public getCurrentUser() : user {
    return this.local.get('ipr_currentUser');
  }

  public setCurrentUser(userToSet : user) : void {
    if(!userToSet) return;
    this.local.set('ipr_currentUser', userToSet, 1, 'd');
  }

  public clearCurrentUser() : void {
    this.local.remove('ipr_currentUser');
  }
}
