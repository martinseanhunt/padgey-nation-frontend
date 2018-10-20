import ApolloClient from 'apollo-boost'
import withApollo from 'next-with-apollo'

import { GRAPHQL_URL } from './config'

export default withApollo(({ ctx, headers }) => (
  new ApolloClient({ 
    uri: GRAPHQL_URL, 
  })
))