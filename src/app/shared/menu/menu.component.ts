import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../shared/services/authentication.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  public isActiveDashboard: boolean = true;
  public isActiveCategory: boolean = false;
  public isActiveEquipments: boolean = false;

  constructor(
    public router: Router,
    public authenticationService: AuthenticationService) { }

  ngOnInit(): void {
    if (this.router.url === '/dashboard') {
      this.isActiveEquipments = false;
      this.isActiveCategory = false;
      this.isActiveDashboard = true;
    } else if (this.router.url === '/category') {
      this.isActiveEquipments = false;
      this.isActiveDashboard = false;
      this.isActiveCategory = true;
    } else if (this.router.url === '/equipments' || this.router.url === '/equipments/create') {
      this.isActiveEquipments = true;
      this.isActiveCategory = false;
      this.isActiveDashboard = false;
    }
  }

  navigateToDashboard() {
    this.router.navigate(['dashboard']);
  }

  navigateToCategories() {
    this.router.navigate(['category']);
  }

  navigateToEquipments() {
    this.router.navigate(['equipments']);
  }

  logout() {
    this.authenticationService.logout();
    this.router.navigate(['login']);
  }
}
