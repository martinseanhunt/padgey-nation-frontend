import { ApolloConsumer } from 'react-apollo'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'

import Index from '../components/Index'

// Get all the nececarry data from our client and pass it to Index forcing a re-render
// Whenever the cached data changes

const GET_LAST_PAGE_LOADED = gql`
  {
    listItemsToRender @client {
      id
      title
    } 
    loadingPage @client
    loadingError @client
    updateCurrentPage @client
  }
`

export default () => (
  <Query query={GET_LAST_PAGE_LOADED}>
    {({data}) => (
      <ApolloConsumer>
        {client => <Index 
          client={client} 
          updateCurrentPage={data.updateCurrentPage} 
          listItemsToRender={data.listItemsToRender} 
          listItemsLoading={data.loadingPage} 
          loadingError={data.loadingError}/>}
      </ApolloConsumer>
    )}
  </Query>
)