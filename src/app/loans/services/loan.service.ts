import { Injectable } from '@angular/core';
import { Loan } from 'src/app/shared/models/loan.model';
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

      let loanServer = {
        numeroChamadoSuap: loan.callNumberSuap,
        linkChamadoSuap: loan.callLinkSuap,
        observacoes: loan.observations,
        dataSaida: loan.outputDate,
        dataPrevistaRetorno: loan.returnDate,
        dataRetorno: loan.expectedReturnDate,
        status: loan.statusLoan,
        equipamentoId: loan.equipmentId,
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

      let loanServer = {
        numeroChamadoSuap: loan.callNumberSuap,
        linkChamadoSuap: loan.callLinkSuap,
        observacoes: loan.observations,
        dataSaida: loan.outputDate,
        dataPrevistaRetorno: loan.returnDate,
        dataRetorno: loan.expectedReturnDate,
        status: loan.statusLoan,
        equipamentoId: loan.equipmentId,
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
}
