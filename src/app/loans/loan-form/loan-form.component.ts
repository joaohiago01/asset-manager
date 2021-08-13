import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { DepartmentService } from 'src/app/departments/services/department.service';
import { EquipmentService } from 'src/app/equipments/services/equipment.service';
import { Contributor } from 'src/app/shared/models/contributor.model';
import { Department } from 'src/app/shared/models/department.model';
import { Equipment } from 'src/app/shared/models/equipment.model';
import { Loan } from 'src/app/shared/models/loan.model';
import { StatusLoan } from 'src/app/shared/models/statusLoan.enum';
import { UtilityService } from 'src/app/shared/services/utility.service';
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
  public statusLoans: string[] = [];
  public selectedStatusLoan: string = '';
  public myControl = new FormControl();

  constructor(
    private router: Router,
    public loanService: LoanService,
    public departmentService: DepartmentService,
    public equipmentService: EquipmentService,
    public utilityService: UtilityService
    ) {
      const loan: Loan = <Loan>(
        this.router.getCurrentNavigation()?.extras.state
      );
      if (loan != null && loan != undefined) {
        const map = new Map(Object.entries(Object.values(loan)));
        const loanNumber: string = map.get('0')['number'];
        this.myControl.setValue(loanNumber);
      }
  }

  async ngOnInit(): Promise<void> {
    this.loan = window.history.state.loan;
    this.equipments = await this.equipmentService.getAllEquipments();
    this.departments = await this.departmentService.getAllDepartments();
    this.statusLoans = Object.values(StatusLoan);
    if (this.loan) {
      let selectedStatusLoan = this.statusLoans.find(
        (statusLoan: any) => statusLoan === this.loan?.statusLoan
      );
      this.selectedStatusLoan = selectedStatusLoan ? selectedStatusLoan : '';
      let selectedEquipmentId = this.equipments.find(
        (equipment: Equipment) => equipment.id === this.loan?.equipmentId
      )?.id;
      this.selectedEquipmentId = selectedEquipmentId ? selectedEquipmentId : 0;
      let selectedDepartmentId = this.departments.find(
        (department: Department) => department.id === this.loan?.department?.id
      )?.id;
      this.selectedDepartmentId = selectedDepartmentId ? selectedDepartmentId : 0;
      let returnDateIndexOfHours = this.loan.returnDate.indexOf('T');
      this.loan.returnDate = this.loan.returnDate.slice(0, returnDateIndexOfHours);
      let expectedReturnDateIndexOfHours = this.loan.expectedReturnDate.indexOf('T');
      this.loan.expectedReturnDate = this.loan.expectedReturnDate.slice(0, expectedReturnDateIndexOfHours);
    }
  }

  async createLoan(
    selectedDepartmentId: number,
    selectedEquipmentId: number,
    callNumberSuap: string,
    callLinkSuap: string,
    observations: string,
    returnDate: string,
    expectedReturnDate: string,
    statusLoan: string,
    consignorName: string,
    consignorRegistrationNumber: string,
    requestorName: string,
    requestorRegistrationNumber: string
  ): Promise<void> {
    if (this.loan) {
      this.editLoan(
        this.loan.id,
        selectedDepartmentId,
        selectedEquipmentId,
        callNumberSuap,
        callLinkSuap,
        observations,
        returnDate,
        expectedReturnDate,
        statusLoan,
        consignorName,
        consignorRegistrationNumber,
        requestorName,
        requestorRegistrationNumber
      );
    } else {
      if (selectedDepartmentId && selectedEquipmentId) {
        const selectedDepartment = this.departments.find(d => d.id == selectedDepartmentId);
        const consignor = new Contributor({
          name: consignorName,
          registrationNumber: consignorRegistrationNumber
        });
        const requestor = new Contributor({
          name: requestorName,
          registrationNumber: requestorRegistrationNumber
        });
        let loan = new Loan({
          equipmentId: selectedEquipmentId,
          callNumberSuap: callNumberSuap,
          callLinkSuap: callLinkSuap,
          observations: observations,
          outputDate: new Date(),
          returnDate: new Date(returnDate),
          expectedReturnDate: new Date(expectedReturnDate),
          department: selectedDepartment,
          consignor,
          requestor
        });

        console.log(loan);

        try {
          const response = await this.loanService.createLoan(loan);

          this.utilityService.showNotification('Empréstimo cadastrado com sucesso!');

          setTimeout(() => {
            this.utilityService.closeNotification();

            this.router.navigate(['loans'], {
              state: { needReload: true },
            });
          }, 3000);

        } catch (error) {
          this.utilityService.showNotification("Oops, ocorreu um erro inesperado ao salvar! Tente novamente");

          setTimeout(() => {
            this.utilityService.closeNotification();
          }, 5000);
        }
        
      } else {
        this.utilityService.showNotification('Verifique se os campos estão preenchidos corretamente');

        setTimeout(() => {
          this.utilityService.closeNotification();
        }, 5000);
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
    returnDate: string,
    expectedReturnDate: string,
    statusLoan: string,
    consignorName: string,
    consignorRegistrationNumber: string,
    requestorName: string,
    requestorRegistrationNumber: string
  ): Promise<void> {
    if (id && selectedDepartmentId && selectedEquipmentId) {
      const statusLoanSelected: StatusLoan = <StatusLoan> statusLoan;
      const selectedDepartment = this.departments.find(d => d.id === selectedDepartmentId);
      const consignor = new Contributor({
        name: consignorName,
        registrationNumber: consignorRegistrationNumber
      });
      const requestor = new Contributor({
        name: requestorName,
        registrationNumber: requestorRegistrationNumber
      });
      let loan = new Loan(
        {
          equipmentId: selectedEquipmentId,
          callNumberSuap: callNumberSuap,
          callLinkSuap: callLinkSuap,
          observations: observations,
          returnDate: new Date(returnDate),
          expectedReturnDate: new Date(expectedReturnDate),
          statusLoan: statusLoanSelected,
          department: selectedDepartment,
          consignor,
          requestor
        },
        id
      );

      try {
        const response = await this.loanService.editLoan(loan);

        this.utilityService.showNotification('Empréstimo atualizado com sucesso!');

        setTimeout(() => {
          this.utilityService.closeNotification();

          this.router.navigate(['loans'], {
            state: { needReload: true },
          });
        }, 3000);

      } catch (error) {
        this.utilityService.showNotification("Oops, ocorreu um erro inesperado ao salvar! Tente novamente");

        setTimeout(() => {
          this.utilityService.closeNotification();
        }, 5000);
      }
      
    } else {
      this.utilityService.showNotification('Verifique se os campos estão preenchidos corretamente');

      setTimeout(() => {
        this.utilityService.closeNotification();
      }, 5000);
    }
  }

  async deleteLoan(id: number): Promise<void> {
    if (id) {
      try {
        const response = await this.loanService.deleteLoan(id);

        this.utilityService.showNotification("O Empréstimo foi excluído com sucesso!");

        setTimeout(() => {
          this.utilityService.closeNotification();

          this.router.navigate(['loans'], {
            state: { needReload: true },
          });
        }, 3000);
      } catch (error) {
        this.utilityService.showNotification("O Empréstimo não pode ser excluído");

        setTimeout(() => {
          this.utilityService.closeNotification();
        }, 5000);
      }

    } else {
      this.utilityService.showNotification("Empréstimo não encontrado");

      setTimeout(() => {
        this.utilityService.closeNotification();
      }, 5000);
    }
  }
}
