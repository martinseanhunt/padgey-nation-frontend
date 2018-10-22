import React, { Component } from 'react'
import { Mutation } from 'react-apollo'
import gql from 'graphql-tag'
import { FaTrashAlt } from 'react-icons/fa'

import deleteListItemsFromCache from '../utils/deleteListItemsFromCache'
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
  onUpdate = (cache, itemId) => {
    deleteListItemsFromCache(cache)
    this.props.reloadCurrentPage(itemId)
  }

  render() {
    const { listItems, CURRENT_PAGE_QUERY } = this.props

    return (
      <div>
        {listItems && listItems.map((listItem) => (
          <div 
            key={listItem.id}
            className='list-item'
          >
            {listItem.title.length > 100 
              ? listItem.title.substring(0,70) + '...'
              : listItem.title}
            <Mutation 
              mutation={DELETE_LIST_ITEM_MUTATION} 
              variables={{ id: listItem.id }}
              update={deleteListItemsFromCache}
              refetchQueries={[
                // We need to manually refetch the query for the page we're on
                // Or the parnet component won't update and the Query won't run
                // We'll be left with an empty page
                { query: CURRENT_PAGE_QUERY },
                // Update pagination data
                { query: LIST_ITEMS_CONNECTION_QUERY }
              ]}
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