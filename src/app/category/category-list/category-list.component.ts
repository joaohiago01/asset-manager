import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Category } from 'src/app/shared/models/category.model';
import { UtilityService } from 'src/app/shared/services/utility.service';
import { CategoryType } from '../../shared/models/categoryType.enum';
import { CategoryService } from '../services/category.service';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css'],
})
export class CategoryListComponent implements OnInit {
  public categories: Category[] = [];
  public selectedValue: string = '';
  types: string[] = [];
  category: Category = <Category>{};
  public selectedCategory: Category = <Category>{};

  constructor(
    public httpClient: HttpClient,
    public router: Router,
    public categoryService: CategoryService,
    public utilityService: UtilityService
  ) {
    this.types = Object.values(CategoryType);
  }

  async ngOnInit(): Promise<void> {
    await this.getAllCategories();
  }

  async getAllCategories(): Promise<void> {
    this.categories = await this.categoryService.getAllCategories();
    if (!this.categories) {
      this.utilityService.showNotification('Nenhuma categoria encontrada');

      setTimeout(() => {
        this.utilityService.closeNotification();
      }, 3000);
    }
  }

  async createCategory(
    name: string,
    categoryTypeString: string
  ): Promise<void> {
      const categoryType: CategoryType = <CategoryType>categoryTypeString;

      let category = new Category({
        name,
        categoryType,
      });

      try {
        const response = await this.categoryService.createCategory(category);

        this.utilityService.showNotification('Categoria cadastrada com sucesso');

        setTimeout(() => {
          this.utilityService.closeNotification();

          window.location.reload();
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

  detailCategory(categoryId: number) {
    this.category = <Category>(
      this.categories.find((category: Category) => category.id === categoryId)
    );
    this.selectedValue = this.category.categoryType;
    this.showModal('#modalCadastrar');
  }

  async editCategory(
    id: number,
    name: string,
    categoryTypeString: string
  ): Promise<void> {
    const categoryType: CategoryType = <CategoryType>categoryTypeString;
    let category = new Category(
      {
        name,
        categoryType,
      },
      id
    );
    
    try {
      const response = await this.categoryService.editCategory(category);

      this.utilityService.showNotification('Categoria atualizada com sucesso');

      setTimeout(() => {
        this.utilityService.closeNotification();

        window.location.reload();
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

  async deleteCategory(id: number): Promise<void> {
    if (id) {
      try {
        const response = await this.categoryService.deleteCategory(id);
  
        this.utilityService.showNotification('Categoria excluída com sucesso');

        this.selectedCategory = <Category>{};
        this.utilityService.closeConfirmationModal();
  
        setTimeout(() => {
          this.utilityService.closeNotification();
  
          window.location.reload();
        }, 1000);
        
      } catch (error) {
        this.utilityService.showNotification('A categoria está em uso e não pode ser excluída');
  
        setTimeout(() => {
          this.utilityService.closeNotification();
        }, 4000);
      }

    }

  }

  showDeletionModal(id: number) {
    if (id) {
      this.selectedCategory = <Category>(
        this.categories.find((category: Category) => category.id === id)
      );

      this.utilityService.showConfirmationModal();
    }
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

    this.selectedValue = '';
    this.category = <Category>{};
  }
}
