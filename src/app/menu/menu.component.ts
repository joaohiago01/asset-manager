import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../shared/services/authentication.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  public isActiveDashboard: boolean = true;
  public isActiveCategory: boolean = false;

  constructor(
    public router: Router,
    public authenticationService: AuthenticationService) { }

  ngOnInit(): void {
  }

  navigateToDashboard() {
    this.isActiveCategory = false;
    this.isActiveDashboard = true;
    this.router.navigate(['dashboard']);
  }

  navigateToCategories() {
    this.isActiveDashboard = false;
    this.isActiveCategory = true;
    this.router.navigate(['category']);
  }

  logout() {
    this.authenticationService.logout();
    this.router.navigate(['login']);
  }
}
