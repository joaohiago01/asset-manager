import { NgModule } from '@angular/core';

import { AssetCardComponent } from './asset-card/asset-card.component';
import { AssetFormComponent } from './asset-form/asset-form.component';
import { AssetListComponent } from './asset-list/asset-list.component';

@NgModule({
  declarations: [AssetListComponent, AssetCardComponent, AssetFormComponent],
  exports: [AssetListComponent, AssetFormComponent],
})
export class AssetModule {}
