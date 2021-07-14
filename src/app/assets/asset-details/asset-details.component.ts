import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { DepartmentService } from 'src/app/departments/services/department.service';
import { Asset } from 'src/app/shared/models/asset.model';
import { Department } from 'src/app/shared/models/department.model';
import { InputAsset } from 'src/app/shared/models/inputAsset.model';
import { OutputAsset } from 'src/app/shared/models/outputAsset.model';
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

  public selectedOutputAsset?: OutputAsset = <OutputAsset>{};

  public departments: Department[] = [];
  public selectedDepartmentId: number = 0;

  constructor(
    private router: Router,
    public assetService: AssetService,
    public inputAssetService: InputAssetService,
    public outputAssetService: OutputAssetService,
    public departmentService: DepartmentService
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
      let assetInputWasAdded = await this.inputAssetService.saveInputAsset(this.asset.id, inputAsset);

      if (assetInputWasAdded) {
        alert('Entrada de Insumo cadastrada!')

        this.asset.currentQuantity += inputAsset.amount;

        this.router.navigate(['assets/details'], {
          state: { asset: this.asset },
        });
      } else {
        alert('Não foi possível cadastrar a Entrada de Insumo!'); 
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
    if (this.asset?.id && selectedDepartmentId) {
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
      
      let assetOutputWasAdded = await this.outputAssetService.saveOutputAsset(this.asset.id, outputAsset);

      if (assetOutputWasAdded) {
        alert('Retirada de Insumo cadastrada!')

        this.asset.currentQuantity -= outputAsset.amount;

        this.router.navigate(['assets/details'], {
          state: { asset: this.asset },
        });
      } else {
        alert('Não foi possível cadastrar a Retirada de Insumo!'); 
      }

    }
  }

  async undoAssetInput(assetInputId: number): Promise<void> {
    if (assetInputId != undefined && this.asset?.id) {
      let assetInputWasDeleted = await this.inputAssetService.deleteInputAsset(this.asset.id, assetInputId);

      if (assetInputWasDeleted) {
        alert("A Retirada de Insumo foi desfeita!")

        let inputAsset = this.assetInputs.find((inputAsset: InputAsset) => inputAsset.id === assetInputId);

        if (inputAsset?.amount) {
          this.asset.currentQuantity -= inputAsset.amount;
        }

        this.router.navigate(['assets/details'], {
          state: { asset: this.asset },
        });
      }
    }
  }

  async undoAssetOutput(assetOutputId: number): Promise<void> {
    if (assetOutputId != undefined && this.asset?.id) {
      let assetOutputWasDeleted = await this.outputAssetService.deleteOutputAsset(this.asset.id, assetOutputId);

      if (assetOutputWasDeleted) {
        alert("A Retirada de Insumo foi desfeita!")

        let outputAsset = this.assetOutputs.find((outputAsset: OutputAsset) => outputAsset.id === assetOutputId);

        if (outputAsset?.amount) {
          this.asset.currentQuantity += outputAsset.amount;
        }

        this.router.navigate(['assets/details'], {
          state: { asset: this.asset },
        });
      }
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
