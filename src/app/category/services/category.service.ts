import { Injectable } from '@angular/core';
import api from 'src/app/shared/services/api';
import { AuthenticationService } from 'src/app/shared/services/authentication.service';
import { environment } from 'src/environments/environment.prod';
import { Category } from '../../shared/models/category.model';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(
    private authenticationService: AuthenticationService
  ) { }

  async getAllCategories(): Promise<Category[]> {
    try {
      let categories !: Category[];

      let headers = {
        Authorization: `Bearer ${this.authenticationService.token}`
      };

      const response = await api.get('/categorias', { headers });
      categories = response.data.map((categoryServer: any) => {
        return new Category({
          name: categoryServer.nome,
          categoryType: categoryServer.tipoCategoria
        },
          categoryServer.id);
      });

      return categories;
    } catch (error) {
      console.error(error);
      return [];
    }
  }

  async createCategory(category: Category): Promise<boolean> {
    let categoryWasCreated = false;
    try {
      let headers = {
        Authorization: `Bearer ${this.authenticationService.token}`
      };

      let categoryServer = {
        nome: category.name,
        tipoCategoria: category.categoryType
      };
      await api.post('/categorias', categoryServer, { headers });
      categoryWasCreated = true;

      return categoryWasCreated;
    } catch (error) {
      console.error(error);
      return categoryWasCreated = false;
    }
  }

  async editCategory(category: Category): Promise<boolean> {
    let categoryWasEdited = false;
    try {
      let headers = {
        Authorization: `Bearer ${this.authenticationService.token}`
      };

      let categoryServer = {
        id: category.id,
        nome: category.name,
        tipoCategoria: category.categoryType
      };
      api.put(`/categorias/${category.id}`, categoryServer, { headers });
      categoryWasEdited = true;

      return categoryWasEdited;
    } catch (error) {
      console.error(error);
      return categoryWasEdited = false;
    }
  }

  async deleteCategory(id: Number): Promise<boolean> {
    let categoryWasDeleted = false;
    try {
      let headers = {
        Authorization: `Bearer ${this.authenticationService.token}`
      };

      api.delete(`/categorias/${id}`, { headers });
      categoryWasDeleted = true;

      return categoryWasDeleted;
    } catch (error) {
      console.error(error);
      return categoryWasDeleted = false;
    }
  }
}
