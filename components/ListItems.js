import React, { Component } from 'react'
import { Mutation } from 'react-apollo'
import gql from 'graphql-tag'

import { FaTrashAlt } from 'react-icons/fa'
import { PER_PAGE } from '../config/config'
import { GET_LIST_ITEMS_QUERY } from './Index'
import { LIST_ITEMS_CONNECTION_QUERY } from './Pagination'

const DELETE_LIST_ITEM_MUTATION = gql`
  mutation DELETE_LIST_ITEM_MUTATION($id: ID!) {
    deleteListItem(id: $id) {
      id
      title
    }
  }
`

class ListItems extends Component {
  update = async (cache, payload) => {
    // This function fires once the DELETE_LIST_ITEM_MUTATION is complete

    // Get the skip value for the current page so we can read the relevant
    // query from our cache. I've passed down page from Index.js and imported
    // perPage from our config file
    const queryVars = { skip: (this.props.page - 1) * PER_PAGE }

    // read cache for the page we need to change, GET_LIST_ITEMS_QUERY 
    // imported from Index.js
    const data = cache.readQuery({ query: GET_LIST_ITEMS_QUERY, variables: queryVars })

    // Filter the deleted ListItem out of the cached data - server returns deleted ListItem
    data.listItems = data.listItems.filter(i => i.id !== payload.data.deleteListItem.id)

    console.log(data)

    // Write the current pages query with the deleted item filtered back to cache
    await cache.writeQuery({ query: GET_LIST_ITEMS_QUERY, data: data, variables: queryVars })

    // Refetch the query for the current page - refetch is coming from the Query in Index.js
    // and I've passed it down -- There's a bug in the current version of Apollo which is why
    // we have to do this. For some reason refetchPage doesn't remember the variables like it
    // says it should in the docs, so we're passing the variables manually.
    this.props.refetch({ variables: queryVars })

    // Remember that when using refetch() like this you need to handle the loading state 
    // for refetching differently than usual... see: 
    // https://www.apollographql.com/docs/react/essentials/queries.html#loading
  }
  
  render() {
    return (
      <div>
        {this.props.listItems.map((listItem) => (
          <div 
            key={listItem.id}
            className='list-item'
          >
            {listItem.title.length > 100 
              ? listItem.title.substring(0,70) + '...'
              : listItem.title}
            <Mutation 
              mutation={DELETE_LIST_ITEM_MUTATION} 
              // refetch the pagination data to update the item count / pages 
              // imported from Pagination.js
              refetchQueries={[{ query: LIST_ITEMS_CONNECTION_QUERY }]}
              variables={{ id: listItem.id }}
              update={this.update}
              >
              {(deleteListItem, {error, loading}) => {
                if(error) console.log(error)

                return (
                  <button 
                    onClick={() => confirm('Are you sure?') && deleteListItem()}
                    className="delete"  
                  >
                    <FaTrashAlt />
                  </button>
                )
              }}
            </Mutation>
          </div>
        ))}
      </div>
    )
  }
}

export default ListItems