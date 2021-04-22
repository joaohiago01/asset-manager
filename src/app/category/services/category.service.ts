import { Injectable } from '@angular/core';
import api from 'src/app/shared/services/api';
import { environment } from 'src/environments/environment.prod';
import { Category } from '../../shared/models/category.model';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor() { }

  getAllCategories(): Category[] {
    let categories!: Category[];

    let auth = {
      username: environment.usernameApi,
      password: environment.passwordApi
    };

    api.get('/category/list', { auth })
      .then((response: any) => {
        categories = response.data;
      })
      .catch((error: Error) => {
        return [];
      });

    return categories;
  }

  createCategory(category: Category): boolean {
    let categoryWasCreated = false;

    let auth = {
      username: environment.usernameApi,
      password: environment.passwordApi
    };

    api.post('/category/create', category, { auth })
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

    let auth = {
      username: environment.usernameApi,
      password: environment.passwordApi
    };

    api.put('/category/edit', category, { auth })
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

    let auth = {
      username: environment.usernameApi,
      password: environment.passwordApi
    };

    api.put('/category/delete', id, { auth })
      .then((response: any) => {
        categoryWasDeleted = true;
      })
      .catch((error: Error) => {
        categoryWasDeleted = false;
      });

    return categoryWasDeleted;
  }
}
