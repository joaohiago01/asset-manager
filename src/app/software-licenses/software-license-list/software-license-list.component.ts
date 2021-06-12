import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CategoryService } from 'src/app/category/services/category.service';
import { Category } from 'src/app/shared/models/category.model';
import { SoftwareLicense } from 'src/app/shared/models/softwareLicense.model';
import { SoftwareLicenseService } from '../services/software-license.service';

@Component({
  selector: 'app-software-license-list',
  templateUrl: './software-license-list.component.html',
  styleUrls: ['./software-license-list.component.css']
})
export class SoftwareLicenseListComponent implements OnInit {
  public softwareLicenses: SoftwareLicense[] = [];
  public selectedSoftwareLicense!: SoftwareLicense;
  public categoryName?: string;

  constructor(
    private router: Router,
    private softwareLicenseService: SoftwareLicenseService,
    public categoryService: CategoryService
  ) {}

  async ngOnInit(): Promise<void> {
    if (window.history.state.needReload) {
      window.location.reload();
    } else {
      await this.getAllSoftwareLicenses();
    }
  }

  async getAllSoftwareLicenses(): Promise<void> {
    this.softwareLicenses = await this.softwareLicenseService.getAllSoftwareLicenses();
    let categories = await this.categoryService.getAllCategories();
    this.softwareLicenses = this.softwareLicenses.map((softwareLicense: SoftwareLicense) => {
      softwareLicense.categoryName = categories
        .find((category: Category) => category.id === softwareLicense.categoryId)?.name;
      return softwareLicense;
    });

    if (!this.softwareLicenses) {
      alert('Nenhuma Licença de Software encontrada');
    }
  }

  detailSoftwareLicense(softwareLicenseId: number) {
    this.selectedSoftwareLicense = <SoftwareLicense>(
      this.softwareLicenses.find((softwareLicense: SoftwareLicense) => softwareLicense.id === softwareLicenseId)
    );

    this.router.navigate(['software-licenses/form'], {
      state: { softwareLicense: this.selectedSoftwareLicense },
    });
  }

  navigateToSoftwareLicenseCreate(): void {
    this.router.navigate(['/software-licenses/form']);
  }

}
