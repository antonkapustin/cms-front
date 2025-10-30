import { inject, Injectable } from '@angular/core';
import { Apollo, gql, MutationResult } from 'apollo-angular';
import { Category } from '../interfaces/category.interface';
import { map, Observable, tap } from 'rxjs';

const GET_ALL_CATEGORIES = gql`
  {
    categories {
      categoryId
      name
    }
  }
`;

const DELETE_CATEGORY = gql`
  mutation removeCategory($id: Int!) {
    removeCategory(id: $id)
  }
`

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  private _apollo = inject(Apollo);


  private get _allCategoryQuery() {
    return this._apollo
      .watchQuery<{ categories: Category[] }>({
        query: GET_ALL_CATEGORIES,
      })
  }
  getAllCategories(): Observable<Category[]> {
    return this._allCategoryQuery.valueChanges
      .pipe(map((value) => value.data.categories));
  }

  refreshAllCategories(): void {
    this._allCategoryQuery.refetch();
  }

  deleteCategory(id: number): Observable<MutationResult<boolean>> {
    return this._apollo.mutate<boolean>({
      mutation: DELETE_CATEGORY,
      variables: { id },
      context: { fetchOptions: { credentials: 'include' } },
    }).pipe(
      tap(() => this.refreshAllCategories())
    );
  }
}
