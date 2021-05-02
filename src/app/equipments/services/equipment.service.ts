import { Injectable } from '@angular/core';
import { Asset } from 'src/app/shared/models/asset.model';
import api from 'src/app/shared/services/api';
import { AuthenticationService } from 'src/app/shared/services/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class EquipmentService {

  constructor(
    private authenticationService: AuthenticationService
  ) { }

  async getAllAssets(): Promise<Asset[]> {
    try {
      let assets !: Asset[];

      let headers = {
        Authorization: `Bearer ${this.authenticationService.token}`
      };

      const response = await api.get('/equipamentos', { headers });
      assets = response.data.map((assetServer: any) => {
        return new Asset({
          categoryId: assetServer.categoriaId,
          number: assetServer.numero,
          serialNumber: assetServer.numeroSerie,
          description: assetServer.descricao,
          block: assetServer.bloco,
          room: assetServer.sala,
          conservationState: assetServer.estadoConservacao,
          network: assetServer.rede,
          filename: assetServer.nomeArquivo
        },
          assetServer.id);
      });

      return assets;
    } catch (error) {
      console.error(error);
      return [];
    }
  }

  async createAsset(asset: Asset): Promise<boolean> {
    let assetWasCreated = false;
    try {
      let headers = {
        Authorization: `Bearer ${this.authenticationService.token}`
      };

      let assetServer = {
        categoriaId: asset.categoryId,
        numero: asset.number,
        numeroSerie: asset.serialNumber,
        descricao: asset.description,
        bloco: asset.block,
        sala: asset.room,
        estadoConservacao: asset.conservationState,
        rede: {
          hostname: asset.network.hostname,
          enderecoIP: asset.network.addressIP,
          enderecoMAC: asset.network.addressMAC
        },
        nomeArquivo: asset.filename
      };
      await api.post('/equipamentos', assetServer, { headers });
      assetWasCreated = true;

      return assetWasCreated;
    } catch (error) {
      console.error(error);
      return assetWasCreated = false;
    }
  }

  async editAsset(asset: Asset): Promise<boolean> {
    let assetWasEdited = false;
    try {
      let headers = {
        Authorization: `Bearer ${this.authenticationService.token}`
      };

      let assetServer = {
        categoriaId: asset.categoryId,
        numero: asset.number,
        numeroSerie: asset.serialNumber,
        descricao: asset.description,
        bloco: asset.block,
        sala: asset.room,
        estadoConservacao: asset.conservationState,
        rede: {
          hostname: asset.network.hostname,
          enderecoIP: asset.network.addressIP,
          enderecoMAC: asset.network.addressMAC
        },
        nomeArquivo: asset.filename
      };
      debugger
      api.put(`/equipamentos/${asset.id}`, assetServer, { headers });
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
        Authorization: `Bearer ${this.authenticationService.token}`
      };

      api.delete(`/equipamentos/${id}`, { headers });
      assetWasDeleted = true;

      return assetWasDeleted;
    } catch (error) {
      console.error(error);
      return assetWasDeleted = false;
    }
  }
}
