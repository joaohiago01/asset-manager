import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CategoryService } from 'src/app/category/services/category.service';
import { Asset } from 'src/app/shared/models/asset.model';
import { Category } from 'src/app/shared/models/category.model';
import { EquipmentService } from '../services/equipment.service';

@Component({
  selector: 'app-equipments-list',
  templateUrl: './equipments-list.component.html',
  styleUrls: ['./equipments-list.component.css'],
})
export class EquipmentsListComponent implements OnInit {
  public assets: Asset[] = [];
  public selectedAsset!: Asset;
  public categoryName?: string;

  constructor(
    private router: Router,
    public equipmentService: EquipmentService,
    public categoryService: CategoryService
  ) {}

  async ngOnInit(): Promise<void> {
    if (window.history.state.needReload) {
      window.location.reload();
    } else {
      await this.getAllAssets();
    }
  }

  async getAllAssets(): Promise<void> {
    this.assets = await this.equipmentService.getAllAssets();
    let categories = await this.categoryService.getAllCategories();
    this.assets = this.assets.map((asset: Asset) => {
      asset.categoryName = categories.find(
        (category: Category) => category.id === asset.categoryId
      )?.name;
      return asset;
    });

    if (!this.assets) {
      alert('Nenhum Equipamento Encontrado');
    }
  }

  detailAsset(assetId: number) {
    this.selectedAsset = <Asset>(
      this.assets.find((asset: Asset) => asset.id === assetId)
    );

    this.router.navigate(['equipments/create'], {
      state: { asset: this.selectedAsset },
    });
  }

  navigateToEquipmentCreate(): void {
    this.router.navigate(['/equipments/create']);
  }
}
