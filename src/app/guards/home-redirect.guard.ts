import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import Swal from 'sweetalert2';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class HomeRedirectGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    if (this.authService.isLoggedIn()) {
      Swal.fire({
        position: 'top-end',
        icon: 'error',
        title: 'You are already logged in!',
        showConfirmButton: false,
        timer: 700,
      }).then((result) => {
        if (result.dismiss === Swal.DismissReason.timer) {
          this.router.navigateByUrl('/').then(() => {
            window.location.reload();
          });
        }
      });
      return false;
    } else {
      return true;
    }
  }
}
