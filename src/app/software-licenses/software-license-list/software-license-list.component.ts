import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CategoryService } from 'src/app/category/services/category.service';
import { Category } from 'src/app/shared/models/category.model';
import { SoftwareLicense } from 'src/app/shared/models/softwareLicense.model';
import { UtilityService } from 'src/app/shared/services/utility.service';
import { SoftwareLicenseService } from '../services/software-license.service';

@Component({
  selector: 'app-software-license-list',
  templateUrl: './software-license-list.component.html',
  styleUrls: ['./software-license-list.component.css'],
})
export class SoftwareLicenseListComponent implements OnInit {
  public softwareLicenses: SoftwareLicense[] = [];
  public selectedSoftwareLicense!: SoftwareLicense;
  public categoryName?: string;

  constructor(
    private router: Router,
    private softwareLicenseService: SoftwareLicenseService,
    public categoryService: CategoryService,
    public utilityService: UtilityService
  ) {}

  async ngOnInit(): Promise<void> {
    if (window.history.state.needReload) {
      window.location.reload();
    } else {
      await this.getAllSoftwareLicenses();
    }
  }

  async getAllSoftwareLicenses(): Promise<void> {
    this.softwareLicenses =
      await this.softwareLicenseService.getAllSoftwareLicenses();
    let categories = await this.categoryService.getAllCategories();
    this.softwareLicenses = this.softwareLicenses.map(
      (softwareLicense: SoftwareLicense) => {
        softwareLicense.categoryName = categories.find(
          (category: Category) => category.id === softwareLicense.categoryId
        )?.name;
        softwareLicense.maxActivations = softwareLicense.ignoreMaxActivations === true
          ? " - "
          : softwareLicense.maxActivations;
        return softwareLicense;
      }
    );

    if (!this.softwareLicenses) {
      this.utilityService.showNotification('Nenhuma licença de software encontrada');

      setTimeout(() => {
        this.utilityService.closeNotification();
      }, 3000);
    }
  }

  detailSoftwareLicense(softwareLicenseId: number) {
    this.selectedSoftwareLicense = <SoftwareLicense>(
      this.softwareLicenses.find(
        (softwareLicense: SoftwareLicense) =>
          softwareLicense.id === softwareLicenseId
      )
    );

    this.router.navigate(['software-licenses/form'], {
      state: { softwareLicense: this.selectedSoftwareLicense },
    });
  }

  navigateToSoftwareLicenseCreate(): void {
    this.router.navigate(['/software-licenses/form']);
  }

  detailSoftwareLicenseAssociations(softwareLicenseId: number) {
    this.selectedSoftwareLicense = <SoftwareLicense>(
      this.softwareLicenses.find(
        (softwareLicense: SoftwareLicense) =>
          softwareLicense.id === softwareLicenseId
      )
    );

    this.router.navigate(['software-licenses/associations'], {
      state: { softwareLicense: this.selectedSoftwareLicense },
    });
  }

  export() {
    let softwareLicences = this.softwareLicenses.map((softwareLicense: SoftwareLicense) => {
      return {
        id: softwareLicense.id,
        categoriaId: softwareLicense.categoryId,
        software: softwareLicense.name,
        numero: softwareLicense.number,
        chaveAtivacao: softwareLicense.activationKey,
        maximoAtivacoes: softwareLicense.maxActivations,
        quantidadeUsada: softwareLicense.numberOfActivationsUsed,
        ativacoesInfinitas: softwareLicense.ignoreMaxActivations
      };
    });
    let json = JSON.stringify(softwareLicences);
    const file = new Blob([json], { type: 'application/json' });
    saveAs(file, 'Licenças de Software.json');
  }

  navigateToSoftwareLicenseAssociations(): void {
    this.router.navigate(['/software-licenses/associations']);
  }

  showModal(modalSelector: string) {
    const modal: HTMLDivElement = <HTMLDivElement>(
      document.querySelector(modalSelector)
    );
    const overlay: HTMLDivElement = <HTMLDivElement>(
      document.querySelector('.overlay')
    );

    modal.classList.remove('hidden');
    overlay.classList.remove('hidden');
  }

  hideModal(modalSelector: string) {
    const modal: HTMLDivElement = <HTMLDivElement>(
      document.querySelector(modalSelector)
    );
    const overlay: HTMLDivElement = <HTMLDivElement>(
      document.querySelector('.overlay')
    );

    modal.classList.add('hidden');
    overlay.classList.add('hidden');
  }
}
