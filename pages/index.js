import { ApolloConsumer } from 'react-apollo'

import Index from '../components/Index'

// Pass down the apollo client so that we
// can call a query manually on item delete 
// and refresh the data 

export default () => (
  <ApolloConsumer>
    {client => <Index client={client} />}
  </ApolloConsumer>
)