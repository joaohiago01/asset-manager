import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { Equipment } from 'src/app/shared/models/equipment.model';
import { Network } from 'src/app/shared/models/network.model';
import { ConservationState } from 'src/app/shared/models/conservationState.enum';
import { EquipmentApiCampus } from 'src/app/shared/models/equipmentApiCampus.model';
import { Category } from 'src/app/shared/models/category.model';
import { CategoryService } from 'src/app/category/services/category.service';
import { EquipmentService } from '../services/equipment.service';
import { CategoryType } from 'src/app/shared/models/categoryType.enum';

@Component({
  selector: 'app-equipment-form',
  templateUrl: './equipment-form.component.html',
  styleUrls: ['./equipment-form.component.css'],
})
export class EquipmentFormComponent implements OnInit {
  public equipment?: Equipment = <Equipment>{};
  public categories: Category[] = [];
  public selectedCategoryId: number = 0;
  public selectedConservationState: string = '';
  public conservationStates: string[] = [];

  public myControl = new FormControl();
  public options: EquipmentApiCampus[] = [];
  public filteredOptions?: Observable<EquipmentApiCampus[]>;

  public file: File = new File(['empty'], 'empty.txt', { type: 'text/plain' });

  constructor(
    private router: Router,
    public equipmentService: EquipmentService,
    public categoryService: CategoryService
  ) {
    const equipment: Equipment = <Equipment>(
      this.router.getCurrentNavigation()?.extras.state
    );

    if (equipment != null && equipment != undefined) {
      const map = new Map(Object.entries(Object.values(equipment)));
      const equipmentNumber: string = map.get('0')['number'];
      this.myControl.setValue(equipmentNumber);
    }
  }

  inputFileChange(event: Event) {
    const target = event.target as HTMLInputElement;
    const files = target.files as FileList;
    if (files != null && files[0] != null) {
      const userfile = files[0];
      this.file = userfile;
    }
  }

  async ngOnInit(): Promise<void> {
    this.options = await this.equipmentService.getAllEquipmentsSuggestions();
    /*let option1: EquipmentApiCampus = new EquipmentApiCampus(
      '215305',
      'IMPRESSORA ECO-TANK. MARCA: EPSON',
      'ativo'
    );
    let option2: EquipmentApiCampus = new EquipmentApiCampus(
      '215616',
      'EQUIPAMENTO SLUMP TEST',
      'ativo'
    );
    let option3: EquipmentApiCampus = new EquipmentApiCampus(
      '216061',
      'CADEIRA FIXA SEM APOIO DE BRAÇO',
      'ativo'
    );
    let optionsArray: EquipmentApiCampus[] = [option1, option2, option3];

    this.options = optionsArray;*/

    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map((value: any) => this._filter(value))
    );

    this.equipment = window.history.state.equipment;
    this.conservationStates = Object.values(ConservationState);

    let allCategories = await this.categoryService.getAllCategories();
    allCategories.forEach((category) => {
      if (category.categoryType !== CategoryType.SOFTWARE) {
        this.categories.push(category);
      }
    });

