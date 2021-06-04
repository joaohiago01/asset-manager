import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Asset } from 'src/app/shared/models/asset.model';
import { Category } from 'src/app/shared/models/category.model';
import { AssetService } from 'src/app/assets/services/asset.service';
import { CategoryService } from 'src/app/category/services/category.service';

@Component({
  selector: 'app-asset-form',
  templateUrl: './asset-form.component.html',
  styleUrls: ['./asset-form.component.css'],
})
export class AssetFormComponent implements OnInit {
  public asset?: Asset = <Asset>{};
  public categories: Category[] = [];
  public selectedCategoryId: number = 0;

  public myControl = new FormControl();

  constructor(
    private router: Router,
    public assetService: AssetService,
    public categoryService: CategoryService,
  ) {
    const asset: Asset = <Asset>(this.router.getCurrentNavigation()?.extras.state);

    if (asset) {
      const map = new Map(Object.entries(Object.values(asset)));
      const assetNumber: string = map.get('0')['number'];

      this.myControl.setValue(assetNumber);
    }
  }

  async ngOnInit() {
    this.asset = window.history.state.asset;
    this.categories = await this.categoryService.getAllCategories();
    if (this.asset) {
      let selectedCategoryId = this.categories.find((category: Category) => category.id === this.asset?.categoryId)?.id;
      this.selectedCategoryId = selectedCategoryId ? selectedCategoryId : 0;
    }
  }

  async createAsset(
    selectedCategoryId: number,
    name: string,
    bookcase: string,
    shelf: string,
    minQuantity: string,
    currentQuantity: string,
    unitOfMeasurement: string
  ): Promise<void> {
    if (this.asset) {
      this.editAsset(
        this.asset.id,
        selectedCategoryId,
        name,
        bookcase,
        shelf,
        minQuantity,
        currentQuantity,
        unitOfMeasurement
      );
    } else {
      if (minQuantity && currentQuantity) {
        let asset = new Asset({
          categoryId: selectedCategoryId,
          name: name,
          bookcase: bookcase,
          shelf: shelf,
          minQuantity: Number.parseFloat(minQuantity),
          currentQuantity: Number.parseFloat(currentQuantity),
          unitOfMeasurement: unitOfMeasurement
        });

        let assetWasCreated = await this.assetService.createAsset(asset);
        if (assetWasCreated) {
          this.router.navigate(['assets'], { state: { needReload: true } });
        } else {
          alert('Oops, ocorreu um erro ao tentar cadastrar esse Insumo');
        }
      } else {
        alert('Dados Inválidos');
      }
    }
  }

  async editAsset(
    id: number,
    selectedCategoryId: number,
    name: string,
    bookcase: string,
    shelf: string,
    minQuantity: string,
    currentQuantity: string,
    unitOfMeasurement: string
  ): Promise<void> {
    if (id && minQuantity && currentQuantity) {
      let asset = new Asset(
        {
          categoryId: selectedCategoryId,
          name: name,
          bookcase: bookcase,
          shelf: shelf,
          minQuantity: Number.parseFloat(minQuantity),
          currentQuantity: Number.parseFloat(currentQuantity),
          unitOfMeasurement: unitOfMeasurement
        },
        id
      );

      let assetWasEdited = await this.assetService.editAsset(asset);
      if (assetWasEdited === true) {
        this.asset = undefined;
        this.router.navigate(['assets'], { state: { needReload: true } });
      } else {
        alert('Oops, ocorreu um erro ao tentar editar esse Insumo');
      }
    } else {
      alert('Dados Inválidos');
    }
  }

  async deleteAsset(id: number) {
    if (id) {
      let assetWasDeleted = await this.assetService.deleteAsset(id);
      if (assetWasDeleted === true) {
        this.router.navigate(['assets'], { state: { needReload: true } });
      } else {
        alert('Oops, ocorreu um erro ao tentar remover esse Insumo');
      }
    } else {
      alert('Insumo Não Encontrado');
    }
  }
}
