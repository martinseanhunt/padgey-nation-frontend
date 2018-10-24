import React, { Component } from 'react'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'
import Link from 'next/link'
import { FaPlusSquare } from 'react-icons/fa'
import { withRouter } from 'next/router'

import { PER_PAGE as perPage  } from '../config/config'
import Pagination from './Pagination'
import ListItems from './ListItems'

const GET_LIST_ITEMS_QUERY = gql`
  query GET_LIST_ITEMS_QUERY($skip: Int = 0, $first: Int = ${perPage}) {
    listItems(skip: $skip, first: $first) {
      id
      title
    }
  }
`

class Index extends Component {  
  render() {
    return (
      <Query 
        query={GET_LIST_ITEMS_QUERY} 
        variables={{
          skip: ((this.props.router.query.page || 1) - 1) * perPage
        }}

        // adding this so we can get the correct loading status on refetch
        notifyOnNetworkStatusChange
      >
        { // Pull refetch from our Query and pass it down to ListItems.js  
        ({data, error, loading, refetch, networkStatus}) => {
          if(error) return console.log(error) || <div/>

          const { listItems } = data 

          return (
            <div>
              <header>
                <h2>List items</h2>
                <p>A simple list of listItems</p>

                <Link href='/create' >
                  <a className="add-link"><FaPlusSquare /></a>
                </Link>
              </header>
              
              { // if networkStatus is 4 then we're refetching so 
                // show loading state
              (loading || networkStatus === 4)
                ? <div className="loading-items"><p>Loading...</p></div> 
                : <ListItems listItems={listItems} refetch={refetch} />}
              
              <Pagination />
            </div>
          )
        }}
      </Query>
    )
  }
}

export default withRouter(Index)