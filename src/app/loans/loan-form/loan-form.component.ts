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
        expectedReturnDate: new Date(expectedReturnDate),
        department: selectedDepartment,
        consignor,
        requestor
      });

      try {
        const response = await this.loanService.createLoan(loan);
  
        this.utilityService.showNotification('Empr??stimo cadastrado com sucesso');
  
        setTimeout(() => {
          this.utilityService.closeNotification();
  
          this.router.navigate(['loans'], {
            state: { needReload: true },
          });
        }, 1000);
        
      } catch (error) {
        if (!error.response) {
          this.utilityService.showNotification('Oops, ocorreu um erro desconhecido! Tente novamente');
        }
  
        this.utilityService.showNotification(error.response.data['detail']);
  
        setTimeout(() => {
          this.utilityService.closeNotification();
        }, 4000);
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
    let statusLoanSelected: StatusLoan = <StatusLoan> statusLoan;

    if (returnDate && this.loan?.statusLoan !== StatusLoan.DEVOLVIDO) {
      statusLoanSelected = StatusLoan.DEVOLVIDO;
    }

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

      this.utilityService.showNotification('Empr??stimo atualizado com sucesso');

      setTimeout(() => {
        this.utilityService.closeNotification();

        this.router.navigate(['loans'], {
          state: { needReload: true },
        });
      }, 1000);
      
    } catch (error) {
      if (!error.response) {
        this.utilityService.showNotification('Oops, ocorreu um erro desconhecido! Tente novamente');
      }

      this.utilityService.showNotification(error.response.data['detail']);

      setTimeout(() => {
        this.utilityService.closeNotification();
      }, 4000);
    }
  }

  async deleteLoan(id: number): Promise<void> {
    if (id) {
      try {
        const response = await this.loanService.deleteLoan(id);
  
        this.utilityService.showNotification('Empr??stimo exclu??do com sucesso');
  
        setTimeout(() => {
          this.utilityService.closeNotification();
  
          this.router.navigate(['loans'], {
            state: { needReload: true },
          });
        }, 1000);
        
      } catch (error) {
        this.utilityService.showNotification('O empr??stimo n??o pode ser exclu??do');
  
        setTimeout(() => {
          this.utilityService.closeNotification();
        }, 4000);
      }
    }
  }

}
