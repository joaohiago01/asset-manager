import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Asset } from 'src/app/shared/models/asset.model';
import { Category } from 'src/app/shared/models/category.model';
import { AssetService } from 'src/app/assets/services/asset.service';
import { CategoryService } from 'src/app/category/services/category.service';
import { CategoryType } from 'src/app/shared/models/categoryType.enum';
import { UtilityService } from 'src/app/shared/services/utility.service';

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

  async ngOnInit() {
    this.asset = window.history.state.asset;

    let allCategories = await this.categoryService.getAllCategories();
    allCategories.forEach((category) => {
      if (category.categoryType !== CategoryType.SOFTWARE) {
        this.categories.push(category);
      }
    });

    if (this.asset) {
      let selectedCategoryId = this.categories.find(
        (category: Category) => category.id === this.asset?.categoryId
      )?.id;
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
          unitOfMeasurement: unitOfMeasurement,
        });

        try {
          const response = await this.assetService.createAsset(asset);

          this.utilityService.showNotification('Equipamento cadastrado com sucesso!');

          setTimeout(() => {
            this.utilityService.closeNotification();

            this.router.navigate(['assets'], {
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
          unitOfMeasurement: unitOfMeasurement,
        },
        id
      );

      try {
        const response = await this.assetService.editAsset(asset);

        this.utilityService.showNotification('Equipamento atualizado com sucesso!');

        setTimeout(() => {
          this.utilityService.closeNotification();

          this.router.navigate(['assets'], {
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

  async deleteAsset(id: number): Promise<void> {
    if (id) {
      try {
        const response = await this.assetService.deleteAsset(id);

        this.utilityService.showNotification("O Insumo foi excluído com sucesso!");

        setTimeout(() => {
          this.utilityService.closeNotification();

          this.router.navigate(['assets'], {
            state: { needReload: true },
          });
        }, 3000);
      } catch (error) {
        this.utilityService.showNotification("O Insumo está em uso e não pode ser excluído");

        setTimeout(() => {
          this.utilityService.closeNotification();
        }, 5000);
      }

    } else {
      this.utilityService.showNotification("Insumo não encontrado");

      setTimeout(() => {
        this.utilityService.closeNotification();
      }, 5000);
    }
  }
}
