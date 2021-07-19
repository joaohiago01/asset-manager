import { Component, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { AssetService } from 'src/app/assets/services/asset.service';
import { OutputAssetService } from 'src/app/assets/services/outputAsset.service';
import { DepartmentService } from 'src/app/departments/services/department.service';
import { EquipmentService } from 'src/app/equipments/services/equipment.service';
import { Asset } from 'src/app/shared/models/asset.model';
import { Department } from 'src/app/shared/models/department.model';
import { Equipment } from 'src/app/shared/models/equipment.model';
import { OutputAsset } from 'src/app/shared/models/outputAsset.model';
import { Service } from 'src/app/shared/models/service.model';
import { ServiceType } from 'src/app/shared/models/serviceType.enum';
import { ServiceService } from '../services/service.service';

@Component({
  selector: 'app-service-form',
  templateUrl: './service-form.component.html',
  styleUrls: ['./service-form.component.css']
})
export class ServiceFormComponent implements OnInit {

  public service?: Service = <Service>{};
  public equipments: Equipment[] = [];
  public departments: Department[] = [];
  public assets: Asset[] = [];
  public assetOutputs: OutputAsset[] = [];
  public serviceTypes: string[] = [];

  public selectedEquipment?: Equipment = <Equipment>{};
  public selectedDepartmentId: number = 0;
  public selectedServiceType: string = '';
  public myControl = new FormControl();
  public assetFormControl = new FormControl();

  public serviceTab: boolean = true;
  public suapTab: boolean = false;
  public assetsTab: boolean = false;
  
  public filteredEquipments?: Observable<Equipment[]>;
  public filteredAssets?: Observable<Asset[]>;
  public selectedAsset?: Asset = <Asset>{};

  constructor(
    public router: Router,
    public serviceService: ServiceService,
    public equipmentService: EquipmentService,
    public departmentService: DepartmentService,
    public assetService: AssetService
  ) {
    const service: Service = <Service>(
      this.router.getCurrentNavigation()?.extras.state
    );

    if (service) {
      const map = new Map(Object.entries(Object.values(service)));
      const serviceNumber: string = map.get('0')['number'];
      this.myControl.setValue(serviceNumber);
    }
  }

  async ngOnInit(): Promise<void> {
    this.service = window.history.state.service;

    this.equipments = await this.equipmentService.getAllEquipments();

    if (this.service?.id) {
      this.selectedDepartmentId = this.service.department?.id ? this.service.department.id : 0;
      this.selectedServiceType = this.service.serviceType ? this.service.serviceType : '';
      
      this.selectedEquipment = this.equipments.find(
        (equipment: Equipment) => equipment.id === this.service?.equipmentId
      );
    }

    if (window.history.state.needReload) {
      window.location.reload();
    } 

    this.departments = await this.departmentService.getAllDepartments();
    this.assets = await this.assetService.getAllAssets();

    this.serviceTypes = Object.values(ServiceType);

    this.filteredEquipments = this.myControl.valueChanges.pipe(
      startWith(''),
      map((value: any) => this.equipmentsFilter(value))
    );

    this.filteredAssets = this.assetFormControl.valueChanges.pipe(
      startWith(''),
      map((value: any) => this.assetsFilter(value))
    );

  }

  async createService(
    selectedDepartmentId: number,
    selectedServiceType: string,
    description: string,
    consignorName: string,
    consignorRegistrationNumber: string,
    requestorName: string,
    requestorRegistrationNumber: string,
    callNumberSuap: string,
    callLinkSuap: string,
    observations: string
  ): Promise<void> {
    if (this.service?.id && this.selectedEquipment?.id) {
      this.editService(
        this.service.id,
        selectedDepartmentId,
        selectedServiceType,
        description,
        consignorName,
        consignorRegistrationNumber,
        requestorName,
        requestorRegistrationNumber,
        callNumberSuap,
        callLinkSuap,
        observations
      );
    } else {
      if (this.selectedEquipment?.id && selectedDepartmentId && selectedServiceType) {
        const serviceType: ServiceType = <ServiceType>(
          selectedServiceType
        );

        let service = new Service(
          {
            equipmentId: Number(this.selectedEquipment.id),
            departmentId: Number(selectedDepartmentId),
            serviceType: serviceType,
            description,
            assetOutputs: this.assetOutputs,
            returnDate: new Date(),
            consignor: {
              name: consignorName,
              registrationNumber: consignorRegistrationNumber,
            },
            requestor: {
              name: requestorName,
              registrationNumber: requestorRegistrationNumber,
            },
            callNumberSuap,
            callLinkSuap,
            observations,
          }
        );

        let serviceWasCreated = await this.serviceService.createService(
          service
        );
        if (serviceWasCreated === true) {
          this.service = undefined;
          this.router.navigate(['services'], { state: { needReload: true } });
        } else {
          setTimeout(function () {
            alert('Oops, ocorreu um erro ao tentar cadastrar esse Serviço');
          }, 2000);
        }
      } else {
        setTimeout(function () {
          alert('Dados Inválidos');
        }, 2000);
      }
    }
  }

  async editService(
    serviceId: number,
    selectedDepartmentId: number,
    selectedServiceType: string,
    description: string,
    consignorName: string,
    consignorRegistrationNumber: string,
    requestorName: string,
    requestorRegistrationNumber: string,
    callNumberSuap: string,
    callLinkSuap: string,
    observations: string
  ): Promise<void> {
    if (serviceId && this.selectedEquipment?.id && selectedDepartmentId && selectedServiceType) {
      const serviceType: ServiceType = <ServiceType>(
        selectedServiceType
      );

      let service = new Service(
        {
          equipmentId: Number(this.selectedEquipment.id),
          departmentId: Number(selectedDepartmentId),
          serviceType: serviceType,
          description,
          assetOutputs: this.assetOutputs,
          returnDate: new Date(),
          consignor: {
            name: consignorName,
            registrationNumber: consignorRegistrationNumber,
          },
          requestor: {
            name: requestorName,
            registrationNumber: requestorRegistrationNumber,
          },
          callNumberSuap,
          callLinkSuap,
          observations,
        },
        serviceId
      );

      let serviceWasEdited = await this.serviceService.editService(
        service
      );
      if (serviceWasEdited === true) {
        this.service = undefined;
        this.router.navigate(['services'], { state: { needReload: true } });
      } else {
        setTimeout(function () {
          alert('Oops, ocorreu um erro ao tentar editar esse Serviço');
        }, 2000);
      }
    } else {
      setTimeout(function () {
        alert('Dados Inválidos');
      }, 2000);
    }
  }

  async deleteService(serviceId: number): Promise<void> {
    if (serviceId) {
      let serviceWasDeleted = await this.serviceService.deleteService(serviceId);
      if (serviceWasDeleted === true) {
        this.router.navigate(['services'], { state: { needReload: true } });
      } else {
        setTimeout(function () {
          alert('Oops, ocorreu um erro ao tentar remover esse Serviço');
        }, 2000);
      }
    } else {
      setTimeout(function () {
        alert('Serviço Não Encontrado');
      }, 2000);
    }
  }

  async createAssetOutput(
    amount: string,
    selectedDepartmentId: number): Promise<void> {
      if (this.selectedAsset?.id && amount) {
      const assetOutput = new OutputAsset({
        amount: Number(amount),
        assetId: this.selectedAsset?.id,
        assetName: this.selectedAsset.name,
        departmentId: selectedDepartmentId,
      });

      this.assetOutputs.push(assetOutput);
      this.selectedAsset = <Asset>{};

      const assetAmountField: HTMLInputElement = <HTMLInputElement> document.querySelector("#assetAmount");
      assetAmountField.value = "";
    } else {
      alert("Informe a quantidade de insumos retirados!");
    }

  }

  navigateToServices(): void {
    this.router.navigate(['/services']);
  }

  public autoCompleteEquipmentFields(equipmentNumber: number) {
    this.selectedEquipment = this.equipments.find(
      (equipment) => {
        if (String(equipment.number).localeCompare(equipmentNumber.toString()) === 0) {
          return equipment;
        } else return;
      }
    );

    this.filteredEquipments = this.myControl.valueChanges.pipe(
      startWith(''),
      map((value: any) => this.equipmentsFilter(value))
    );
  }

  public autoCompleteAssetFields(assetId: number) {
    this.selectedAsset = this.assets.find(
      (asset) => {
        if (asset.id === assetId) {
          return asset;
        } else return;
      }
    );

    this.filteredAssets = this.assetFormControl.valueChanges.pipe(
      startWith(''),
      map((value: any) => this.assetsFilter(value))
    );
  }

  private equipmentsFilter(value: string): Equipment[] {
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

  private assetsFilter(value: string): Asset[] {
    if (value !== undefined) {
      const filterValue = value.toLowerCase();
      return this.assets.filter(
        (option) =>
          option.name.toLowerCase().includes(filterValue)
      );
    }

    return [];
  }

}