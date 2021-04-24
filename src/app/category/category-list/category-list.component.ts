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

  createCategory(name: string, categoryType: CategoryType): void {
    if (name && categoryType) {
      let category = new Category({
        name,
        categoryType
      });
      let categoryWasCreated = this.categoryService.createCategory(category);
      if (categoryWasCreated === true) {
        this.router.navigate(['category']);
      } else {
        throw new Error("Oops, ocorreu um erro ao tentar cadastrar essa Categoria");
      }
    } else {
      throw new Error("Dados Inválidos");
    }
  }

  editCategory(id: number, name: string, categoryType: CategoryType): void {
    if (name && categoryType) {
      let category = new Category({
        name,
        categoryType
      }, id);
      let categoryWasEdited = this.categoryService.editCategory(category);
      if (categoryWasEdited === true) {
        this.router.navigate(['category']);
      } else {
        throw new Error("Oops, ocorreu um erro ao tentar editar essa Categoria");
      }
    } else {
      throw new Error("Dados Inválidos");
    }
  }

  deleteCategory(id: number) {
    if (id) {
      let categoryWasDeleted = this.categoryService.deleteCategory(id);
      if (categoryWasDeleted === true) {
        this.router.navigate(['category']);
      } else {
        throw new Error("Oops, ocorreu um erro ao tentar remover essa Categoria");
      }
    } else {
      throw new Error("Categoria Inválida");
    }
  }

}
