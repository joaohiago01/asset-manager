import { Injectable } from '@angular/core';
import { Equipment } from 'src/app/shared/models/equipment.model';
import { EquipmentApiCampus } from 'src/app/shared/models/equipmentApiCampus.model';
import { AuthenticationService } from 'src/app/shared/services/authentication.service';
import { AxiosPromise, AxiosResponse } from 'axios';
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

  async createDepartment(department: Department): Promise<AxiosResponse> {
    let headers = {
      Authorization: `Bearer ${this.authenticationService.token}`,
    };

    let departmentServer = {
      nome: department.name,
      sigla: department.acronym,
    };
    
    return await api.post('/setores', departmentServer, { headers });
  }

  async editDepartment(department: Department): Promise<AxiosResponse> {
      let headers = {
        Authorization: `Bearer ${this.authenticationService.token}`,
      };

      let departmentServer = {
        nome: department.name,
        sigla: department.acronym,
      };

      return await api.put(`/setores/${department.id}`, departmentServer, {
        headers,
      });
  }

  async deleteDepartment(id: Number): Promise<AxiosResponse> {
      let headers = {
        Authorization: `Bearer ${this.authenticationService.token}`,
      };

      return await api.delete(`/setores/${id}`, { headers });
  }
}
