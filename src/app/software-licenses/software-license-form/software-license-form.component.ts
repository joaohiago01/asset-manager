import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { CategoryService } from 'src/app/category/services/category.service';
import { Category } from 'src/app/shared/models/category.model';
import { CategoryType } from 'src/app/shared/models/categoryType.enum';
import { SoftwareLicense } from 'src/app/shared/models/softwareLicense.model';
import { SoftwareLicenseService } from '../services/software-license.service';

@Component({
  selector: 'app-software-license-form',
  templateUrl: './software-license-form.component.html',
  styleUrls: ['./software-license-form.component.css'],
})
export class SoftwareLicenseFormComponent implements OnInit {
  public softwareLicense?: SoftwareLicense = <SoftwareLicense>{};
  public categories: Category[] = [];
  public selectedCategoryId: number = 0;
  public ignoreMaxActivations?: boolean;
  public myControl = new FormControl();

  constructor(
    private router: Router,
    public softwareLicenseService: SoftwareLicenseService,
    public categoryService: CategoryService
  ) {
    const softwareLicense: SoftwareLicense = <SoftwareLicense>(
      this.router.getCurrentNavigation()?.extras.state
    );
    this.ignoreMaxActivations = false;

    if (softwareLicense) {
      const map = new Map(Object.entries(Object.values(softwareLicense)));
      const softwareLicenseNumber: string = map.get('0')['number'];
      this.myControl.setValue(softwareLicenseNumber);
    }
  }

  async ngOnInit() {
    this.softwareLicense = window.history.state.softwareLicense;

    let allCategories = await this.categoryService.getAllCategories();
    allCategories.forEach((category) => {
      if (category.categoryType === CategoryType.SOFTWARE) {
        this.categories.push(category);
      }
    });

    if (this.softwareLicense) {
      let selectedCategoryId = this.categories.find(
        (category: Category) => category.id === this.softwareLicense?.categoryId
      )?.id;
      this.selectedCategoryId = selectedCategoryId ? selectedCategoryId : 0;
      this.ignoreMaxActivations = this.softwareLicense.ignoreMaxActivations;
    }
  }

  async createSoftwareLicense(
    selectedCategoryId: number,
    name: string,
    number: string,
    activationKey: string,
    maxActivations: string
  ): Promise<void> {
    if (this.softwareLicense) {
      this.editSoftwareLicense(
        this.softwareLicense.id,
        selectedCategoryId,
        name,
        number,
        activationKey,
        maxActivations,
        this.softwareLicense.numberOfActivationsUsed.toString()
      );
    } else {
      if (Number(maxActivations) > 0 || this.ignoreMaxActivations === true) {
        let softwareLicense = new SoftwareLicense({
          categoryId: selectedCategoryId,
          name: name,
          number: number,
          activationKey: activationKey,
          maxActivations: this.ignoreMaxActivations === false
            ? Number(maxActivations)
            : undefined,
          numberOfActivationsUsed: 0,
          ignoreMaxActivations: this.ignoreMaxActivations
        });

        let softwareLicenseWasCreated =
          await this.softwareLicenseService.createSoftwareLicense(
            softwareLicense
          );

        if (softwareLicenseWasCreated) {
          this.router.navigate(['software-licenses'], {
            state: { needReload: true },
          });
        } else {
          alert(
            'Oops, ocorreu um erro ao tentar cadastrar essa Licença de Software'
          );
        }
      } else {
        alert('Dados Inválidos');
      }
    }
  }

  async editSoftwareLicense(
    id: number,
    selectedCategoryId: number,
    name: string,
    number: string,
    activationKey: string,
    maxActivations: string,
    numberOfActivationsUsed: string
  ): Promise<void> {
    if (id && Number(maxActivations) > 0 || this.ignoreMaxActivations === true) {
      let softwareLicense = new SoftwareLicense(
        {
          categoryId: selectedCategoryId,
          name: name,
          number: number,
          activationKey: activationKey,
          maxActivations: this.ignoreMaxActivations === false
            ? Number(maxActivations)
            : undefined,
          numberOfActivationsUsed: Number(numberOfActivationsUsed),
          ignoreMaxActivations: this.ignoreMaxActivations
        },
        id
      );

      let softwareLicenseWasEdited =
        await this.softwareLicenseService.editSoftwareLicense(softwareLicense);
      if (softwareLicenseWasEdited === true) {
        this.softwareLicense = undefined;
        this.router.navigate(['software-licenses'], {
          state: { needReload: true },
        });
      } else {
        alert(
          'Oops, ocorreu um erro ao tentar editar essa Licença de Software'
        );
      }
    } else {
      alert('Dados Inválidos');
    }
  }

  async deleteSoftwareLicense(id: number): Promise<void> {
    if (id) {
      let softwareLicenseWasDeleted =
        await this.softwareLicenseService.deleteSoftwareLicense(id);
      if (softwareLicenseWasDeleted === true) {
        this.router.navigate(['software-licenses'], {
          state: { needReload: true },
        });
      } else {
        alert(
          'Oops, ocorreu um erro ao tentar remover essa Licença de Software'
        );
      }
    } else {
      alert('Licença de Software Não Encontrada');
    }
  }

  changedIgnoreMaxActivations(event: any) {
    this.ignoreMaxActivations = event.target.checked;
  }
}
