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
  public isActiveAssets: boolean = false;
  public isActiveSoftwareLicenses: boolean = false;
  public isActiveDepartments: boolean = false;
  public isActiveLoans: boolean = false;
  public isActiveServices: boolean = false;

  public isSidebarHiddenOnMobile: boolean = true;

  constructor(
    public router: Router,
    public authenticationService: AuthenticationService) { }

  ngOnInit(): void {
    if (this.router.url === '/dashboard') {
      this.isActiveDashboard = true;
      this.isActiveEquipments = false;
      this.isActiveSoftwareLicenses = false;
      this.isActiveCategory = false;
      this.isActiveAssets = false;
      this.isActiveDepartments = false;
      this.isActiveLoans = false;
      this.isActiveServices = false;
    } else if (this.router.url === '/category') {
      this.isActiveCategory = true;
      this.isActiveEquipments = false;
      this.isActiveSoftwareLicenses = false;
      this.isActiveDashboard = false;
      this.isActiveAssets = false;
      this.isActiveDepartments = false;
      this.isActiveLoans = false;
      this.isActiveServices = false;
    } else if (this.router.url === '/equipments' || this.router.url === '/equipments/form') {
      this.isActiveEquipments = true;
      this.isActiveCategory = false;
      this.isActiveAssets = false;
      this.isActiveSoftwareLicenses = false;
      this.isActiveDashboard = false;
      this.isActiveDepartments = false;
      this.isActiveLoans = false;
      this.isActiveServices = false;
    } else if (this.router.url === '/assets' || this.router.url === '/assets/form') {
      this.isActiveAssets = true;
      this.isActiveEquipments = false;
      this.isActiveSoftwareLicenses = false;
      this.isActiveCategory = false;
      this.isActiveDashboard = false;
      this.isActiveDepartments = false;
      this.isActiveLoans = false;
      this.isActiveServices = false;
    } else if (this.router.url === '/software-licenses' || this.router.url === '/software-licenses/form') {
      this.isActiveSoftwareLicenses = true;
      this.isActiveAssets = false;
      this.isActiveEquipments = false;
      this.isActiveCategory = false;
      this.isActiveDashboard = false;
      this.isActiveDepartments = false;
      this.isActiveLoans = false;
      this.isActiveServices = false;
    } else if (this.router.url === '/departments') {
      this.isActiveDepartments = true;
      this.isActiveSoftwareLicenses = false;
      this.isActiveAssets = false;
      this.isActiveEquipments = false;
      this.isActiveCategory = false;
      this.isActiveDashboard = false;
      this.isActiveLoans = false;
      this.isActiveServices = false;
    } else if (this.router.url === '/loans') {
      this.isActiveLoans = true;
      this.isActiveSoftwareLicenses = false;
      this.isActiveAssets = false;
      this.isActiveEquipments = false;
      this.isActiveCategory = false;
      this.isActiveDashboard = false;
      this.isActiveDepartments = false;
      this.isActiveServices = false;
    } else if (this.router.url === '/services') {
      this.isActiveServices = true;
      this.isActiveLoans = false;
      this.isActiveSoftwareLicenses = false;
      this.isActiveAssets = false;
      this.isActiveEquipments = false;
      this.isActiveCategory = false;
      this.isActiveDashboard = false;
      this.isActiveDepartments = false;
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

  navigateToAssets() {
    this.router.navigate(['assets']);
  }

  navigateToSoftwareLicenses() {
    this.router.navigate(['software-licenses']);
  }

  navigateToDepartments() {
    this.router.navigate(['departments']);
  }

  navigateToLoans() {
    this.router.navigate(['loans']);
  }

  navigateToServices() {
    this.router.navigate(['services']);
  }

  logout() {
    this.authenticationService.logout();
    this.router.navigate(['login']);
  }

  switchSidebar() {
    if (this.isSidebarHiddenOnMobile) {
      this.isSidebarHiddenOnMobile = false;

    } else {
      this.isSidebarHiddenOnMobile = true;
    }
  }
}
