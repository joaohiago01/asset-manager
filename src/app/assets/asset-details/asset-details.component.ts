import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Asset } from 'src/app/shared/models/asset.model';
import { InputAsset } from 'src/app/shared/models/inputAsset.model';
import { AssetService } from '../services/asset.service';
import { InputAssetService } from '../services/inputAsset.service';

@Component({
  selector: 'app-asset-details',
  templateUrl: './asset-details.component.html',
  styleUrls: ['./asset-details.component.css']
})
export class AssetDetailsComponent implements OnInit {

  public asset?: Asset = <Asset>{};
  public assetInputs: InputAsset[] = [];
  public myControl = new FormControl();
  public inputActive: boolean = true;
  public outputActive:boolean = false;

  constructor(
    private router: Router,
    public assetService: AssetService,
    public inputAssetService: InputAssetService,
  ) {
    const asset: Asset = <Asset>(
      this.router.getCurrentNavigation()?.extras.state
    );

    if (asset) {
      const map = new Map(Object.entries(Object.values(asset)));
      const assetNumber: string = map.get('0')['number'];
    }

  }

  async ngOnInit(): Promise<void> {
    this.asset = window.history.state.asset;

    if (window.history.state.needReload) {
      window.location.reload();
    } else {
      if (this.asset?.id) {
        await this.getAllAssetInputs(this.asset?.id);
      }
    }
  }

  async getAllAssetInputs(assetId: number): Promise<void> {
    this.assetInputs = await this.inputAssetService.getAllInputs(assetId);
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

  async undoAssetInput(assetInputId: number): Promise<void> {
    if (assetInputId != undefined && this.asset?.id) {
      let assetInputWasDeleted = await this.inputAssetService.deleteInputAsset(this.asset.id, assetInputId);

      if (assetInputWasDeleted) {
        alert("A Entrada de Insumo foi desfeita!")

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

  async addAssetOutput(): Promise<void> {
    
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
