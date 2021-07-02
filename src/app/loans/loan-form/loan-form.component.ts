import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { DepartmentService } from 'src/app/departments/services/department.service';
import { EquipmentService } from 'src/app/equipments/services/equipment.service';
import { Department } from 'src/app/shared/models/department.model';
import { Equipment } from 'src/app/shared/models/equipment.model';
import { Loan } from 'src/app/shared/models/loan.model';
import { StatusLoan } from 'src/app/shared/models/statusLoan.enum';
import { LoanService } from '../services/loan.service';

@Component({
  selector: 'app-loan-form',
  templateUrl: './loan-form.component.html',
  styleUrls: ['./loan-form.component.css']
})
export class LoanFormComponent implements OnInit {
  public loan?: Loan = <Loan>{};
  public departments: Department[] = [];
  public selectedDepartmentId: number = 0;
  public equipments: Equipment[] = [];
  public selectedEquipmentId: number = 0;
  public myControl = new FormControl();

  constructor(
    private router: Router,
    public loanService: LoanService,
    public departmentService: DepartmentService,
    public equipmentService: EquipmentService) { }

  ngOnInit(): void {
  }

  async createLoan(
    selectedDepartmentId: number,
    selectedEquipmentId: number,
    callNumberSuap: string,
    callLinkSuap: string,
    observations: string,
    outputDate: string,
    returnDate: string,
    expectedReturnDate: string,
    statusLoan: string
  ): Promise<void> {
    if (this.loan) {
      this.editLoan(
        this.loan.id,
        selectedDepartmentId,
        selectedEquipmentId,
        callNumberSuap,
        callLinkSuap,
        observations,
        outputDate,
        returnDate,
        expectedReturnDate,
        statusLoan
      );
    } else {
      if (selectedDepartmentId && selectedEquipmentId) {
        const statusLoanValue: StatusLoan = <StatusLoan> statusLoan;
        let loan = new Loan({
          equipmentId: selectedEquipmentId,
          callNumberSuap: callNumberSuap,
          callLinkSuap: callLinkSuap,
          observations: observations,
          outputDate: new Date(outputDate),
          returnDate: new Date(returnDate),
          expectedReturnDate: new Date(expectedReturnDate),
          statusLoan: statusLoanValue
        });
        let loanWasCreated = await this.loanService.createLoan(loan);
        if (loanWasCreated) {
          this.router.navigate(['loans'], { state: { needReload: true }});
        } else {
          alert('Oops, ocorreu um erro ao tentar cadastrar esse Empréstimo');
        }
      } else {
        alert('Dados Inválidos');
      }
    }
  }

  async editLoan(
    id: number,
    selectedDepartmentId: number,
    selectedEquipmentId: number,
    callNumberSuap: string,
    callLinkSuap: string,
    observations: string,
    outputDate: string,
    returnDate: string,
    expectedReturnDate: string,
    statusLoan: string
  ): Promise<void> {
    if (id && selectedDepartmentId && selectedEquipmentId) {
      const statusLoanValue: StatusLoan = <StatusLoan> statusLoan;
      let loan = new Loan(
        {
          equipmentId: selectedEquipmentId,
          callNumberSuap: callNumberSuap,
          callLinkSuap: callLinkSuap,
          observations: observations,
          outputDate: new Date(outputDate),
          returnDate: new Date(returnDate),
          expectedReturnDate: new Date(expectedReturnDate),
          statusLoan: statusLoanValue
        },
        id
      );
      let loanWasEdited = await this.loanService.editLoan(loan);
      if (loanWasEdited === true) {
        this.loan = undefined;
        this.router.navigate(['loans'], { state: { needReload: true }});
      } else {
        alert('Oops, ocorreu um erro ao tentar editar esse Empréstimo');
      }
    } else {
      alert('Dados Inválidos');
    }
  }

  async deleteLoan(id: number): Promise<void> {
    if (id) {
      let loanWasDeleted = await this.loanService.deleteLoan(id);
      if (loanWasDeleted === true) {
        this.router.navigate(['loans'], { state: { needReload: true }});
      } else {
        alert(
          'Oops, ocorreu um erro ao tentar remover esse Empréstimo'
        );
      }
    } else {
      alert('Empréstimo Não Encontrado');
    }
  }
}
