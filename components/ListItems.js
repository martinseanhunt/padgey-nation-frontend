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
  onUpdate = cache => {
    // Call our helper function to delete item from cache
    deleteListItemsFromCache(cache)

    // Deleting the item in this way doesn't trigger a re
    // render of our Index.js component so we have to call
    // refetch which is given to us by our Query component
    // and passed down from Index.js via props
    this.props.refetch()
  }

  render() {
    const { listItems } = this.props

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
              update={this.onUpdate}
              // Don't forget to refetch the pagination data!
              refetchQueries={[ { query: LIST_ITEMS_CONNECTION_QUERY } ]}
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