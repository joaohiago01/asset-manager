import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Loan } from 'src/app/shared/models/loan.model';
import { UtilityService } from 'src/app/shared/services/utility.service';
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
    private loanService: LoanService,
    public utilityService: UtilityService
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

    if (!this.loans) {
      this.utilityService.showNotification('Nenhum empréstimo encontrado');

      setTimeout(() => {
        this.utilityService.closeNotification();
      }, 3000);
    }
  }

  async detailLoan(loanId: number) {
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
