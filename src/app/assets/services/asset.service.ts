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
    
    return await api.post('/insumos', assetServer, { headers });
  }

  async editAsset(asset: Asset): Promise<AxiosResponse> {
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
  }

  async deleteAsset(id: Number): Promise<AxiosResponse> {
    let headers = {
      Authorization: `Bearer ${this.authenticationService.token}`,
    };

    return await api.delete(`/insumos/${id}`, { headers });
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
