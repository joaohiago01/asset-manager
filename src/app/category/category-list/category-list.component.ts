import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Category } from 'src/app/shared/models/category.model';
import { CategoryType } from '../../shared/models/categoryType.enum';
import { CategoryService } from '../services/category.service';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css']
})
export class CategoryListComponent implements OnInit {
  public categories: Category[] = [];

  constructor(
    public httpClient: HttpClient,
    public router: Router,
    public categoryService: CategoryService
  ) { }

  async ngOnInit(): Promise<void> {
    await this.getAllCategories();
  }

  async getAllCategories(): Promise<void> {
    this.categories = await this.categoryService.getAllCategories();
    if (!this.categories) {
      alert("Nenhuma Categoria Encontrada");
    }
  }

  async createCategory(name: string, categoryType: CategoryType): Promise<void> {
    if (name && categoryType) {
      let category = new Category({
        name,
        categoryType
      });
      let categoryWasCreated = await this.categoryService.createCategory(category);
      if (categoryWasCreated === true) {
        window.location.reload();
      } else {
        alert("Oops, ocorreu um erro ao tentar cadastrar essa Categoria");
      }
    } else {
      alert("Dados Inválidos");
    }
  }

  detailCategory(categoryId: number) {
    return this.categories.find((category: Category) => category.id === categoryId);
  }

  async editCategory(id: number, name: string, categoryType: CategoryType): Promise<void> {
    if (name && categoryType) {
      let category = new Category({
        name,
        categoryType
      }, id);
      let categoryWasEdited = await this.categoryService.editCategory(category);
      if (categoryWasEdited === true) {
        window.location.reload();
      } else {
        alert("Oops, ocorreu um erro ao tentar editar essa Categoria");
      }
    } else {
      alert("Dados Inválidos");
    }
  }

  async deleteCategory(id: number): Promise<void> {
    if (id) {
      let categoryWasDeleted = await this.categoryService.deleteCategory(id);
      if (categoryWasDeleted === true) {
        window.location.reload();
      } else {
        alert("Oops, ocorreu um erro ao tentar remover essa Categoria");
      }
    } else {
      alert("Categoria Inválida");
    }
  }

}
