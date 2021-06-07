import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CategoryService } from 'src/app/category/services/category.service';
import { Asset } from 'src/app/shared/models/asset.model';
import { Category } from 'src/app/shared/models/category.model';
import { AssetService } from '../services/asset.service';

@Component({
  selector: 'app-asset-list',
  templateUrl: './asset-list.component.html',
  styleUrls: ['./asset-list.component.css'],
})
export class AssetListComponent implements OnInit {
  public assets: Asset[] = [];
  public selectedAsset!: Asset;
  public categoryName?: string;

  constructor(
    private router: Router,
    private assetService: AssetService,
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
    this.assets = await this.assetService.getAllAssets();
    let categories = await this.categoryService.getAllCategories();
    this.assets = this.assets.map((asset: Asset) => {
      asset.categoryName = categories.find(
        (category: Category) => category.id === asset.categoryId
      )?.name;
      return asset;
    });

    if (!this.assets) {
      alert('Nenhum insumo encontrado');
    }
  }

  detailAsset(assetId: number) {
    this.selectedAsset = <Asset>(
      this.assets.find((asset: Asset) => asset.id === assetId)
    );

    this.router.navigate(['assets/form'], {
      state: { asset: this.selectedAsset },
    });
  }

  navigateToAssetCreate(): void {
    this.router.navigate(['/assets/form']);
  }
}
