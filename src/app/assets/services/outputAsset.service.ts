import { Injectable, Output } from '@angular/core';
import { AuthenticationService } from 'src/app/shared/services/authentication.service';
import api from 'src/app/shared/services/api';
import { OutputAsset } from 'src/app/shared/models/outputAsset.model';

@Injectable({
  providedIn: 'root',
})
export class OutputAssetService {
  constructor(private authenticationService: AuthenticationService) {}

  async saveOutputAsset(assetId: number, outputAsset: OutputAsset): Promise<boolean> {
    let outputAssetWasSaved = false;
    try {
      let headers = {
        Authorization: `Bearer ${this.authenticationService.token}`,
      };

      let outputAssetServer = {
        numeroChamadoSuap: outputAsset.callNumberSuap,
        linkChamadoSuap: outputAsset.callLinkSuap,
        observacoes: outputAsset.observations,
        expedidor: {
            matricula: outputAsset.consignor.registrationNumber,
            nome: outputAsset.consignor.name,
        },
        solicitante: {
            matricula: outputAsset.requestor.registrationNumber,
            nome: outputAsset.requestor.name,
        },
        setor: {
            id: outputAsset.department?.id,
        },
        quantidade: outputAsset.amount,
      };
      await api.post(`/insumos/${assetId}/retiradas`, outputAssetServer, { headers });
      outputAssetWasSaved = true;
      return outputAssetWasSaved;
    } catch (error) {
      console.error(error);
      return (outputAssetWasSaved = false);
    }
  }

  async deleteOutputAsset(assetId: number, outputAssetId: number): Promise<boolean> {
    let outputAssetWasDeleted = false;
    try {
      let headers = {
        Authorization: `Bearer ${this.authenticationService.token}`,
      };

      await api.delete(`/insumos/${assetId}/retiradas/${outputAssetId}`, { headers });
      outputAssetWasDeleted = true;

      return outputAssetWasDeleted;
    } catch (error) {
      console.error(error);
      return (outputAssetWasDeleted = false);
    }
  }

  async getAllOutputs(assetId: number): Promise<OutputAsset[]> {
    try {
      let outputs!: OutputAsset[];

      let headers = {
        Authorization: `Bearer ${this.authenticationService.token}`,
      };

      const response = await api.get(`/insumos/${assetId}/retiradas`, { headers });
      outputs = response.data.map((outputAssetServer: any) => {
        return new OutputAsset(
          {
            amount: outputAssetServer.quantidade,
            outputDate: outputAssetServer.dataSaida,
            callNumberSuap: outputAssetServer.numeroChamadoSuap,
            callLinkSuap: outputAssetServer.linkChamadoSuap,
            observations: outputAssetServer.observacoes,
            consignor: {
                registrationNumber: outputAssetServer.expedidor.matricula,
                name: outputAssetServer.expedidor.name,
            },
            requestor: {
                registrationNumber: outputAssetServer.solicitante.matricula,
                name: outputAssetServer.solicitante.nome,
            },
            department: {
                id: outputAssetServer.setor.id,
                name: outputAssetServer.setor.nome,
                acronym: outputAssetServer.setor.sigla,
            },
            assetId: outputAssetServer.insumo.id,
            assetName: outputAssetServer.insumo.nome,
          },
          outputAssetServer.id
        );
      });

      return outputs;
    } catch (error) {
      console.error(error);
      return [];
    }
  }
}
