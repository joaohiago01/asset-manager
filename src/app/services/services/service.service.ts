import { Injectable } from '@angular/core';
import { AxiosResponse } from 'axios';
import { OutputAsset } from 'src/app/shared/models/outputAsset.model';
import { Service } from 'src/app/shared/models/service.model';
import api from 'src/app/shared/services/api';
import { AuthenticationService } from 'src/app/shared/services/authentication.service';

@Injectable({
  providedIn: 'root',
})
export class ServiceService {
  constructor(private authenticationService: AuthenticationService) {}

  async createService(service: Service): Promise<AxiosResponse> {
    let headers = {
      Authorization: `Bearer ${this.authenticationService.token}`,
    };

    let equipamentoIdInputDTO = {
      id: service.equipmentId
    };
    let setorIdInputDTO = {
      id: service.departmentId
    };
    let expedidor = {
      matricula: service.consignor?.registrationNumber,
      nome: service.consignor?.name
    };
    let solicitante = {
      matricula: service.requestor?.registrationNumber,
      nome: service.requestor?.name
    };
    let retiradas = service.assetOutputs?.map((assetOutput) => (
      {
        quantidade: assetOutput.amount,
        insumoId: assetOutput.assetId,
        numeroChamadoSuap: service.callNumberSuap,
        linkChamadoSuap: service.callLinkSuap,
        observacoes: service.observations,
        setor: setorIdInputDTO,
        expedidor,
        solicitante
      }
    ));
    
    let serviceServer = {
      numeroChamadoSuap: service.callNumberSuap,
      linkChamadoSuap: service.callLinkSuap,
      observacoes: service.observations,
      dataRetorno: service.returnDate,
      descricao: service.description,
      tipoServico: service.serviceType,
      equipamento: equipamentoIdInputDTO,
      setor: setorIdInputDTO,
      retiradas,
      expedidor,
      solicitante
    };

    return await api.post('/servicos', serviceServer, { headers });
  }

  async editService(service: Service): Promise<AxiosResponse> {
    let headers = {
      Authorization: `Bearer ${this.authenticationService.token}`,
    };

    let equipamentoIdInputDTO = {
      id: service.equipmentId
    };
    let setorIdInputDTO = {
      id: service.departmentId
    };
    let expedidor = {
      matricula: service.consignor?.registrationNumber,
      nome: service.consignor?.name
    };
    let solicitante = {
      matricula: service.requestor?.registrationNumber,
      nome: service.requestor?.name
    };
    let serviceServer = {
      numeroChamadoSuap: service.callNumberSuap,
      linkChamadoSuap: service.callLinkSuap,
      observacoes: service.observations,
      dataRetorno: service.returnDate,
      descricao: service.description,
      tipoServico: service.serviceType,
      equipamento: equipamentoIdInputDTO,
      setor: setorIdInputDTO,
      expedidor,
      solicitante
    };

    return await api.put(`/servicos/${service.id}`, serviceServer,{ headers });
  }

  async deleteService(id: Number): Promise<AxiosResponse> {
      let headers = {
        Authorization: `Bearer ${this.authenticationService.token}`,
      };

      return await api.delete(`/servicos/${id}`, { headers });
  }

  async getAllServices(): Promise<Service[]> {
    try {
      let services!: Service[];

      let headers = {
        Authorization: `Bearer ${this.authenticationService.token}`,
      };

      const response = await api.get('/servicos', { headers });
      services = response.data.map((serviceServer: any) => {
        return new Service(
          {
            callNumberSuap: serviceServer.numeroChamadoSuap,
            callLinkSuap: serviceServer.linkChamadoSuap,
            observations: serviceServer.observacoes,
            outputDate: serviceServer.dataSaida,
            returnDate: serviceServer.dataRetorno,
            description: serviceServer.descricao,
            serviceType: serviceServer.tipoServico,
            equipmentId: serviceServer.equipamento.id,
            equipmentName: serviceServer.equipamento.descricao,
            department: {
              name: serviceServer.setor.nome,
              acronym: serviceServer.setor.sigla,
              id: serviceServer.setor.id,
            },
            requestor: {
              name: serviceServer.solicitante.nome,
              registrationNumber: serviceServer.solicitante.matricula,
            },
            consignor: {
              name: serviceServer.expedidor.nome,
              registrationNumber: serviceServer.expedidor.matricula,
            },
          },
          serviceServer.id
        );
      });

      return services;
    } catch (error) {
      console.error(error);
      return [];
    }
  }
}
