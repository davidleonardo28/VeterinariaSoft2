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

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  isAdmin: string = null!;
  isVeterinario: string = null!;
  isLogged = false;

  private subscription: Subscription = new Subscription();
  private destroy$ = new EventEmitter<void>();

  // @Output() toggleSidenav = new EventEmitter<void>();

  @Output() toggleSidenav: EventEmitter<any> = new EventEmitter<any>();

  constructor(private authSvc: AuthService) {}

  ngOnInit(): void {
    this.authSvc.isLogged
      .pipe(takeUntil(this.destroy$))
      .subscribe((res) => (this.isLogged = res));

    this.authSvc.isVeterinario$
      .pipe(takeUntil(this.destroy$))
      .subscribe((res) => (this.isVeterinario = res));

    this.authSvc.isAdmin$
      .pipe(takeUntil(this.destroy$))
      .subscribe((res) => (this.isAdmin = res));
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  onToggleSidenav(): void {
    this.toggleSidenav.emit();
  }

  onLogout(): void {
    this.authSvc.logout();
  }
}
