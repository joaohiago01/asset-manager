import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { DepartmentService } from 'src/app/departments/services/department.service';
import { Asset } from 'src/app/shared/models/asset.model';
import { Department } from 'src/app/shared/models/department.model';
import { InputAsset } from 'src/app/shared/models/inputAsset.model';
import { OutputAsset } from 'src/app/shared/models/outputAsset.model';
import { UtilityService } from 'src/app/shared/services/utility.service';
import { AssetService } from '../services/asset.service';
import { InputAssetService } from '../services/inputAsset.service';
import { OutputAssetService } from '../services/outputAsset.service';

@Component({
  selector: 'app-asset-details',
  templateUrl: './asset-details.component.html',
  styleUrls: ['./asset-details.component.css']
})
export class AssetDetailsComponent implements OnInit {

  public asset?: Asset = <Asset>{};
  public assetInputs: InputAsset[] = [];
  public assetOutputs: OutputAsset[] = [];
  public myControl = new FormControl();
  public inputActive: boolean = true;
  public outputActive:boolean = false;

  public selectedInputAsset: InputAsset = <InputAsset>{};
  public selectedOutputAsset: OutputAsset = <OutputAsset>{};

  public departments: Department[] = [];
  public selectedDepartmentId: number = 0;

  constructor(
    private router: Router,
    public assetService: AssetService,
    public inputAssetService: InputAssetService,
    public outputAssetService: OutputAssetService,
    public departmentService: DepartmentService,
    public utilityService: UtilityService
  ) {
    const asset: Asset = <Asset>(
      this.router.getCurrentNavigation()?.extras.state
    );

    if (asset) {
      const map = new Map(Object.entries(Object.values(asset)));
      const assetNumber: string = map.get('0')['number'];
      this.myControl.setValue(assetNumber);
    }

  }

  async ngOnInit(): Promise<void> {
    this.asset = window.history.state.asset;

    if (window.history.state.needReload) {
      window.location.reload();
    } else {
      if (this.asset?.id) {
        await this.getAllAssetInputs(this.asset.id);
        await this.getAllAssetOutputs(this.asset.id)
      }

      this.departments = await this.departmentService.getAllDepartments();
    }
  }

  async getAllAssetInputs(assetId: number): Promise<void> {
    this.assetInputs = await this.inputAssetService.getAllInputs(assetId);
  }

  async getAllAssetOutputs(assetId: number): Promise<void> {
    this.assetOutputs = await this.outputAssetService.getAllOutputs(assetId);
  }

