import { inject, Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { Category } from '../interfaces/category.interface';
import { map, Observable } from 'rxjs';

const GET_ALL_CATEGORIES = gql`
  {
    categories {
      categoryId
      name
    }
  }
`;

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  private _apollo = inject(Apollo);

  getAllCategories(): Observable<Category[]> {
    return this._apollo
      .query<{ categories: Category[] }>({
        query: GET_ALL_CATEGORIES,
      })
      .pipe(map((value) => value.data.categories));
  }
}
