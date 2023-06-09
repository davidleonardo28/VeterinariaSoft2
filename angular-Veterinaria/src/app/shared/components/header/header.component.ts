import { Roles } from '@shared/models/user.interface';
import { AuthService } from './../../../auth/auth.service';
import { UserResponse } from './../../models/user.interface';
import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  OnDestroy,
} from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  public isAdmin = false;
  public isLogged = false;
  isVeterinario: string = null!;

  private subscription: Subscription = new Subscription();
  private destroy$ = new EventEmitter<void>();

  // @Output() toggleSidenav = new EventEmitter<void>();

  @Output() toggleSidenav: EventEmitter<any> = new EventEmitter<any>();

  constructor(private authSvc: AuthService,
    private router: Router) { }

  ngOnInit(): void {
    var correo = localStorage.getItem("correo");

    if (correo != "") {
      this.isLogged = true;
      if (correo == "admin@gmail.com") this.isAdmin = true;
      else { this.isAdmin = false; }
    }
    else {
      this.isLogged = false;
      this.isAdmin = false;
    }

    // this.authSvc.isLogged
    //   .pipe(takeUntil(this.destroy$))
    //   .subscribe((res) => (this.isLogged = res));

    // this.authSvc.isVeterinario$
    //   .pipe(takeUntil(this.destroy$))
    //   .subscribe((res) => (this.isVeterinario = res));

    // this.authSvc.isAdmin$
    //   .pipe(takeUntil(this.destroy$))
    //   .subscribe((res) => (this.isAdmin = res));
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  onToggleSidenav(): void {
    this.toggleSidenav.emit();
  }

  onLogout(): void {
    localStorage.setItem("correo", "");
    this.router.navigate(['']);
    setTimeout(() => {
      window.location.reload();
    }, 1000);
    // this.authSvc.logout();
  }
}
