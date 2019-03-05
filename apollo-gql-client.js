import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';

const httpLinkOptions = new HttpLink({
  credentials: 'same-origin',
});

// Create the apollo client
export default new ApolloClient({
  link: new HttpLink(httpLinkOptions),
  cache: new InMemoryCache(),
  connectToDevTools: true,
});
