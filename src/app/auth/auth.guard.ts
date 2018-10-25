import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, CanLoad, Route } from '@angular/router';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import * as fromRoot from '../app.reducer';
import { take } from 'rxjs/operators';

@Injectable()

export class AuthGuard implements CanActivate, CanLoad {

    constructor(
        private store: Store<fromRoot.State>,
        private router: Router
    ) {}

    canActivate( route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
        return this.store.select(fromRoot.getIsAuth).pipe(take(1))
    }
    canLoad( route: Route): Observable<any> | Promise<boolean> | boolean {
        return this.store.select(fromRoot.getIsAuth).pipe(take(1))
    }
}
