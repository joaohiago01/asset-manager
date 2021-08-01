import { Injectable } from '@angular/core';
import { Dashboard } from 'src/app/shared/models/dashboard.model';
import { InputAsset } from 'src/app/shared/models/inputAsset.model';
import { Loan } from 'src/app/shared/models/loan.model';
import { OutputAsset } from 'src/app/shared/models/outputAsset.model';
import api from 'src/app/shared/services/api';
import { AuthenticationService } from 'src/app/shared/services/authentication.service';
import { Service } from '../../shared/models/service.model';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(private authenticationService: AuthenticationService) { }

  async getDashboard(): Promise<Dashboard> {
    let dashboard!: Dashboard;
    try {
      let headers = {
        Authorization: `Bearer ${this.authenticationService.token}`,
      };

      const response = await api.get('/dashboard', { headers });
      dashboard = new Dashboard({
        assetInputs: mapToAssetInput(response.data.entradasInsumos),
        assetOutputs: mapToAssetOutput(response.data.retiradasInsumos),
        loans: mapToLoan(response.data.emprestimos),
        services: mapToService(response.data.servicos)
      });

      return dashboard;
    } catch (error) {
      console.error(error);
      return dashboard;
    }
  }
}

function mapToService(servicesServer: any) {
  return servicesServer.map((serviceServer: any) => {
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
}

function mapToLoan(loansServer: any) {
  return loansServer.map((loanServer: any) => {
    return new Loan(
      {
        callNumberSuap: loanServer.numeroChamadoSuap,
        callLinkSuap: loanServer.linkChamadoSuap,
        observations: loanServer.observacoes,
        outputDate: loanServer.dataSaida,
        expectedReturnDate: loanServer.dataPrevistaRetorno,
        returnDate: loanServer.dataRetorno,
        statusLoan: loanServer.status,
        equipmentId: loanServer.equipamento.id,
        equipmentName: loanServer.equipamento.descricao,
        department: {
          name: loanServer.setor.nome,
          acronym: loanServer.setor.sigla,
          id: loanServer.setor.id,
        },
        requestor: {
          name: loanServer.solicitante.nome,
          registrationNumber: loanServer.solicitante.matricula,
        },
        consignor: {
          name: loanServer.expedidor.nome,
          registrationNumber: loanServer.expedidor.matricula,
        },
      },
      loanServer.id
    );
  });
}

function mapToAssetOutput(outputsAssetServer: any) {
  return outputsAssetServer.map((outputAssetServer: any) => {
    return new OutputAsset(
      {
        amount: outputAssetServer.quantidade,
        outputDate: outputAssetServer.dataSaida,
        callNumberSuap: outputAssetServer.numeroChamadoSuap,
        callLinkSuap: outputAssetServer.linkChamadoSuap,
        observations: outputAssetServer.observacoes,
        consignor: {
            registrationNumber: outputAssetServer.expedidor.matricula,
            name: outputAssetServer.expedidor.nome,
        },
        requestor: {
            registrationNumber: outputAssetServer.solicitante.matricula,
            name: outputAssetServer.solicitante.nome,
        },
        department: {
            id: outputAssetServer.setor.id,
            name: outputAssetServer.setor.nome,
            acronym: outputAssetServer.setor.sigla,
        },
        assetId: outputAssetServer.insumo.id,
        assetName: outputAssetServer.insumo.nome,
      },
      outputAssetServer.id
    );
  });
}

function mapToAssetInput(inputsAssetServer: any) {
  return inputsAssetServer.map((inputAssetServer: any) => {
    return new InputAsset(
      {
        inputDate: inputAssetServer.data,
        expirationDate: inputAssetServer.dataValidade,
        amount: inputAssetServer.quantidade,
        assetId: inputAssetServer.insumo.id,
        assetName: inputAssetServer.insumo.nome
      },
      inputAssetServer.id
    );
  });
}
