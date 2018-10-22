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
  getQueryVars = () => ({ 
    skip: ((this.props.router.query.page || 1) - 1) * perPage 
  })
  
  reloadCurrentPage = async () => {
    const variables = this.getQueryVars()

    const myquery = await this.props.client.query({
      query: GET_LIST_ITEMS_QUERY,
      variables
    })
  }

  render() {
    const variables = this.getQueryVars()

    return (
      <Query query={GET_LIST_ITEMS_QUERY} variables={variables}>
        {({data, error, loading}) => {
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

              {loading 
                ? <div className="loading-items"><p>Loading...</p></div> 
                : <ListItems listItems={listItems} reloadCurrentPage={this.reloadCurrentPage} />}
              
              <Pagination />
            </div>
          )
        }}
      </Query>
    )
  }
}

export default withRouter(Index)