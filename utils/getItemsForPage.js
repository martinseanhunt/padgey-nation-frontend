import gql from 'graphql-tag'

import { PER_PAGE } from '../config/config'

const GET_LIST_ITEMS_QUERY = gql`
  query GET_LIST_ITEMS_QUERY($skip: Int = 0, $first: Int = ${PER_PAGE}) {
    listItems(skip: $skip, first: $first) {
      id
      title
    }
  }
`

const GET_PAGES_TO_REFETCH = gql`
  {
    pagesToRefetch @client
  }
`

export default async (pageFromRouter, client) => {
  // initialize data to be written to cache
  const cacheData = {}

  // Catch any errors from cache or server
  try {
    // Set loading state in local cache
    client.writeData({ data: { loadingPage: true } })

    // Check local cache for array of pagesToRefetch
    const pages = client.readQuery({ query: GET_PAGES_TO_REFETCH })
    const pagesToRefetch = pages.pagesToRefetch

    // Properly format the page number given to this function
    // Next Router returns a string and we never want it to be 0
    const page = parseInt(pageFromRouter) || 1

    // See if the page we want to query is in the returned array
    const refetchThisPage = pagesToRefetch.includes(page)

    // Set skip variable to be sent with Queries
    const variables = { skip: ((page - 1) * PER_PAGE) }

    // If the current page is in the array of pages to refetch then
    // Send the query with the network-only fetch policy, forcing the data 
    // to be grabbed from our back end. Otherwise, allow the data to come
    // from the cahce if we have it already, or the back end if we don't
    const { data: { listItems } } = refetchThisPage
      ? await client.query({ 
          query: GET_LIST_ITEMS_QUERY,
          variables,
          fetchPolicy: 'network-only'
        })

      : await client.query({ 
          query: GET_LIST_ITEMS_QUERY,
          variables
        })

    // Remove page queried from pages to be refetched if it's in there
    // Don't want to run filter if we don't need to!
    if(refetchThisPage) cacheData.pagesToRefetch = pagesToRefetch.filter(p => p !== page)

    // Set the returned list items to be rendered 
    cacheData.listItemsToRender = listItems

  } catch (e) {
    // put error on response object
    cacheData.loadingError = e
  }

  // We've updated the page now so set this to false
  cacheData.updateCurrentPage = false

  // Set loading to false
  cacheData.loadingPage = false

  // Write data back to cache and return
  return client.writeData({ data: cacheData })
}