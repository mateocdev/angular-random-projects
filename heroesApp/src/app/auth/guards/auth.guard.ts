import { Injectable } from "@angular/core";
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanMatch,
  Route,
  RouterStateSnapshot,
  UrlSegment,
  UrlTree,
} from "@angular/router";
import { Observable, tap } from "rxjs";
import { AuthService } from "../services/auth.service";

@Injectable({ providedIn: "root" })
export class AuthGuard implements CanMatch, CanActivate {
  constructor(private authService: AuthService) {}

  private isAuth(): boolean | Observable<boolean> {
    return this.authService.checkAuth().pipe(
      tap((isAuthenticated) => {
        if (!isAuthenticated) {
          this.authService.logout();
        }
      })
    );
  }
  canMatch(
    route: Route,
    segments: UrlSegment[]
  ): boolean | Observable<boolean> {
    return this.isAuth();
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | Observable<boolean> {
    return this.isAuth();
  }
}
