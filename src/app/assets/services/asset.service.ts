import { Injectable } from '@angular/core';
import { Asset } from 'src/app/shared/models/asset.model';
import { AuthenticationService } from 'src/app/shared/services/authentication.service';
import api from 'src/app/shared/services/api';

@Injectable({
  providedIn: 'root'
})
export class AssetService {

  constructor(private authenticationService: AuthenticationService) { }

  async createAsset(asset: Asset): Promise<boolean> {
    let equipmentWasCreated = false;
    try {
      let headers = {
        Authorization: `Bearer ${this.authenticationService.token}`,
      };

      let assetServer = {
        categoriaId: asset.categoryId,
        nome: asset.name,
        estante: asset.bookcase,
        prateleira: asset.shelf,
        quantidadeMinima: asset.minQuantity,
        quantidadeAtual: asset.currentQuantity,
        unidadeDeMedida: asset.unitOfMeasurement
      };
      await api.post('/insumos', assetServer, { headers });
      equipmentWasCreated = true;
      return equipmentWasCreated;
    } catch (error) {
      console.error(error);
      return equipmentWasCreated = false;
    }
  }

  async editAsset(asset: Asset): Promise<boolean> {
    let assetWasEdited = false;
    try {
      let headers = {
        Authorization: `Bearer ${this.authenticationService.token}`,
      };

      let assetServer = {
        categoriaId: asset.categoryId,
        nome: asset.name,
        estante: asset.bookcase,
        prateleira: asset.shelf,
        quantidadeMinima: asset.minQuantity,
        quantidadeAtual: asset.currentQuantity,
        unidadeDeMedida: asset.unitOfMeasurement
      };

      await api.put(`/insumos/${asset.id}`, assetServer, { headers });
      assetWasEdited = true;
      return assetWasEdited;
    } catch (error) {
      console.error(error);
      return assetWasEdited = false;
    }
  }

  async deleteAsset(id: Number): Promise<boolean> {
    let assetWasDeleted = false;
    try {
      let headers = {
        Authorization: `Bearer ${this.authenticationService.token}`,
      };

      await api.delete(`/insumos/${id}`, { headers });
      assetWasDeleted = true;

      return assetWasDeleted;
    } catch (error) {
      console.error(error);
      return (assetWasDeleted = false);
    }
  }
}
