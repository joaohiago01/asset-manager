import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Department } from 'src/app/shared/models/department.model';
import { UtilityService } from 'src/app/shared/services/utility.service';
import { DepartmentService } from '../services/department.service';

@Component({
  selector: 'app-departments-list',
  templateUrl: './departments-list.component.html',
  styleUrls: ['./departments-list.component.css']
})
export class DepartmentsListComponent implements OnInit {

  public departments: Department[] = [];
  public department: Department = <Department>{};
  public selectedDepartment: Department = <Department>{};

  constructor(
    public httpClient: HttpClient,
    public router: Router,
    public departmentService: DepartmentService,
    public utilityService: UtilityService
  ) {}

  async ngOnInit(): Promise<void> {
    await this.getAllDepartments();
  }

  async getAllDepartments(): Promise<void> {
    this.departments = await this.departmentService.getAllDepartments();

    if (!this.departments) {
      this.utilityService.showNotification('Nenhum setor encontrado');

      setTimeout(() => {
        this.utilityService.closeNotification();
      }, 3000);
    }
  }

  async createDepartment(
    name: string,
    acronym: string
  ): Promise<void> {
    let department = new Department({
      name,
      acronym
    });

    try {
      const response = await this.departmentService.createDepartment(department);

      this.utilityService.showNotification('Setor cadastrado com sucesso');

      setTimeout(() => {
        this.utilityService.closeNotification();

        window.location.reload();
      }, 1000);
      
    } catch (error) {
      if (!error.response) {
        this.utilityService.showNotification('Oops, ocorreu um erro desconhecido! Tente novamente');
      }

      this.utilityService.showNotification(error.response.data['detail']);

      setTimeout(() => {
        this.utilityService.closeNotification();
      }, 4000);
    }
  }

  detailDepartment(departmentId: number) {
    this.department = <Department>(
      this.departments.find((department: Department) => department.id === departmentId)
    );
    this.showModal('#modalCadastrar');
  }

  async editDepartment(
    id: number,
    name: string,
    acronym: string
  ): Promise<void> {
    let department = new Department({
      name,
      acronym,
    },
    id
    );

    try {
      const response = await this.departmentService.editDepartment(department);

      this.utilityService.showNotification('Setor atualizado com sucesso');

      setTimeout(() => {
        this.utilityService.closeNotification();

        window.location.reload();
      }, 1000);
      
    } catch (error) {
      if (!error.response) {
        this.utilityService.showNotification('Oops, ocorreu um erro desconhecido! Tente novamente');
      }

      this.utilityService.showNotification(error.response.data['detail']);

      setTimeout(() => {
        this.utilityService.closeNotification();
      }, 4000);
    }
  }

  async deleteDepartment(id: number): Promise<void> {
    if (id) {
      try {
        const response = await this.departmentService.deleteDepartment(id);
  
        this.utilityService.showNotification('Setor excluído com sucesso');

        this.selectedDepartment = <Department>{};
        this.utilityService.closeConfirmationModal();
  
        setTimeout(() => {
          this.utilityService.closeNotification();
  
          window.location.reload();
        }, 1000);
        
      } catch (error) {
        this.utilityService.showNotification('O setor está em uso e não pode ser excluído');
  
        setTimeout(() => {
          this.utilityService.closeNotification();
        }, 4000);
      }
    }
  }
  
  showDeletionModal(id: number) {
    if (id) {
      this.selectedDepartment = <Department>(
        this.departments.find((department: Department) => department.id === id)
      );

      this.utilityService.showConfirmationModal();
    }
  }

  showModal(modalSelector: string) {
    const modal: HTMLDivElement = <HTMLDivElement>(
      document.querySelector(modalSelector)
    );
    const overlay: HTMLDivElement = <HTMLDivElement>(
      document.querySelector('.overlay')
    );

    modal.classList.remove('hidden');
    overlay.classList.remove('hidden');
  }

  hideModal(modalSelector: string) {
    const modal: HTMLDivElement = <HTMLDivElement>(
      document.querySelector(modalSelector)
    );
    const overlay: HTMLDivElement = <HTMLDivElement>(
      document.querySelector('.overlay')
    );

    modal.classList.add('hidden');
    overlay.classList.add('hidden');

    this.department = <Department>{};
  }

}
