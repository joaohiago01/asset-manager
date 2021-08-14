import { Injectable } from '@angular/core';
import { AxiosResponse } from 'axios';
import { Loan } from 'src/app/shared/models/loan.model';
import { StatusLoan } from 'src/app/shared/models/statusLoan.enum';
import api from 'src/app/shared/services/api';
import { AuthenticationService } from 'src/app/shared/services/authentication.service';

@Injectable({
  providedIn: 'root',
})
export class LoanService {
  constructor(private authenticationService: AuthenticationService) {}

  async createLoan(loan: Loan): Promise<AxiosResponse> {
    let headers = {
      Authorization: `Bearer ${this.authenticationService.token}`,
    };

    let equipamentoIdInputDTO = {
      id: loan.equipmentId
    };
    let setorIdInputDTO = {
      id: loan.department?.id
    };
    let expedidor = {
      matricula: loan.consignor?.registrationNumber,
      nome: loan.consignor?.name
    };
    let solicitante = {
      matricula: loan.requestor?.registrationNumber,
      nome: loan.requestor?.name
    };
    let loanServer = {
      numeroChamadoSuap: loan.callNumberSuap,
      linkChamadoSuap: loan.callLinkSuap,
      observacoes: loan.observations,
      dataSaida: loan.outputDate.toISOString(),
      dataPrevistaRetorno: loan.expectedReturnDate.toISOString(),
      dataRetorno: loan.returnDate.toISOString(),
      status: StatusLoan.EMPRESTADO,
      equipamento: equipamentoIdInputDTO,
      setor: setorIdInputDTO,
      expedidor,
      solicitante
    };

    return await api.post('/emprestimos', loanServer, { headers });
  }

  async editLoan(loan: Loan): Promise<AxiosResponse> {
    let headers = {
      Authorization: `Bearer ${this.authenticationService.token}`,
    };

    let equipamentoIdInputDTO = {
      id: loan.equipmentId
    };
    let setorIdInputDTO = {
      id: loan.department?.id
    };
    let expedidor = {
      matricula: loan.consignor?.registrationNumber,
      nome: loan.consignor?.name
    };
    let solicitante = {
      matricula: loan.requestor?.registrationNumber,
      nome: loan.requestor?.name
    };
    let loanServer = {
      numeroChamadoSuap: loan.callNumberSuap,
      linkChamadoSuap: loan.callLinkSuap,
      observacoes: loan.observations,
      dataPrevistaRetorno: loan.expectedReturnDate,
      dataRetorno: loan.returnDate,
      status: loan.statusLoan,
      equipamento: equipamentoIdInputDTO,
      setor: setorIdInputDTO,
      expedidor,
      solicitante
    };

    return await api.put(`/emprestimos/${loan.id}`, loanServer,{ headers });
  }

  async deleteLoan(id: Number): Promise<AxiosResponse> {
    let headers = {
      Authorization: `Bearer ${this.authenticationService.token}`,
    };
    
    return await api.delete(`/emprestimos/${id}`, { headers });
  }

  async getAllLoans(): Promise<Loan[]> {
    try {
      let loans!: Loan[];

      let headers = {
        Authorization: `Bearer ${this.authenticationService.token}`,
      };

      const response = await api.get('/emprestimos', { headers });
      loans = response.data.map((loanServer: any) => {
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

      return loans;
    } catch (error) {
      console.error(error);
      return [];
    }
  }

}
