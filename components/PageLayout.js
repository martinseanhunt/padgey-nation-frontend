import React from 'react'
import Head from 'next/head'

import Header from './Header'
import GlobalStyles from './styles/GlobalStyles'

export default props => (
  <>
    <GlobalStyles/>
    <Head>
      <title>PadgeyNation</title>
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      <link rel="stylesheet" type="text/css" href="/static/nprog.css" />
    </Head>

    <Header />

    <div className="main">
      {props.children}
    </div>
  </>
)