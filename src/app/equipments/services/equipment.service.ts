import { Injectable } from '@angular/core';
import { Equipment } from 'src/app/shared/models/equipment.model';
import { EquipmentApiCampus } from 'src/app/shared/models/equipmentApiCampus.model';
import { AuthenticationService } from 'src/app/shared/services/authentication.service';
import { AxiosPromise, AxiosResponse } from 'axios';
import api from 'src/app/shared/services/api';
import apiCampus from 'src/app/shared/services/apiCampus';
import * as equipmentsApiCampus from '../../shared/services/equipments-api-campus.json';

@Injectable({
  providedIn: 'root',
})
export class EquipmentService {
  constructor(private authenticationService: AuthenticationService) {}

  async getAllEquipmentsSuggestions(): Promise<EquipmentApiCampus[]> {
    try {
      let equipmentsCampus!: EquipmentApiCampus[];
      /*const response = await apiCampus.get(
        `/datastore_search_sql?sql=SELECT numero, descricao, situacao from  "1144fd11-e7f6-456c-97d3-60a9024aba7b" where "campus.nome" = 'CAMPUS MONTEIRO'`
      );
      equipmentsCampus = response.data.map((equipmentServer: any) => {
        return new EquipmentApiCampus(
          equipmentServer.numero,
          equipmentServer.descricao,
          equipmentServer.situacao
        );
      });*/
      equipmentsCampus = equipmentsApiCampus.result.records.map(
        (equipmentServer: any) => {
          return new EquipmentApiCampus(
            equipmentServer.numero,
            equipmentServer.descricao,
            equipmentServer.situacao
          );
        }
      );

      return equipmentsCampus;
    } catch (error) {
      console.error(error);
      return [];
    }
  }

  async getAllEquipments(): Promise<Equipment[]> {
    try {
      let equipments!: Equipment[];

      let headers = {
        Authorization: `Bearer ${this.authenticationService.token}`,
      };

      const response = await api.get('/equipamentos', { headers });
      equipments = response.data.map((equipmentServer: any) => {
        return new Equipment(
          {
            categoryId: equipmentServer.categoria.id,
            number: Number.parseInt(equipmentServer.numero),
            serialNumber: equipmentServer.numeroSerie,
            description: equipmentServer.descricao,
            block: equipmentServer.bloco,
            room: equipmentServer.sala,
            conservationState: equipmentServer.estadoConservacao,
            network: {
              hostname: equipmentServer.rede.hostname,
              addressIP: equipmentServer.rede.enderecoIP,
              addressMAC: equipmentServer.rede.enderecoMAC,
            },
            filename: equipmentServer.nomeArquivo,
          },
          equipmentServer.id
        );
      });

      return equipments;
    } catch (error) {
      console.error(error);
      return [];
    }
  }

  async sendFile(file: File, equipmentId: number): Promise<AxiosResponse> {
    let headers = {
      Authorization: `Bearer ${this.authenticationService.token}`,
    };
    const formData = new FormData();
    formData.append('arquivo', file);
    const response = await api.post(
      `/equipamentos/${equipmentId}/file`,
      formData,
      { headers }
    );
    
    return response;
  }

  async getFile(equipmentId: number): Promise<AxiosResponse> {
    let headers = {
      Authorization: `Bearer ${this.authenticationService.token}`,
    };
    
    const response = await api.get(
      `/equipamentos/${equipmentId}/file`,
      { headers }
    );
    return response;
  }

  async createEquipment(equipment: Equipment): Promise<AxiosResponse> {
    let headers = {
      Authorization: `Bearer ${this.authenticationService.token}`,
    };

    let equipmentServer = {
      categoriaId: equipment.categoryId,
      numero: equipment.number,
      numeroSerie: equipment.serialNumber,
      descricao: equipment.description,
      bloco: equipment.block,
      sala: equipment.room,
      estadoConservacao: equipment.conservationState,
      rede: {
        hostname: equipment.network.hostname,
        enderecoIP: equipment.network.addressIP,
        enderecoMAC: equipment.network.addressMAC,
      },
      nomeArquivo: equipment.filename,
    };
    
    return await api.post('/equipamentos', equipmentServer, { headers });
  }

  async editEquipment(equipment: Equipment): Promise<AxiosPromise> {
    let headers = {
      Authorization: `Bearer ${this.authenticationService.token}`,
    };

    let equipmentServer = {
      categoriaId: equipment.categoryId,
      numero: equipment.number,
      numeroSerie: equipment.serialNumber,
      descricao: equipment.description,
      bloco: equipment.block,
      sala: equipment.room,
      estadoConservacao: equipment.conservationState,
      rede: {
        hostname: equipment.network.hostname,
        enderecoIP: equipment.network.addressIP,
        enderecoMAC: equipment.network.addressMAC,
      },
      nomeArquivo: equipment.filename,
    };

    return await api.put(`/equipamentos/${equipment.id}`, equipmentServer, {
      headers,
    });
  }

  async deleteEquipment(id: Number): Promise<AxiosPromise> {
    let headers = {
      Authorization: `Bearer ${this.authenticationService.token}`,
    };

    return await api.delete(`/equipamentos/${id}`, { headers });
  }
}
