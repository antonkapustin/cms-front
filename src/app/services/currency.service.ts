import { inject, Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { Currency } from '../interfaces/currency.interface';
import { map, Observable } from 'rxjs';
import { ApolloQueryResult } from '@apollo/client/core/types';

const GET_ALL_CURRENCCIES = gql`
  {
    currencies {
      code
      currency
      digits
    }
  }
`;

@Injectable({
  providedIn: 'root',
})
export class CurrencyService {
  private readonly _apollo = inject(Apollo);

  getAllCurrencies(): Observable<Currency[]> {
    return this._apollo.query<{ currencies: Currency[] }>({
      query: GET_ALL_CURRENCCIES,
    }).pipe(map((value) => value.data.currencies));
  }
}
