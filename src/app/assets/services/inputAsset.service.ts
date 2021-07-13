import { Injectable } from '@angular/core';
import { Asset } from 'src/app/shared/models/asset.model';
import { AuthenticationService } from 'src/app/shared/services/authentication.service';
import api from 'src/app/shared/services/api';
import { InputAsset } from 'src/app/shared/models/inputAsset.model';

@Injectable({
  providedIn: 'root',
})
export class InputAssetService {
  constructor(private authenticationService: AuthenticationService) {}

  async saveInputAsset(assetId: number, inputAsset: InputAsset): Promise<boolean> {
    let inputAssetWasAdded = false;
    try {
      let headers = {
        Authorization: `Bearer ${this.authenticationService.token}`,
      };

      let inputAssetServer = {
        data: inputAsset.inputDate,
        dataValidade: inputAsset.expirationDate,
        quantidade: inputAsset.amount,
      };
      await api.post(`/insumos/${assetId}/entradas`, inputAssetServer, { headers });
      inputAssetWasAdded = true;
      return inputAssetWasAdded;
    } catch (error) {
      console.error(error);
      return (inputAssetWasAdded = false);
    }
  }

  async deleteInputAsset(assetId: number, inputAssetId: number): Promise<boolean> {
    let inputAssetWasDeleted = false;
    try {
      let headers = {
        Authorization: `Bearer ${this.authenticationService.token}`,
      };

      await api.delete(`/insumos/${assetId}/entradas/${inputAssetId}`, { headers });
      inputAssetWasDeleted = true;

      return inputAssetWasDeleted;
    } catch (error) {
      console.error(error);
      return (inputAssetWasDeleted = false);
    }
  }

  async getAllInputs(assetId: number): Promise<InputAsset[]> {
    try {
      let inputs!: InputAsset[];

      let headers = {
        Authorization: `Bearer ${this.authenticationService.token}`,
      };

      const response = await api.get(`/insumos/${assetId}/entradas`, { headers });
      inputs = response.data.map((inputAssetServer: any) => {
        return new InputAsset(
          {
            inputDate: inputAssetServer.data,
            expirationDate: inputAssetServer.dataValidade,
            amount: inputAssetServer.quantidade,
            assetId: inputAssetServer.insumo.id,
            assetName: inputAssetServer.insumo.nome,
          },
          inputAssetServer.id
        );
      });

      return inputs;
    } catch (error) {
      console.error(error);
      return [];
    }
  }
}
