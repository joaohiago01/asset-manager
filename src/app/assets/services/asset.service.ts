import { Injectable } from '@angular/core';
import { Asset } from 'src/app/shared/models/asset.model';
import { AuthenticationService } from 'src/app/shared/services/authentication.service';
import api from 'src/app/shared/services/api';
import { AxiosResponse } from 'axios';

@Injectable({
  providedIn: 'root',
})
export class AssetService {
  constructor(private authenticationService: AuthenticationService) {}

  async createAsset(asset: Asset): Promise<AxiosResponse> {
    try {
      let headers = {
        Authorization: `Bearer ${this.authenticationService.token}`,
      };

      let assetServer = {
        categoriaId: asset.categoryId,
        nome: asset.name,
        estante: asset.bookcase[0],
        prateleira: asset.shelf[0],
        quantidadeMinima: asset.minQuantity,
        quantidadeAtual: asset.currentQuantity,
        unidadeDeMedida: asset.unitOfMeasurement,
      };
      let response = await api.post('/insumos', assetServer, { headers });
      let assetId = response.data.id;

      let expirationDate = new Date();
      expirationDate.setFullYear(expirationDate.getFullYear() + 1);
      let inputAssetServer = {
        data: new Date(),
        dataValidade: expirationDate,
        quantidade: asset.currentQuantity
      };
      await api.post(`/insumos/${assetId}/entradas`, inputAssetServer, { headers });

      assetServer.quantidadeAtual = asset.currentQuantity;
      return await api.put(`/insumos/${assetId}`, assetServer, { headers });
    } catch (error) {
      console.error(error);
      throw new Error(error);
    }
  }

  async editAsset(asset: Asset): Promise<AxiosResponse> {
    try {
      let headers = {
        Authorization: `Bearer ${this.authenticationService.token}`,
      };

      let assetServer = {
        categoriaId: asset.categoryId,
        nome: asset.name,
        estante: asset.bookcase[0],
        prateleira: asset.shelf[0],
        quantidadeMinima: asset.minQuantity,
        quantidadeAtual: asset.currentQuantity,
        unidadeDeMedida: asset.unitOfMeasurement,
      };

      return await api.put(`/insumos/${asset.id}`, assetServer, { headers });
    } catch (error) {
      console.error(error);
      throw new Error(error);
    }
  }

  async deleteAsset(id: Number): Promise<AxiosResponse> {
    try {
      let headers = {
        Authorization: `Bearer ${this.authenticationService.token}`,
      };

      return await api.delete(`/insumos/${id}`, { headers });
    } catch (error) {
      console.error(error);
      throw new Error(error);
    }
  }

  async getAllAssets(): Promise<Asset[]> {
    try {
      let assets!: Asset[];

      let headers = {
        Authorization: `Bearer ${this.authenticationService.token}`,
      };

      const response = await api.get('/insumos', { headers });
      assets = response.data.map((assetServer: any) => {
        return new Asset(
          {
            name: assetServer.nome,
            bookcase: assetServer.estante,
            shelf: assetServer.prateleira,
            minQuantity: assetServer.quantidadeMinima,
            currentQuantity: assetServer.quantidadeAtual,
            unitOfMeasurement: assetServer.unidadeDeMedida,
            categoryId: assetServer.categoria.id,
            categoryName: assetServer.categoria.nome,
          },
          assetServer.id
        );
      });

      return assets;
    } catch (error) {
      console.error(error);
      return [];
    }
  }
}
