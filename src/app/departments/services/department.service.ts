import { Injectable } from '@angular/core';
import { Equipment } from 'src/app/shared/models/equipment.model';
import { EquipmentApiCampus } from 'src/app/shared/models/equipmentApiCampus.model';
import { AuthenticationService } from 'src/app/shared/services/authentication.service';
import { AxiosResponse } from 'axios';
import api from 'src/app/shared/services/api';
import apiCampus from 'src/app/shared/services/apiCampus';
import * as equipmentsApiCampus from '../../shared/services/equipments-api-campus.json';
import { Department } from 'src/app/shared/models/department.model';

@Injectable({
  providedIn: 'root',
})
export class DepartmentService {
  constructor(private authenticationService: AuthenticationService) {}

  async getAllDepartments(): Promise<Department[]> {
    try {
      let departments!: Department[];

      let headers = {
        Authorization: `Bearer ${this.authenticationService.token}`,
      };

      const response = await api.get('/setores', { headers });
      departments = response.data.map((departmentServer: any) => {
        return new Department(
          {
            name: departmentServer.nome,
            acronym: departmentServer.sigla,
          },
          departmentServer.id
        );
      });

      return departments;
    } catch (error) {
      console.error(error);
      return [];
    }
  }

  async createDepartment(department: Department): Promise<boolean> {
    let departmentWasCreated = false;
    try {
      let headers = {
        Authorization: `Bearer ${this.authenticationService.token}`,
      };

      let departmentServer = {
        nome: department.name,
        sigla: department.acronym,
      };
      await api.post('/setores', departmentServer, { headers });

      departmentWasCreated = true;
      return departmentWasCreated;
    } catch (error) {
      console.error(error);
      return (departmentWasCreated = false);
    }
  }

  async editDepartment(department: Department): Promise<boolean> {
    let departmentWasEdited = false;
    try {
      let headers = {
        Authorization: `Bearer ${this.authenticationService.token}`,
      };

      let departmentServer = {
        nome: department.name,
        sigla: department.acronym,
      };

      await api.put(`/setores/${department.id}`, departmentServer, {
        headers,
      });
      departmentWasEdited = true;
      return departmentWasEdited;
    } catch (error) {
      console.error(error);
      return (departmentWasEdited = false);
    }
  }

  async deleteDepartment(id: Number): Promise<boolean> {
    let departmentWasDeleted = false;
    try {
      let headers = {
        Authorization: `Bearer ${this.authenticationService.token}`,
      };

      await api.delete(`/setores/${id}`, { headers });
      departmentWasDeleted = true;

      return departmentWasDeleted;
    } catch (error) {
      console.error(error);
      return (departmentWasDeleted = false);
    }
  }
}
