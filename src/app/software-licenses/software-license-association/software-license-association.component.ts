import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { CategoryService } from 'src/app/category/services/category.service';
import { EquipmentService } from 'src/app/equipments/services/equipment.service';
import { Category } from 'src/app/shared/models/category.model';
import { Equipment } from 'src/app/shared/models/equipment.model';
import { SoftwareLicense } from 'src/app/shared/models/softwareLicense.model';
import { SoftwareLicenseAssociationService } from '../services/software-license-association.service';
import { SoftwareLicenseService } from '../services/software-license.service';

@Component({
  selector: 'app-software-license-association',
  templateUrl: './software-license-association.component.html',
  styleUrls: ['./software-license-association.component.css']
})
export class SoftwareLicenseAssociationComponent implements OnInit {

  public softwareLicense?: SoftwareLicense = <SoftwareLicense>{};
  public associatedEquipments: Equipment[] = [];
  public equipments: Equipment[] = [];
  public selectedEquipment?: Equipment = <Equipment>{};
  public myControl = new FormControl();
  
  public filteredOptions?: Observable<Equipment[]>;

  constructor(
    private router: Router,
    public softwareLicenseService: SoftwareLicenseService,
    public associationService: SoftwareLicenseAssociationService,
    public equipmentService: EquipmentService,
    public categoryService: CategoryService
  ) {
    const softwareLicense: SoftwareLicense = <SoftwareLicense>(
      this.router.getCurrentNavigation()?.extras.state
    );

    if (softwareLicense) {
      const map = new Map(Object.entries(Object.values(softwareLicense)));
      const softwareLicenseNumber: string = map.get('0')['number'];
    }

  }

  async ngOnInit(): Promise<void> {
    this.softwareLicense = window.history.state.softwareLicense;

    if (window.history.state.needReload) {
      window.location.reload();
    } else {
      if (this.softwareLicense?.id) {
        await this.getAllAssociatedEquipments(this.softwareLicense?.id);
      }
    }

    this.equipments = await this.equipmentService.getAllEquipments();

    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map((value: any) => this._filter(value))
    );
  }

  async getAllAssociatedEquipments(id: number): Promise<void> {
    this.associatedEquipments = await this.associationService.getAllAssociations(id);

    let categories = await this.categoryService.getAllCategories();
    this.associatedEquipments = this.associatedEquipments.map((equipment: Equipment) => {
      equipment.categoryName = categories.find(
        (category: Category) => category.id === equipment.categoryId
      )?.name;
      return equipment;
    });

  }

  async associateSoftwareLicense(equipmentId?: number): Promise<void> {
    if (this.softwareLicense?.id != undefined && equipmentId !== undefined) {
      let softwareLicenseWasAssociated = await this.associationService.associateSoftwareLicense(this.softwareLicense?.id, equipmentId);

      if (softwareLicenseWasAssociated) {
        alert('A Licença de Software foi associada com sucesso!')

        this.softwareLicense.numberOfActivationsUsed++;

        this.router.navigate(['software-licenses/associations'], {
          state: { softwareLicense: this.softwareLicense },
        });
      } else {
        alert('Não foi possível fazer essa associação!'); 
      }

    }

    if (equipmentId === undefined)
      alert('Nenhum equipamento foi selecionado!');
    
  }

  async disassociateSoftwareLicense(equipmentId: number): Promise<void> {
    if (this.softwareLicense?.id != undefined && equipmentId !== undefined) {
      let softwareLicenseWasDisassociated = await this.associationService.disassociateSoftwareLicense(this.softwareLicense?.id, equipmentId);

      console.log(softwareLicenseWasDisassociated);

      if (softwareLicenseWasDisassociated) {
        alert('A associação foi desfeita com sucesso!')

        this.softwareLicense.numberOfActivationsUsed--;

        this.router.navigate(['software-licenses/associations'], {
          state: { softwareLicense: this.softwareLicense },
        });
      } else {
        alert('Não foi possível desfazer essa associação!');
      }
    }

    if (equipmentId === undefined)
      alert('Nenhum equipamento foi selecionado!');

  }

  navigateToSoftwareLicenses(): void {
    this.router.navigate(['/software-licenses']);
  }

  public autoCompleteEquipmentFields(equipmentNumber: number) {
    this.selectedEquipment = this.equipments.find(
      (equipment) => {
        if (String(equipment.number).localeCompare(equipmentNumber.toString()) === 0) {
          return equipment;
        } else return;
      }
    );

    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map((value: any) => this._filter(value))
    );
  }

  private _filter(value: string): Equipment[] {
    if (value !== undefined) {
      const filterValue = value.toLowerCase();
      return this.equipments.filter(
        (option) =>
          String(option.number).toLowerCase().includes(filterValue) ||
          option.description.toLowerCase().includes(filterValue)
      );
    }

    return [];
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

    this.selectedEquipment = undefined;
  }

}