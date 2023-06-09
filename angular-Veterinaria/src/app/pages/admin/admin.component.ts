import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@app/auth/auth.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  constructor(public authSvc: AuthService,
    private router: Router) { }

  ngOnInit(): void {
    var correo = localStorage.getItem("correo");
    if (!correo) {
      this.router.navigate(['']);
    }
  }

}
