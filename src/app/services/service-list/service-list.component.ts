import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Service } from 'src/app/shared/models/service.model';
import { UtilityService } from 'src/app/shared/services/utility.service';
import { ServiceService } from '../services/service.service';

@Component({
  selector: 'app-service-list',
  templateUrl: './service-list.component.html',
  styleUrls: ['./service-list.component.css']
})
export class ServiceListComponent implements OnInit {
  public services: Service[] = [];
  public selectedService!: Service;

  constructor(
    private router: Router,
    private service: ServiceService,
    public utilityService: UtilityService
  ) {}

  async ngOnInit(): Promise<void> {
    if (window.history.state.needReload) {
      window.location.reload();
    } else {
      await this.getAllServices();
    }
  }

  async getAllServices(): Promise<void> {
    this.services = await this.service.getAllServices();
    this.services = this.services.map((service: Service) => {
      service.outputDate = new Date(service.outputDate);
      service.returnDate = new Date(service.returnDate);
      return service;
    });

    if (!this.services) {
      this.utilityService.showNotification('Nenhuma manutenção ou conserto encontrado');

      setTimeout(() => {
        this.utilityService.closeNotification();
      }, 3000);
    }
  }

  async detailService(serviceId: number) {
    this.selectedService = <Service>(
      this.services.find(
        (service: Service) => service.id === serviceId
      )
    );

    this.router.navigate(['services/form'], {
      state: { service: this.selectedService },
    });
  }

  navigateToServiceCreate(): void {
    this.router.navigate(['/services/form']);
  }
}
