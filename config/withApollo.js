import ApolloClient from 'apollo-boost'
import withApollo from 'next-with-apollo'

import { GRAPHQL_URL } from '../config'

export default withApollo(({ ctx, headers }) => (
  new ApolloClient({ 
    uri: GRAPHQL_URL, 
    request: operation => {
      operation.setContext({
        fetchOptions: {
          credentials: 'include',
        },
        headers,
      });
    },
    // Setting up localState defaults which we will use later...
    clientState: {
      defaults: {
        listItemPagesToRefetch: [],
        lastListItemPageLoaded: null,
      }
    }
  })
))