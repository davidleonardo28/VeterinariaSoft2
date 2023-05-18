import {
  AfterViewInit,
  Component,
  ViewChild,
  OnInit,
  OnDestroy,
} from '@angular/core';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { UsersService } from '../services/users.service';
import { MatDialog } from '@angular/material/dialog';
import { ModalComponent } from '../components/modal/modal.component';
import { takeUntil, Subject } from 'rxjs';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
})
export class UsersComponent implements AfterViewInit, OnInit, OnDestroy {
  displayedColumns: string[] = ['id', 'role', 'username', 'actions'];
  dataSource = new MatTableDataSource();

  private destroy$ = new Subject<any>();

  @ViewChild(MatSort) sort: MatSort;
  constructor(private userSvc: UsersService, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.userSvc.getAll().subscribe((users) => {
      this.dataSource.data = users;
    });
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  onDelete(userId: number): void {
    if (window.confirm('¿De verdad quieres eliminar a este usuario?')) {
      this.userSvc
        .delete(userId)
        .pipe(takeUntil(this.destroy$))
        .subscribe((res) => {
          window.alert(`Usuario Eliminado con exito`);
          // Update result after deleting the user.
          this.userSvc.getAll().subscribe((users) => {
            this.dataSource.data = users;
          });
        });
    }
  }
  ngOnDestroy(): void {
    this.destroy$.next({});
    this.destroy$.complete();
  }

  openModal(user = {}): void {
    console.log('User->', user);
    let dialogRef = this.dialog.open(ModalComponent, {
      height: '500px',
      width: '700px',
      hasBackdrop: false,
      data: { title: 'Nuevo Usuario', user },
    });
    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`, typeof result);
      // Update result after adding new user.
      this.userSvc.getAll().subscribe((users) => {
        this.dataSource.data = users;
      });
    });
  }
}
