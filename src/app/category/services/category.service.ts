import { Injectable } from '@angular/core';
import { AxiosResponse } from 'axios';
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

  async createCategory(category: Category): Promise<AxiosResponse> {
    let headers = {
      Authorization: `Bearer ${this.authenticationService.token}`
    };

    let categoryServer = {
      nome: category.name,
      tipoCategoria: category.categoryType
    };
    
    return await api.post('/categorias', categoryServer, { headers });
  }

  async editCategory(category: Category): Promise<boolean> {
    let headers = {
      Authorization: `Bearer ${this.authenticationService.token}`
    };

    let categoryServer = {
      id: category.id,
      nome: category.name,
      tipoCategoria: category.categoryType
    };

    return api.put(`/categorias/${category.id}`, categoryServer, { headers });
  }

  async deleteCategory(id: Number): Promise<boolean> {
      let headers = {
        Authorization: `Bearer ${this.authenticationService.token}`
      };

      return api.delete(`/categorias/${id}`, { headers });
  }

}