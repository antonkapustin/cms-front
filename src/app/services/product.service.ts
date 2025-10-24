import { inject, Injectable } from '@angular/core';
import { Apollo, gql, MutationResult } from 'apollo-angular';
import { map, Observable } from 'rxjs';
import { Product } from '../interfaces/product.interface';

const GET_ALL_PRODUCTS = gql`
  query GetAllProducts {
    products {
      id
      title
      code
      price
      image
    }
  }
`;

const CREATE_PRODUCT = gql`
  mutation createProduct($input: CreateProductInput!) {
    createProduct(createProductInput: $input) {
      id
    }
  }
`;

const DELETE_PRODUCT = gql`
  mutation removeProduct($id: Float!) {
    remove(id: $id)
  }
`
@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private _apollo = inject(Apollo);

  getAllProducts(): Observable<Product[]> {
    return this._apollo
      .query<any>({ query: GET_ALL_PRODUCTS })
      .pipe(map((value) => value.data.products));
  }

  createProduct(item: Product): Observable<MutationResult<Product>> {
    return this._apollo.mutate<Product>({
      mutation: CREATE_PRODUCT,
      variables: { input: item },
      context: { fetchOptions: { credentials: 'include' } },
    });
  }

  deleteProduct(id: number): Observable<MutationResult<boolean>> {
    return this._apollo.mutate<boolean>({
      mutation: DELETE_PRODUCT,
      variables: { id },
      context: { fetchOptions: { credentials: 'include' } },
    })
  }
}
