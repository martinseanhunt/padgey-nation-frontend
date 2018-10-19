import App, { Container } from 'next/app'
import { ApolloProvider } from 'react-apollo'
import withApollo from '../config/withApollo'

import PageLayout from '../components/PageLayout'

class MyApp extends App {  
  static async getInitialProps({ Component, ctx }) {
    let pageProps = {}
    if(Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx)
    }

    return { pageProps }
  }

  render() {
    const { Component, pageProps, apollo } = this.props

    return (
      <Container>
        <ApolloProvider client={apollo}>
          <PageLayout>
            <Component {...pageProps}/>
          </PageLayout>
        </ApolloProvider>
      </Container>
    )
  }
}

export default withApollo(MyApp)