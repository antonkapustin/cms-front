import { Injectable } from '@angular/core';
import { Apollo, gql, MutationResult } from 'apollo-angular';
import { Observable, tap } from 'rxjs';
import { LoginResponse } from '../interfaces/auth.interface';
import { TokenService } from './token.service';

const LOGIN = gql`mutation Login($input: LoginUserInput!) {
  login(loginUserInput: $input) {
     user {
      username
    }
    access_token
  }
}`;

const SINGUP = gql`
mutation Signup($input: LoginUserInput!) {
  signup(loginUserInput: $input) {
    username
    id
  }
}`

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private _apollo: Apollo, private _tokenService: TokenService) {}

  login(data: { username: string; password: string }): Observable<MutationResult<LoginResponse>> {
    return this._apollo.mutate<LoginResponse>({
      mutation: LOGIN,
      variables: {input: data},
      context: {fetchOptions: {credentials: 'include'}},
    }).pipe(tap((value) => {
      this._tokenService.accessToken = value.data!.login.access_token;
    }));
  }

  signup(data: { username: string; password: string }): Observable<MutationResult<LoginResponse>> {
    return this._apollo.mutate<LoginResponse>({
      mutation: SINGUP,
      variables: {input: data},
      context: {fetchOptions: {credentials: 'include'}},
    })
  }
}
