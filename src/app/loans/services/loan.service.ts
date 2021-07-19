import { Injectable } from '@angular/core';
import { Loan } from 'src/app/shared/models/loan.model';
import { StatusLoan } from 'src/app/shared/models/statusLoan.enum';
import api from 'src/app/shared/services/api';
import { AuthenticationService } from 'src/app/shared/services/authentication.service';

@Injectable({
  providedIn: 'root',
})
export class LoanService {
  constructor(private authenticationService: AuthenticationService) {}

  async createLoan(loan: Loan): Promise<boolean> {
    let loanWasCreated = false;
    try {
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

      await api.post('/emprestimos', loanServer, { headers });
      loanWasCreated = true;
      return loanWasCreated;
    } catch (error) {
      console.error(error);
      return (loanWasCreated = false);
    }
  }

  async editLoan(loan: Loan): Promise<boolean> {
    let loanWasEdited = false;
    try {
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

      await api.put(`/emprestimos/${loan.id}`, loanServer,{ headers });
      loanWasEdited = true;
      return loanWasEdited;
    } catch (error) {
      console.error(error);
      return (loanWasEdited = false);
    }
  }

  async deleteLoan(id: Number): Promise<boolean> {
    let loanWasDeleted = false;
    try {
      let headers = {
        Authorization: `Bearer ${this.authenticationService.token}`,
      };
      await api.delete(`/emprestimos/${id}`, { headers });
      loanWasDeleted = true;
      alert('Deletado com sucesso!');
      return loanWasDeleted;
    } catch (error) {
      console.error(error);
      return (loanWasDeleted = false);
    }
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