    if (this.equipment) {
      let selectedConservationState = this.conservationStates.find(
        (conservationState: any) =>
          conservationState === this.equipment?.conservationState
      );
      this.selectedConservationState = selectedConservationState
        ? selectedConservationState
        : '';
      let selectedCategoryId = this.categories.find(
        (category: Category) => category.id === this.equipment?.categoryId
      )?.id;
      this.selectedCategoryId = selectedCategoryId ? selectedCategoryId : 0;
    }
  }

  async createEquipment(
    selectedCategoryId: number,
    number: string,
    serialNumber: string,
    description: string,
    block: string,
    room: string,
    selectedConservationState: string,
    hostname: string,
    addressIP: string,
    addressMAC: string,
    filename: string
  ): Promise<void> {
    if (this.equipment) {
      this.editEquipment(
        this.equipment.id,
        selectedCategoryId,
        number,
        serialNumber,
        description,
        block,
        room,
        selectedConservationState,
        hostname,
        addressIP,
        addressMAC,
        filename
      );
    } else {
      if (number && selectedConservationState) {
        const conservationState: ConservationState = <ConservationState>(
          selectedConservationState
        );

        let network = new Network(hostname, addressIP, addressMAC);

        let equipment = new Equipment({
          categoryId: selectedCategoryId,
          number: Number.parseInt(number),
          serialNumber,
          description,
          block,
          room,
          conservationState,
          network,
          filename,
        });

        const response = await this.equipmentService.createEquipment(equipment);
        if (response.status == 201) {
          const equipmentId = response.data['id'];
          if (this.file.name != 'empty.txt') {
            const fileResponse = await this.equipmentService.sendFile(
              this.file,
              equipmentId
            );
            if (fileResponse.status == 201) {
              this.router.navigate(['equipments'], {
                state: { needReload: true },
              });
            }
          } else {
            this.router.navigate(['equipments'], {
              state: { needReload: true },
            });
          }
        } else {
          this.showNotification('Oops, ocorreu um erro ao tentar cadastrar esse equipamento');

          setTimeout(() => {
            this.closeNotification();
          }, 6000);
        }

      } else {
        this.showNotification('Não é possível cadastrar! Verifique se os campos estão preenchidos corretamente');

        setTimeout(() => {
          this.closeNotification();
        }, 6000);
      }
    }
  }

  async editEquipment(
    id: number,
    selectedCategoryId: number,
    number: string,
    serialNumber: string,
    description: string,
    block: string,
    room: string,
    selectedConservationState: string,
    hostname: string,
    addressIP: string,
    addressMAC: string,
    filename: string
  ): Promise<void> {
    if (id && number && selectedConservationState) {
      const conservationState: ConservationState = <ConservationState>(
        selectedConservationState
      );

      let network = new Network(hostname, addressIP, addressMAC);

      let equipment = new Equipment(
        {
          categoryId: selectedCategoryId,
          number: Number.parseInt(number),
          serialNumber,
          description,
          block,
          room,
          conservationState,
          network,
          filename,
        },
        id
      );

      let equipmentWasEdited = await this.equipmentService.editEquipment(
        equipment
      );
      if (equipmentWasEdited === true) {
        this.equipment = undefined;
        this.router.navigate(['equipments'], { state: { needReload: true } });
      } else {
        this.showNotification('Oops, ocorreu um erro ao tentar editar esse equipamento');

        setTimeout(() => {
          this.closeNotification();
        }, 6000);
      }
    } else {
      this.showNotification('Não é possível editar! Verifique se os campos estão preenchidos corretamente');

      setTimeout(() => {
        this.closeNotification();
      }, 6000);
    }
  }

  async deleteEquipment(id: number): Promise<void> {
    if (id) {
      let equipmentWasDeleted = await this.equipmentService.deleteEquipment(id);
      if (equipmentWasDeleted === true) {
        this.router.navigate(['equipments'], { state: { needReload: true } });
      } else {
        this.showNotification('Oops, ocorreu um erro ao tentar remover esse equipamento');

        setTimeout(() => {
          this.closeNotification();
        }, 6000);
      }
    } else {
      this.showNotification('Ocorreu um erro! Esse equipamento não foi encontrado');

      setTimeout(() => {
        this.closeNotification();
      }, 6000);
    }
  }

  public autoCompleteInputFields(equipmentApiCampusNumber: string) {
    const selectedEquipment: EquipmentApiCampus | undefined = this.options.find(
      (equipment) => {
        if (equipment.number.localeCompare(equipmentApiCampusNumber) === 0) {
          return equipment;
        } else return;
      }
    );

    const descriptionInput: HTMLTextAreaElement = <HTMLTextAreaElement>(
      document.querySelector('#description')
    );

    const numberInput: HTMLInputElement = <HTMLInputElement>(
      document.querySelector('#number')
    );

    if (selectedEquipment != undefined) {
      numberInput.value = selectedEquipment.number;
      descriptionInput.value = selectedEquipment.description;
    }
  }

  private _filter(value: string): EquipmentApiCampus[] {
    const filterValue = value.toLowerCase();
    return this.options.filter(
      (option) =>
        option.number.toLowerCase().includes(filterValue) ||
        option.description.toLowerCase().includes(filterValue)
    );
  }

  showNotification(message: string) {
    const notificationBox: HTMLDivElement = <HTMLDivElement> document.querySelector("#notification");
    const notificationMessage: HTMLSpanElement = <HTMLSpanElement> document.querySelector("#notificationMessage");

    notificationMessage.textContent = message;
    notificationBox.classList.remove("hidden");
  }

  closeNotification() {
    const notificationBox: HTMLDivElement = <HTMLDivElement> document.querySelector("#notification");
    notificationBox.classList.add("hidden");
  }

}
