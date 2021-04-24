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

  createCategory(category: Category): boolean {
    let categoryWasCreated = false;

    let headers = {
      Authorization: `Bearer ${this.authenticationService.token}`
    };

    api.post('/category/create', category, { headers })
      .then((response: any) => {
        categoryWasCreated = true;
      })
      .catch((error: Error) => {
        categoryWasCreated = false;
      });

    return categoryWasCreated;
  }

  editCategory(category: Category): boolean {
    let categoryWasEdited = false;

    let headers = {
      Authorization: `Bearer ${this.authenticationService.token}`
    };

    api.put('/category/edit', category, { headers })
      .then((response: any) => {
        categoryWasEdited = true;
      })
      .catch((error: Error) => {
        categoryWasEdited = false;
      });

    return categoryWasEdited;
  }

  deleteCategory(id: Number): boolean {
    let categoryWasDeleted = false;

    let headers = {
      Authorization: `Bearer ${this.authenticationService.token}`
    };

    api.put('/category/delete', id, { headers })
      .then((response: any) => {
        categoryWasDeleted = true;
      })
      .catch((error: Error) => {
        categoryWasDeleted = false;
      });

    return categoryWasDeleted;
  }
}
