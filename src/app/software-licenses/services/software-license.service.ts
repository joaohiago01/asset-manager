import { Injectable } from '@angular/core';
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
  ): Promise<boolean> {
    let softwareLicenseWasCreated = false;

    try {
      let headers = {
        Authorization: `Bearer ${this.authenticationService.token}`,
      };

      let softwareLicenseServer = {
        categoriaId: softwareLicense.categoryId,
        software: softwareLicense.name,
        numero: softwareLicense.number,
        chaveAtivacao: softwareLicense.activationKey,
        maximoAtivacoes: softwareLicense.maxActivations,
        quantidadeUsada: softwareLicense.numberOfActivationsUsed,
      };
      await api.post('/licencas-software', softwareLicenseServer, { headers });
      softwareLicenseWasCreated = true;
      return softwareLicenseWasCreated;
    } catch (error) {
      console.error(error);
      return (softwareLicenseWasCreated = false);
    }
  }

  async editSoftwareLicense(
    softwareLicense: SoftwareLicense
  ): Promise<boolean> {
    let softwareLicenseWasEdited = false;

    try {
      let headers = {
        Authorization: `Bearer ${this.authenticationService.token}`,
      };

      let softwareLicenseServer = {
        categoriaId: softwareLicense.categoryId,
        software: softwareLicense.name,
        numero: softwareLicense.number,
        chaveAtivacao: softwareLicense.activationKey,
        maximoAtivacoes: softwareLicense.maxActivations,
        quantidadeUsada: softwareLicense.numberOfActivationsUsed,
      };

      await api.put(
        `/licencas-software/${softwareLicense.id}`,
        softwareLicenseServer,
        { headers }
      );
      softwareLicenseWasEdited = true;
      return softwareLicenseWasEdited;
    } catch (error) {
      console.error(error);
      return (softwareLicenseWasEdited = false);
    }
  }

  async deleteSoftwareLicense(id: Number): Promise<boolean> {
    let softwareLicenseWasDeleted = false;
    try {
      let headers = {
        Authorization: `Bearer ${this.authenticationService.token}`,
      };

      await api.delete(`/licencas-software/${id}`, { headers });
      softwareLicenseWasDeleted = true;

      alert('Deletado com sucesso!');

      return softwareLicenseWasDeleted;
    } catch (error) {
      console.error(error);
      return (softwareLicenseWasDeleted = false);
    }
  }

  async getAllSoftwareLicenses(): Promise<SoftwareLicense[]> {
    try {
      let softwareLicenses!: SoftwareLicense[];

      let headers = {
        Authorization: `Bearer ${this.authenticationService.token}`,
      };

      const response = await api.get('/licenca-software', { headers });
      softwareLicenses = response.data.map((softwareLicenseServer: any) => {
        return new SoftwareLicense(
          {
            name: softwareLicenseServer.nome,
            number: softwareLicenseServer.numero,
            activationKey: softwareLicenseServer.chaveAtivacao,
            maxActivations: softwareLicenseServer.maxAtivacoes,
            numberOfActivationsUsed:
              softwareLicenseServer.numeroDeAtivacoesUsadas,
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
