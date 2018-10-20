import React from 'react'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'
import Link from 'next/link'
import { FaArrowRight, FaArrowLeft } from 'react-icons/fa'
import { withRouter } from 'next/router'
import { PER_PAGE as perPage  } from '../config/config'

const LIST_ITEMS_CONNECTION_QUERY = gql`
  query LIST_ITEMS_CONNECTION_QUERY {
    listItemsConnection {
      count 
    }
  }
`

const Pagination = (props) => {
  const page = parseInt(props.router.query.page) || 1

  return (
  <Query query={LIST_ITEMS_CONNECTION_QUERY}>
    {({ data, loading, error }) => {
      if(error) return console.log(error) || <div/>
      if(loading) return <p>Loading...</p>
    
      const { listItemsConnection: { count } } = data 
      const pages = Math.ceil(count / perPage)

      return (
        <div className="pagination">
           <Link href={{
              pathname: '/',
              query: { page: page - 1}
            }} prefetch>
              <a className="prev" aria-disabled={page <= 1}><FaArrowLeft/></a>
            </Link>

            <p>Page {page} of {pages}</p>
            <p>{count} items total</p>

            <Link href={{
              pathname: '/',
              query: { page: page + 1}
            }} prefetch>
              <a className="next" aria-disabled={page >= pages}><FaArrowRight/></a>
            </Link>
        </div>
      )
    }}

  </Query>
)}

export default withRouter(Pagination)