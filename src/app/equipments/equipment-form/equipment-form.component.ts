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
import { UtilityService } from 'src/app/shared/services/utility.service';

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
  public imageContent: string = '';

  constructor(
    private router: Router,
    public equipmentService: EquipmentService,
    public categoryService: CategoryService,
    public utilityService: UtilityService
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

        try {
          const response = await this.equipmentService.createEquipment(equipment);
          const equipmentId = response.data['id'];
  
          this.utilityService.showNotification('Equipamento cadastrado com sucesso');
  
          if (this.file.name != 'empty.txt') {
            const fileResponse = await this.equipmentService.sendFile(this.file, equipmentId);

            if (fileResponse.status != 201) {
              this.utilityService.showNotification("Ocorreu um erro ao salvar o arquivo");
  
              setTimeout(() => {
                this.utilityService.closeNotification();
              }, 2000);
            }
          }

          setTimeout(() => {
            this.utilityService.closeNotification();
  
            this.router.navigate(['equipments'], {
              state: { needReload: true },
            });
          }, 1500);
          
        } catch (error) {
          if (!error.response) {
            this.utilityService.showNotification('Oops, ocorreu um erro desconhecido! Tente novamente');
          }
  
          this.utilityService.showNotification(error.response.data['detail']);
  
          setTimeout(() => {
            this.utilityService.closeNotification();
          }, 4000);
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

    try {
      const response = await this.equipmentService.editEquipment(equipment);

      this.utilityService.showNotification('Equipamento atualizado com sucesso');

      setTimeout(() => {
        this.utilityService.closeNotification();

        this.router.navigate(['equipments'], {
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
  }

  async deleteEquipment(id: number): Promise<void> {
    if (id) {
      try {
        const response = await this.equipmentService.deleteEquipment(id);
  
        this.utilityService.showNotification('Equipamento excluído com sucesso');
  
        setTimeout(() => {
          this.utilityService.closeNotification();
  
          this.router.navigate(['equipments'], {
            state: { needReload: true },
          });
        }, 1000);
        
      } catch (error) {
        this.utilityService.showNotification('O equipamento está em uso e não pode ser excluído');
  
        setTimeout(() => {
          this.utilityService.closeNotification();
        }, 4000);
      }
    }
  }

  downloadFile() {
    if (this.equipment?.id && this.equipment.filename) {
      const promise = this.equipmentService.getFile(this.equipment?.id);

      promise.then(response => {

        // if (this.equipment?.filename)
          // var file = new File(response.data, this.equipment?.filename, { type: 'image/jpg' });

          // const data = JSON.stringify(response);
          const file = new File([response.data], "imagem.jpg", { type: 'image/jpg' });

          saveAs(file, this.equipment?.filename);
      });
      
      
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

}
