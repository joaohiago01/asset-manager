import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Equipment } from 'src/app/shared/models/equipment.model';
import { Category } from 'src/app/shared/models/category.model';
import { EquipmentService } from '../services/equipment.service';
import { CategoryService } from 'src/app/category/services/category.service';

@Component({
  selector: 'app-equipments-list',
  templateUrl: './equipments-list.component.html',
  styleUrls: ['./equipments-list.component.css'],
})
export class EquipmentsListComponent implements OnInit {
  public equipments: Equipment[] = [];
  public selectedEquipment!: Equipment;
  public categoryName?: string;

  constructor(
    private router: Router,
    public equipmentService: EquipmentService,
    public categoryService: CategoryService
  ) {}

  async ngOnInit(): Promise<void> {
    if (window.history.state.needReload) {
      window.location.reload();
    } else {
      await this.getAllEquipments();
    }
  }

  async getAllEquipments(): Promise<void> {
    this.equipments = await this.equipmentService.getAllEquipments();
    let categories = await this.categoryService.getAllCategories();
    this.equipments = this.equipments.map((equipment: Equipment) => {
      equipment.categoryName = categories.find(
        (category: Category) => category.id === equipment.categoryId
      )?.name;
      return equipment;
    });

    if (!this.equipments) {
      alert('Nenhum Equipamento Encontrado');
    }
  }

  detailEquipment(equipmentId: number) {
    this.selectedEquipment = <Equipment>(
      this.equipments.find(
        (equipment: Equipment) => equipment.id === equipmentId
      )
    );

    this.router.navigate(['equipments/form'], {
      state: { equipment: this.selectedEquipment },
    });
  }

  export() {
    let equipments = this.equipments.map((equipment: Equipment) => {
      return {
        id: equipment.id,
        numero: equipment.number,
        numeroSerie: equipment.serialNumber,
        descricao: equipment.description,
        bloco: equipment.block,
        sala: equipment.room,
        estadoConservacao: equipment.conservationState,
        rede: {
          hostname: equipment.network.hostname,
          enderecoIP: equipment.network.addressIP,
          enderecoMAC: equipment.network.addressMAC,
        }
      };
    });
    let json = JSON.stringify(equipments);
    const file = new Blob([json], { type: 'application/json' });
    saveAs(file, 'Equipamentos.json');
  }

  navigateToEquipmentCreate(): void {
    this.router.navigate(['/equipments/form']);
  }
}
