import { inject, Provider } from '@angular/core';
import { InMemoryCache } from '@apollo/client/cache';
import { HttpLink } from 'apollo-angular/http';
import { provideApollo } from 'apollo-angular';
import { ApolloLink } from '@apollo/client/core';
import { TokenService } from './services/token.service';

export function createApolloProvider(): Provider {
  return provideApollo(() => {
    const httpLink = inject(HttpLink);
    const tokenService = inject(TokenService);

    const authLink = new ApolloLink((operation, forward) => {
      const token = tokenService.accessToken;
      if (token) {
        operation.setContext({
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      }
      return forward(operation);
    });

    const http = httpLink.create({
        uri: 'http://localhost:3000/graphql',
        withCredentials: true,
      });

    return {
      link:authLink.concat(http),
      cache: new InMemoryCache(),
    };
  });
}
