import React, { Component } from 'react'
import gql from 'graphql-tag'
import { withRouter } from 'next/router'
import Link from 'next/link'
import { FaPlusSquare } from 'react-icons/fa'

import { PER_PAGE as perPage  } from '../config'
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

const GET_PAGES_TO_REFETCH = gql`
  {
    listItemPagesToRefetch @client
  }
`

const currentPageFromRouter = (router) => parseInt(router.query.page) || 1

class Index extends Component {  
  state = {
    loading: true,
    listItems: [],
    error: null
  }

  // Handle when component mounts (the first page load)
  componentDidMount = () => this.componentDidUpdate()

  componentDidUpdate = async () => {
    const { router, client, lastListItemPageLoaded } = this.props
    const { error } = this.state

    const page = currentPageFromRouter(router)

    // check if the query has already been found for this page (either from server or from chace) 
    // so we don't get stuck in a loop after grabbing the items
    // Needs to be in apollo cache so that it can be reset by deleteItem to
    // trigger a refetch of the current page.. This is being passed down from items.js
    // so that updating it causes a re render
    
    const alreadySetForPage = page === lastListItemPageLoaded
    if(alreadySetForPage || error) return

    // Set the state to loading if we haven't already
    if(!this.state.loading) return this.setState({ loading: true })

    // get list of pages that need to be refetched from our apollo cache
    const res = await client.query({ query: GET_PAGES_TO_REFETCH })

    const pagesToRefetch = res.data.listItemPagesToRefetch

    // Is the current page in the list of pages to be refetched ?
    if (pagesToRefetch.includes(page)) {
      console.log('refetching page ' + page)

      // Create query with the network-only fetch policy. This is the trick...
      // Because our initial  query to the server had a fetchPolicy of 'cache-first' this latest 
      // query will save it’s data in to the place of the initial query. 
      // The network-only setting we've used for this query will not be remembered. 
      // So if we leave and come back to this page, it will grab the data from the cache. 
      // Unless we set it to an empty array again!
      this.fetchItems('network-only')
      
      // Remove current page from array of pages to be refetched in cache
      client.writeData({
        data: {
          itemPagesToRefetch: pagesToRefetch.filter(p => p !== page),
        }
      })

      return
    }

    // Otherwise, create a regular query that will either grab from cache or 
    // from network - only if the page hasn't been loaded before!
    console.log('either first fetch or fetching from cache for page ' + page)
    this.fetchItems()
  }

  fetchItems = async (fetchPolichy = 'cache-first') => {
    const { router, client } = this.props
    const page = currentPageFromRouter(router)

    try {
      const newItems = await client.query({ 
        query: GET_LIST_ITEMS_QUERY,
        variables: { skip: ((page - 1) * perPage) },
        fetchPolicy: fetchPolichy
      })

      client.writeData({
        data: {
          lastListItemPageLoaded: page,
        }
      })
      
      this.setState({
        loading: false,
        listItems: newItems.data.listItems,
      })
      
    } catch (errr) {
      console.log('error')
      this.setState({ 
        loading: false,
        error: errr
      })
    }
  }

  render() {
    // REFACTOR make sure to add || 1 on starter files
    const page = currentPageFromRouter(this.props.router)
    const { listItems, error, loading } = this.state

    if(error) return console.log(error) || <div/>
     
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
          : <ListItems listItems={listItems}/>}
        
        <Pagination />
      </div>
    )
  }
}

export default withRouter(Index)