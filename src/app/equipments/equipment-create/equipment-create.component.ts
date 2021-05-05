import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { CategoryService } from 'src/app/category/services/category.service';
import { Asset } from 'src/app/shared/models/asset.model';
import { AssetApiCampus } from 'src/app/shared/models/assetApiCampus.model';
import { Category } from 'src/app/shared/models/category.model';
import { ConservationState } from 'src/app/shared/models/conservationState.enum';
import { Network } from 'src/app/shared/models/network.model';
import apiCampus from 'src/app/shared/services/apiCampus';
import { EquipmentService } from '../services/equipment.service';

@Component({
  selector: 'app-equipment-create',
  templateUrl: './equipment-create.component.html',
  styleUrls: ['./equipment-create.component.css'],
})
export class EquipmentCreateComponent implements OnInit {
  public asset?: Asset = <Asset>{};
  public categories: Category[] = [];
  public selectedCategoryId: number = 0;
  public selectedConservationState: string = '';
  public conservationStates: string[] = [];

  public myControl = new FormControl();
  public options: AssetApiCampus[] = [];
  public filteredOptions?: Observable<AssetApiCampus[]>;

  public file: File = new File(["empty"], "empty.txt", 
    {type: "text/plain",});

  constructor(
    private router: Router,
    public equipmentService: EquipmentService,
    public categoryService: CategoryService
  ) {}

  inputFileChange(event: Event) {
    const target = event.target as HTMLInputElement;
    const files = target.files as FileList;
    if (files != null && files[0] != null) {
      const userfile = files[0];
      this.file = userfile;
    }
  }

  async ngOnInit(): Promise<void> {
    //this.options = await this.equipmentService.getAllAssetsSuggestions();
    let option1: AssetApiCampus = new AssetApiCampus('212121', 'mesa', 'ativo');
    let option2: AssetApiCampus = new AssetApiCampus(
      '333333',
      'cadeira',
      'ativo'
    );
    let optionsArray: AssetApiCampus[] = [option1, option2];

    this.options = optionsArray;

    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map((value) => this._filter(value))
    );

    console.log(this.options);

    this.asset = window.history.state.asset;
    this.conservationStates = Object.values(ConservationState);
    this.categories = await this.categoryService.getAllCategories();
    if (this.asset) {
      let selectedConservationState = this.conservationStates.find(
        (conservationState: any) =>
          conservationState === this.asset?.conservationState
      );
      this.selectedConservationState = selectedConservationState
        ? selectedConservationState
        : '';
      let selectedCategoryId = this.categories.find(
        (category: Category) => category.id === this.asset?.categoryId
      )?.id;
      this.selectedCategoryId = selectedCategoryId ? selectedCategoryId : 0;
      console.log(this.selectedCategoryId);
    }
  }

  private _filter(value: string): AssetApiCampus[] {
    const filterValue = value.toLowerCase();

    return this.options.filter(
      (option) =>
        option.numero.toLowerCase().includes(filterValue) ||
        option.descricao.toLowerCase().includes(filterValue)
    );
  }

  autocompleteInputFields(assetApiCampusNumber: string) {
    const selectedAsset: AssetApiCampus | undefined = this.options.find(
      (asset) => {
        if (asset.numero.localeCompare(assetApiCampusNumber) === 0) {
          return asset;
        } else return;
      }
    );

    const descriptionInput: HTMLTextAreaElement = <HTMLTextAreaElement>(
      document.querySelector('#descriptionInput')
    );

    const numberInput: HTMLInputElement = <HTMLInputElement>(
      document.querySelector('#numberInput')
    );

    if (selectedAsset != undefined) {
      numberInput.value = selectedAsset.numero;
      descriptionInput.value = selectedAsset.descricao;
    }
  }

  async createAsset(
    selectedCategoryId: number,
    number: string,
    serialNumber: string,
    description: string,
    block: string,
    room: string,
    selectedConservationState: string,
    hostname: string,
    addressIP: string,
    addressMAC: string,
    filename: string
  ): Promise<void> {
    if (this.asset) {
      this.editAsset(
        this.asset.id,
        selectedCategoryId,
        number,
        serialNumber,
        description,
        block,
        room,
        selectedConservationState,
        hostname,
        addressIP,
        addressMAC,
        filename
      );
    } else {
      if (number && selectedConservationState) {
        const conservationState: ConservationState = <ConservationState>(
          selectedConservationState
        );

        let network = new Network(hostname, addressIP, addressMAC);

        let asset = new Asset({
          categoryId: selectedCategoryId,
          number: Number.parseInt(number),
          serialNumber,
          description,
          block,
          room,
          conservationState,
          network,
          filename,
        });

        const response = await this.equipmentService.createAsset(asset);
        if (response.status == 201) {
          const equipamamentoId = response.data['id'];
          if (this.file.name != 'empty.txt') {
            const fileResponse = await this.equipmentService.sendFile(this.file, equipamamentoId);
            if (fileResponse.status == 201) {
              this.router.navigate(['equipments'], { state: { needReload: true } });
            }
          } else {
            this.router.navigate(['equipments'], { state: { needReload: true } });
          }
        } else {
          alert('Oops, ocorreu um erro ao tentar cadastrar esse Equipamento');
        }
      } else {
        alert('Dados Inválidos');
      }
    }
  }

  async editAsset(
    id: number,
    selectedCategoryId: number,
    number: string,
    serialNumber: string,
    description: string,
    block: string,
    room: string,
    selectedConservationState: string,
    hostname: string,
    addressIP: string,
    addressMAC: string,
    filename: string
  ): Promise<void> {
    if (id && number && selectedConservationState) {
      const conservationState: ConservationState = <ConservationState>(
        selectedConservationState
      );

      let network = new Network(hostname, addressIP, addressMAC);

      let asset = new Asset(
        {
          categoryId: selectedCategoryId,
          number: Number.parseInt(number),
          serialNumber,
          description,
          block,
          room,
          conservationState,
          network,
          filename,
        },
        id
      );

      let assetWasEdited = await this.equipmentService.editAsset(asset);
      if (assetWasEdited === true) {
        this.asset = undefined;
        this.router.navigate(['equipments'], { state: { needReload: true } });
      } else {
        alert('Oops, ocorreu um erro ao tentar editar esse Equipamento');
      }
    } else {
      alert('Dados Inválidos');
    }
  }

  async deleteAsset(id: number): Promise<void> {
    if (id) {
      let assetWasDeleted = await this.equipmentService.deleteAsset(id);
      if (assetWasDeleted === true) {
        this.router.navigate(['equipments'], { state: { needReload: true } });
      } else {
        alert('Oops, ocorreu um erro ao tentar remover esse Equipamento');
      }
    } else {
      alert('Equipamento Não Encontrado');
    }
  }
}