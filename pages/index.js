import { ApolloConsumer } from 'react-apollo'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'

import Index from '../components/Index'

const GET_LAST_PAGE_LOADED = gql`
  {
    lastListItemPageLoaded @client
  }
`

export default () => (
  <Query query={GET_LAST_PAGE_LOADED}>
    {({data}) => (
      <ApolloConsumer>
        {client => <Index client={client} lastListItemPageLoaded={data.lastListItemPageLoaded}/>}
      </ApolloConsumer>
    )}
  </Query>
)