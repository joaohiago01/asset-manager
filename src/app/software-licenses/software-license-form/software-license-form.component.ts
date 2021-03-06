import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { CategoryService } from 'src/app/category/services/category.service';
import { Category } from 'src/app/shared/models/category.model';
import { CategoryType } from 'src/app/shared/models/categoryType.enum';
import { SoftwareLicense } from 'src/app/shared/models/softwareLicense.model';
import { UtilityService } from 'src/app/shared/services/utility.service';
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
    public categoryService: CategoryService,
    public utilityService: UtilityService
  ) {
    const softwareLicense: SoftwareLicense = <SoftwareLicense>(
      this.router.getCurrentNavigation()?.extras.state
    );

    if (softwareLicense) {
      const map = new Map(Object.entries(Object.values(softwareLicense)));
      const softwareLicenseNumber: string = map.get('0')['number'];
      this.ignoreMaxActivations = softwareLicense.ignoreMaxActivations === undefined ? false : true;
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

    let ignoreMaxActivations = (<HTMLInputElement> window.document.getElementById("ignoreMaxActivations"));
    ignoreMaxActivations.checked = this.ignoreMaxActivations!;
    let maxActivations = window.document.getElementById("maxActivations");
    if (maxActivations && this.ignoreMaxActivations === true) {
      maxActivations.setAttribute('disabled', 'disabled');
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
          maxActivations: Number(maxActivations),
          numberOfActivationsUsed: 0,
          ignoreMaxActivations: this.ignoreMaxActivations
        });

        try {
          const response = await this.softwareLicenseService.createSoftwareLicense(softwareLicense);
    
          this.utilityService.showNotification('Licen??a de software cadastrada com sucesso');
    
          setTimeout(() => {
            this.utilityService.closeNotification();
    
            this.router.navigate(['software-licenses'], {
              state: { needReload: true },
            });
          }, 1000);
          
        } catch (error) {
          if (!error.response) {
            this.utilityService.showNotification('Oops, ocorreu um erro desconhecido! Tente novamente');
          }
    
          this.utilityService.showNotification(error.response.data['detail']);
    
          setTimeout(() => {
            this.utilityService.closeNotification();
          }, 4000);
        }
        
      } else {
        this.utilityService.showNotification("Insira a quantidade m??xima de ativa????es ou marque a op????o de ignorar o limite");

        setTimeout(() => {
          this.utilityService.closeNotification();
        }, 4000);
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

      try {
        const response = await this.softwareLicenseService.editSoftwareLicense(softwareLicense);
  
        this.utilityService.showNotification('Licen??a de software atualizada com sucesso');
  
        setTimeout(() => {
          this.utilityService.closeNotification();
  
          this.router.navigate(['software-licenses'], {
            state: { needReload: true },
          });
        }, 1000);
        
      } catch (error) {
        if (!error.response) {
          this.utilityService.showNotification('Oops, ocorreu um erro desconhecido! Tente novamente');
        }
  
        this.utilityService.showNotification(error.response.data['detail']);
  
        setTimeout(() => {
          this.utilityService.closeNotification();
        }, 4000);
      }

    } else {
      this.utilityService.showNotification("Insira a quantidade m??xima de ativa????es ou marque a op????o de ignorar o limite");

      setTimeout(() => {
        this.utilityService.closeNotification();
      }, 4000);
    }
  }

  async deleteSoftwareLicense(id: number): Promise<void> {
    if (id) {
      try {
        const response = await this.softwareLicenseService.deleteSoftwareLicense(id);

        this.utilityService.showNotification('Licen??a de software exclu??da com sucesso');

        setTimeout(() => {
          this.utilityService.closeNotification();

          this.router.navigate(['software-licenses'], {
            state: { needReload: true },
          });
        }, 1000);
        
      } catch (error) {
        this.utilityService.showNotification('A licen??a de software est?? em uso e n??o pode ser exclu??da');

        setTimeout(() => {
          this.utilityService.closeNotification();
        }, 4000);
      }
    }
  }

  changedIgnoreMaxActivations(event: any) {
    this.ignoreMaxActivations = event;
    if (this.softwareLicense) this.softwareLicense.maxActivations = null;
    let maxActivations = (<HTMLInputElement> window.document.getElementById("maxActivations"));
    if (maxActivations) {
      if (this.ignoreMaxActivations === true) {
        maxActivations.setAttribute('disabled', 'disabled');
        maxActivations.value = '';
      } else {
        maxActivations.removeAttribute('disabled');
      }
    }
  }
}
