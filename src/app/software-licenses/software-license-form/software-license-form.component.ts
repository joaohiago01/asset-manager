import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { CategoryService } from 'src/app/category/services/category.service';
import { Category } from 'src/app/shared/models/category.model';
import { SoftwareLicense } from 'src/app/shared/models/softwareLicense.model';
import { SoftwareLicenseService } from '../services/software-license.service';

@Component({
  selector: 'app-software-license-form',
  templateUrl: './software-license-form.component.html',
  styleUrls: ['./software-license-form.component.css']
})
export class SoftwareLicenseFormComponent implements OnInit {
  public softwareLicense?: SoftwareLicense = <SoftwareLicense>{};
  public categories: Category[] = [];
  public selectedCategoryId: number = 0;
  public myControl = new FormControl();

  constructor(
    private router: Router,
    public softwareLicenseService: SoftwareLicenseService,
    public categoryService: CategoryService
  ) {
    const softwareLicense: SoftwareLicense = <SoftwareLicense>(
      this.router.getCurrentNavigation()?.extras.state
    );

    if (softwareLicense) {
      const map = new Map(Object.entries(Object.values(softwareLicense)));
      const softwareLicenseNumber: string = map.get('0')['number'];
      this.myControl.setValue(softwareLicenseNumber);
    }
  }

  async ngOnInit() {
    this.softwareLicense = window.history.state.softwareLicense;
    this.categories = await this.categoryService.getAllCategories();
    if (this.softwareLicense) {
      let selectedCategoryId = this.categories
        .find((category: Category) => category.id === this.softwareLicense?.categoryId)?.id;
      this.selectedCategoryId = selectedCategoryId ? selectedCategoryId : 0;
    }
  }

  async deleteSoftwareLicense(id: number): Promise<void> {
    if (id) {
      let softwareLicenseWasDeleted = await this.softwareLicenseService.deleteSoftwareLicense(id);
      if (softwareLicenseWasDeleted === true) {
        this.router.navigate(['software-licenses'], { state: { needReload: true } });
      } else {
        alert('Oops, ocorreu um erro ao tentar remover essa Licença de Software');
      }
    } else {
      alert('Licença de Software Não Encontrada');
    }
  }
}
