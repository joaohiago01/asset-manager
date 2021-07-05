import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Loan } from 'src/app/shared/models/loan.model';
import { LoanService } from '../services/loan.service';

@Component({
  selector: 'app-loan-list',
  templateUrl: './loan-list.component.html',
  styleUrls: ['./loan-list.component.css']
})
export class LoanListComponent implements OnInit {

  public loans: Loan[] = [];
  public selectedLoan!: Loan;

  constructor(
    private router: Router,
    private loanService: LoanService
  ) {}

  async ngOnInit(): Promise<void> {
    if (window.history.state.needReload) {
      window.location.reload();
    } else {
      await this.getAllLoans();
    }
  }

  async getAllLoans(): Promise<void> {
    this.loans = await this.loanService.getAllLoans();
    this.loans = this.loans.map((loan: Loan) => {
      loan.outputDate = new Date(loan.outputDate).toLocaleString();
      loan.expectedReturnDate = new Date(loan.expectedReturnDate).toLocaleString();
      loan.returnDate = new Date(loan.returnDate).toLocaleString();
      return loan;
    });

    if (!this.loans) {
      alert('Nenhum empréstimo encontrado');
    }
  }

  async detailLoan(loanId: number) {
    this.loans = await this.loanService.getAllLoans();
    this.selectedLoan = <Loan>(
      this.loans.find(
        (loan: Loan) => loan.id === loanId
      )
    );

    this.router.navigate(['loans/form'], {
      state: { loan: this.selectedLoan },
    });
  }

  navigateToLoanCreate(): void {
    this.router.navigate(['/loans/form']);
  }

}