  async addAssetInput(inputDate: string, expirationDate: string, amount: string): Promise<void> {
    if (this.asset?.id != undefined) {
      const inputAsset = new InputAsset({
        inputDate: new Date(inputDate),
        expirationDate: new Date(expirationDate),
        amount: Number(amount),
      });

      try {
        const response = await this.inputAssetService.saveInputAsset(this.asset.id, inputAsset);

        this.utilityService.showNotification('Entrada de Insumo cadastrada com sucesso');

        setTimeout(() => {
          this.utilityService.closeNotification();

          if (this.asset?.currentQuantity)
            this.asset.currentQuantity += inputAsset.amount;

          this.router.navigate(['assets/details'], {
            state: { asset: this.asset },
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

  async addAssetOutput(
    amount: string,
    selectedDepartmentId: number,
    callNumberSuap: string,
    callLinkSuap: string,
    observations: string,
    consignorName: string,
    consignorRegistrationNumber: string,
    requestorName: string,
    requestorRegistrationNumber: string
  ): Promise<void> {
    if (this.asset?.id) {
      const outputAsset = new OutputAsset({
        amount: Number(amount),
        assetId: this.asset?.id,
        departmentId: selectedDepartmentId,
        callNumberSuap: callNumberSuap,
        callLinkSuap: callLinkSuap,
        observations: observations,
        consignor: {
          registrationNumber: consignorRegistrationNumber,
          name: consignorName,
        },
        requestor: {
          registrationNumber: requestorRegistrationNumber,
          name: requestorName,
        },
      });
      
      try {
        const response = await this.outputAssetService.saveOutputAsset(this.asset.id, outputAsset);

        this.utilityService.showNotification('Retirada de Insumo cadastrada com sucesso');

        setTimeout(() => {
          this.utilityService.closeNotification();

          if (this.asset?.currentQuantity)
            this.asset.currentQuantity -= outputAsset.amount;

          this.router.navigate(['assets/details'], {
            state: { asset: this.asset },
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

  async undoAssetInput(assetInputId: number): Promise<void> {
    if (assetInputId != undefined && this.asset?.id) {
      try {
        const response = await this.inputAssetService.deleteInputAsset(this.asset.id, assetInputId);
  
        this.utilityService.showNotification('Entrada de Insumo desfeita com sucesso');
  
        setTimeout(() => {
          this.utilityService.closeNotification();
  
          let inputAsset = this.assetInputs.find((inputAsset: InputAsset) => inputAsset.id === assetInputId);

          if (this.asset && inputAsset?.amount) {
            this.asset.currentQuantity -= inputAsset.amount;
          }

          this.router.navigate(['assets/details'], {
            state: { asset: this.asset },
          });
        }, 1000);
        
      } catch (error) {
        this.utilityService.showNotification('Ocorreu um erro ao desfazer essa Entrada de Insumo');
  
        setTimeout(() => {
          this.utilityService.closeNotification();
        }, 4000);
      }

    }
  }

  showUndoAssetInputModal(inputAssetId: number) {
    if (inputAssetId) {
      this.selectedInputAsset = <InputAsset>(
        this.assetInputs.find((inputAsset: InputAsset) => inputAsset.id === inputAssetId)
      );

      this.utilityService.showConfirmationModalByName("#deleteInputAssetModal");
    }
  }

  async undoAssetOutput(assetOutputId: number): Promise<void> {
    if (assetOutputId != undefined && this.asset?.id) {
      try {
        const response = await this.outputAssetService.deleteOutputAsset(this.asset.id, assetOutputId);
  
        this.utilityService.showNotification('Retirada de Insumo desfeita com sucesso');
  
        setTimeout(() => {
          this.utilityService.closeNotification();
  
          let outputAsset = this.assetOutputs.find((outputAsset: OutputAsset) => outputAsset.id === assetOutputId);

          if (this.asset && outputAsset?.amount) {
            this.asset.currentQuantity += outputAsset.amount;
          }

          this.router.navigate(['assets/details'], {
            state: { asset: this.asset },
          });
        }, 1000);
        
      } catch (error) {
        this.utilityService.showNotification('Ocorreu um erro ao desfazer essa Retirada de Insumo');
  
        setTimeout(() => {
          this.utilityService.closeNotification();
        }, 4000);
      }

    }
  }

  showUndoAssetOutputModal(outputAssetId: number) {
    if (outputAssetId) {
      this.selectedOutputAsset = <OutputAsset>(
        this.assetOutputs.find((outputAsset: OutputAsset) => outputAsset.id === outputAssetId)
      );

      this.utilityService.showConfirmationModalByName("#deleteOutputAssetModal");
    }
  }

  navigateToAssets(): void {
    this.router.navigate(['/assets']);
  }

  showModal(modalSelector: string) {
    const modal: HTMLDivElement = <HTMLDivElement>(
      document.querySelector(modalSelector)
    );
    const overlay: HTMLDivElement = <HTMLDivElement>(
      document.querySelector('.overlay')
    );

    modal.classList.remove('hidden');
    overlay.classList.remove('hidden');
  }

  hideModal(modalSelector: string) {
    const modal: HTMLDivElement = <HTMLDivElement>(
      document.querySelector(modalSelector)
    );
    const overlay: HTMLDivElement = <HTMLDivElement>(
      document.querySelector('.overlay')
    );

    modal.classList.add('hidden');
    overlay.classList.add('hidden');
  }

  openInputListTab() {
    this.inputActive = true;
    this.outputActive = false;

    const inputList: HTMLLIElement = <HTMLLIElement>(
      document.querySelector("#inputList")
    );

    const outputList: HTMLLIElement = <HTMLLIElement>(
      document.querySelector("#outputList")
    );

    inputList.classList.add("is-active");
    outputList.classList.remove("is-active");
  }

  openOutputListTab() {
    this.outputActive = true;
    this.inputActive = false;

    const outputList: HTMLLIElement = <HTMLLIElement>(
      document.querySelector("#outputList")
    );

    const inputList: HTMLLIElement = <HTMLLIElement>(
      document.querySelector("#inputList")
    );

    inputList.classList.remove("is-active");
    outputList.classList.add("is-active");
  }

}
