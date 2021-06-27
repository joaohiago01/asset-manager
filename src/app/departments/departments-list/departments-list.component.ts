import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Department } from 'src/app/shared/models/department.model';
import { DepartmentService } from '../services/department.service';

@Component({
  selector: 'app-departments-list',
  templateUrl: './departments-list.component.html',
  styleUrls: ['./departments-list.component.css']
})
export class DepartmentsListComponent implements OnInit {

  public departments: Department[] = [];
  public department: Department = <Department>{};

  constructor(
    public httpClient: HttpClient,
    public router: Router,
    public departmentService: DepartmentService
  ) {}

  async ngOnInit(): Promise<void> {
    await this.getAllDepartments();
  }

  async getAllDepartments(): Promise<void> {
    this.departments = await this.departmentService.getAllDepartments();

    if (!this.departments) {
      alert('Nenhum setor encontrado!')
    }
  }

  async createDepartment(
    name: string,
    acronym: string
  ): Promise<void> {
    if (name && acronym) {
      let department = new Department({
        name,
        acronym
      });

      let departmentWasCreated = await this.departmentService.createDepartment(department);

      if (departmentWasCreated === true) {
        window.location.reload();
      } else {
        alert('Oops, ocorreu um erro ao tentar cadastrar esse setor');
      }

    } else {
      alert('Dados inválidos! Verifique os campos e tente novamente')
    }
  }

  detailDepartment(departmentId: number) {
    this.department = <Department>(
      this.departments.find((department: Department) => department.id === departmentId)
    );
    this.showModal('#modalEditar');
  }

  async editDepartment(
    id: number,
    name: string,
    acronym: string
  ): Promise<void> {
    console.log(id, name, acronym);
    if (id && name && acronym) {
      let department = new Department({
        name,
        acronym,
      },
      id
      );

      let departmentWasEdited = await this.departmentService.editDepartment(department);

      if (departmentWasEdited === true) {
        window.location.reload();
      } else {
        alert('Oops, ocorreu um erro ao tentar editar esse setor');
      }
      
    } else {
      alert('Dados inválidos! Verifique os campos e tente novamente')
    }
  }

  async deleteDepartment(id: number): Promise<void> {
    if (id) {
      let departmentWasDeleted = await this.departmentService.deleteDepartment(id);

      if (departmentWasDeleted === true) {
        window.location.reload();
      } else {
        alert('Oops, ocorreu um erro ao tentar remover esse setor');
      }
    } else {
      alert('Setor inválido')
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
