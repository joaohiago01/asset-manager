import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Category } from 'src/app/shared/models/category.model';
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

  constructor(
    public httpClient: HttpClient,
    public router: Router,
    public categoryService: CategoryService
  ) {
    this.types = Object.values(CategoryType);
  }

  async ngOnInit(): Promise<void> {
    await this.getAllCategories();
  }

  async getAllCategories(): Promise<void> {
    this.categories = await this.categoryService.getAllCategories();
    this.categories = this.categories.map((c : Category) => {
      if (c.name.length > 25) {
        c.name = c.name.slice(0, 25) + "...";
      }
      return c;
    });
    if (!this.categories) {
      alert('Nenhuma Categoria Encontrada');
    }
  }

  async createCategory(
    name: string,
    categoryTypeString: string
  ): Promise<void> {
    if (name && categoryTypeString) {
      const categoryType: CategoryType = <CategoryType>categoryTypeString;

      let category = new Category({
        name,
        categoryType,
      });
      let categoryWasCreated = await this.categoryService.createCategory(
        category
      );
      if (categoryWasCreated === true) {
        window.location.reload();
      } else {
        alert('Oops, ocorreu um erro ao tentar cadastrar essa Categoria');
      }
    } else {
      alert('Dados Inválidos');
    }
  }

  detailCategory(categoryId: number) {
    this.category = <Category>(
      this.categories.find((category: Category) => category.id === categoryId)
    );
    this.selectedValue = this.category.categoryType;
    this.showModal('#modalEditar');
  }

  async editCategory(
    id: number,
    name: string,
    categoryTypeString: string
  ): Promise<void> {
    if (name && categoryTypeString) {
      const categoryType: CategoryType = <CategoryType>categoryTypeString;
      let category = new Category(
        {
          name,
          categoryType,
        },
        id
      );
      let categoryWasEdited = await this.categoryService.editCategory(category);
      if (categoryWasEdited === true) {
        window.location.reload();
      } else {
        alert('Oops, ocorreu um erro ao tentar editar essa Categoria');
      }
    } else {
      alert('Dados Inválidos');
    }

    this.selectedValue = '';
  }

  async deleteCategory(id: number): Promise<void> {
    if (id) {
      let categoryWasDeleted = await this.categoryService.deleteCategory(id);
      if (categoryWasDeleted === true) {
        window.location.reload();
      } else {
        alert('Oops, ocorreu um erro ao tentar remover essa Categoria');
      }
    } else {
      alert('Categoria Inválida');
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
  }
}
