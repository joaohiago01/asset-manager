import { Injectable } from '@angular/core';
import { AxiosResponse } from 'axios';
import { Equipment } from 'src/app/shared/models/equipment.model';
import { SoftwareLicense } from 'src/app/shared/models/softwareLicense.model';
import api from 'src/app/shared/services/api';
import { AuthenticationService } from 'src/app/shared/services/authentication.service';

@Injectable({
  providedIn: 'root',
})
export class SoftwareLicenseAssociationService {
  constructor(private authenticationService: AuthenticationService) {}

  async getAllAssociations(id: Number): Promise<Equipment[]> {
    try {
      let associatedEquipments!: Equipment[];

      let headers = {
        Authorization: `Bearer ${this.authenticationService.token}`,
      };

      const response = await api.get(`/licencas-software/${id}/associacoes`, { headers });
      associatedEquipments = response.data.map((associationServer: any) => {
        return new Equipment(
          {
            categoryId: associationServer.categoria.id,
            number: Number.parseInt(associationServer.numero),
            serialNumber: associationServer.numeroSerie,
            description: associationServer.descricao,
            block: associationServer.bloco,
            room: associationServer.sala,
            conservationState: associationServer.estadoConservacao,
            network: {
              hostname: associationServer.rede.hostname,
              addressIP: associationServer.rede.enderecoIP,
              addressMAC: associationServer.rede.enderecoMAC,
            },
            filename: associationServer.nomeArquivo,
          },
          associationServer.id
        );
      });

      return associatedEquipments;
    } catch (error) {
      console.error(error);
      return [];
    }
  }

  async associateSoftwareLicense(id: Number, equipmentId: number): Promise<AxiosResponse> {
    let headers = {
      Authorization: `Bearer ${this.authenticationService.token}`,
    };

    let associationServer = {
      equipamentoId: equipmentId,
    };

    return await api.put(
      `/licencas-software/${id}/associar`,
      associationServer,
      { headers }
    );
  }

  async disassociateSoftwareLicense(id: Number, equipmentId: number): Promise<AxiosResponse> {
    let headers = {
      Authorization: `Bearer ${this.authenticationService.token}`,
    };

    let associationServer = {
      equipamentoId: equipmentId,
    };

    return await api.put(
      `/licencas-software/${id}/desassociar`,
      associationServer,
      { headers }
    );
  }

}
