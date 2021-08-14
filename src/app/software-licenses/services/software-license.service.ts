import { Injectable } from '@angular/core';
import { AxiosResponse } from 'axios';
import { SoftwareLicense } from 'src/app/shared/models/softwareLicense.model';
import api from 'src/app/shared/services/api';
import { AuthenticationService } from 'src/app/shared/services/authentication.service';

@Injectable({
  providedIn: 'root',
})
export class SoftwareLicenseService {
  constructor(private authenticationService: AuthenticationService) {}

  async createSoftwareLicense(
    softwareLicense: SoftwareLicense
  ): Promise<AxiosResponse> {
    let headers = {
      Authorization: `Bearer ${this.authenticationService.token}`,
    };

    let softwareLicenseServer = {
      categoriaId: softwareLicense.categoryId,
      software: softwareLicense.name,
      numero: softwareLicense.number,
      chaveAtivacao: softwareLicense.activationKey,
      maximoAtivacoes: softwareLicense.maxActivations,
      ativacoesInfinitas: softwareLicense.ignoreMaxActivations
    };
    
    return await api.post('/licencas-software', softwareLicenseServer, { headers });
  }

  async editSoftwareLicense(
    softwareLicense: SoftwareLicense
  ): Promise<AxiosResponse> {
    let headers = {
      Authorization: `Bearer ${this.authenticationService.token}`,
    };

    let softwareLicenseServer = {
      categoriaId: softwareLicense.categoryId,
      software: softwareLicense.name,
      numero: softwareLicense.number,
      chaveAtivacao: softwareLicense.activationKey,
      maximoAtivacoes: softwareLicense.maxActivations,
      ativacoesInfinitas: softwareLicense.ignoreMaxActivations
    };

    return await api.put(
      `/licencas-software/${softwareLicense.id}`,
      softwareLicenseServer,
      { headers }
    );
  }

  async deleteSoftwareLicense(id: Number): Promise<AxiosResponse> {
    let headers = {
      Authorization: `Bearer ${this.authenticationService.token}`,
    };

    return await api.delete(`/licencas-software/${id}`, { headers });
  }

  async getAllSoftwareLicenses(): Promise<SoftwareLicense[]> {
    try {
      let softwareLicenses!: SoftwareLicense[];

      let headers = {
        Authorization: `Bearer ${this.authenticationService.token}`,
      };

      const response = await api.get('/licencas-software', { headers });
      softwareLicenses = response.data.map((softwareLicenseServer: any) => {
        return new SoftwareLicense(
          {
            name: softwareLicenseServer.software,
            number: softwareLicenseServer.numero,
            activationKey: softwareLicenseServer.chaveAtivacao,
            maxActivations: softwareLicenseServer.maximoAtivacoes,
            numberOfActivationsUsed:
              softwareLicenseServer.quantidadeUsada,
            ignoreMaxActivations: softwareLicenseServer.ativacoesInfinitas,
            categoryId: softwareLicenseServer.categoria.id,
            categoryName: softwareLicenseServer.categoria.nome,
          },
          softwareLicenseServer.id
        );
      });

      return softwareLicenses;
    } catch (error) {
      console.error(error);
      return [];
    }
  }
}
