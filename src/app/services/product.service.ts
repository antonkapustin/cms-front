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
      description
      category {
        categoryId
        name
      }
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

const UPDATE_PRODUCT = gql`
  mutation updateProduct($input: UpdateProductInput!) {
    update(updateProductInput: $input) {
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
  private _allProductQuery =  this._apollo
      .watchQuery<any>({ query: GET_ALL_PRODUCTS, fetchPolicy: 'network-only', });

  getAllProducts(): Observable<Product[]> {
    return this._allProductQuery.valueChanges
      .pipe(map((value) => value.data.products));
  }

  refetchAllProducts(): void {
    this._allProductQuery.refetch();
  }

  createProduct(item: Product): Observable<MutationResult<Product>> {
    return this._apollo.mutate<Product>({
      mutation: CREATE_PRODUCT,
      variables: { input: item },
      context: { fetchOptions: { credentials: 'include' } },
    });
  }

  updateProduct(item: Product): Observable<MutationResult<Product>> {
    return this._apollo.mutate<Product>({
      mutation: UPDATE_PRODUCT,
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
