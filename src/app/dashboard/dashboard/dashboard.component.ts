import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AssetService } from 'src/app/assets/services/asset.service';
import { Asset } from 'src/app/shared/models/asset.model';
import { InputAsset } from 'src/app/shared/models/inputAsset.model';
import { Loan } from 'src/app/shared/models/loan.model';
import { OutputAsset } from 'src/app/shared/models/outputAsset.model';
import { Service } from 'src/app/shared/models/service.model';
import { DashboardService } from '../services/dashboard.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  public loanTab: boolean = true;
  public serviceTab: boolean = false;
  public inputAssetTab: boolean = false;
  public outputAssetTab: boolean = false;

  public assetInputs: InputAsset[] = [];
  public assetOutputs: OutputAsset[] = [];
  public loans: Loan[] = [];
  public services: Service[] = [];

  constructor(
    private router: Router,
    private dashboardService: DashboardService,
    private assetService: AssetService) { }

  async ngOnInit(): Promise<void> {
    if (window.history.state.needReload) {
      window.location.reload();
    } else {
      await this.getDashboard();
    }
  }

  async getDashboard() {
    let dashboard = await this.dashboardService.getDashboard();
    this.assetInputs = dashboard.assetInputs;
    this.assetOutputs = dashboard.assetOutputs;
    this.loans = dashboard.loans;
    this.services = dashboard.services;
  }

  async detailAsset(assetId: any) {
    let assets = await this.assetService.getAllAssets();
    let selectedAsset =
      <Asset>(assets.find((asset: Asset) => asset.id === assetId));
    this.router.navigate(['assets/details'], {
      state: { asset: selectedAsset },
    });
  }

  detailLoan(loanId: number) {
    let selectedLoan =
      <Loan>(this.loans.find((loan: Loan) => loan.id === loanId));
    this.router.navigate(['loans/form'], {
      state: { loan: selectedLoan },
    });
  }

  detailService(serviceId: number) {
    let selectedService =
      <Service>(this.services.find((service: Service) => service.id === serviceId));
    this.router.navigate(['services/form'], {
      state: { service: selectedService },
    });
  }
}
