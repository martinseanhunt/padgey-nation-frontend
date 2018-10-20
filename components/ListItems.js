import React, { Component } from 'react'
import { Mutation, Query } from 'react-apollo'
import gql from 'graphql-tag'
import { FaTrashAlt } from 'react-icons/fa'

import { LIST_ITEMS_CONNECTION_QUERY } from './Pagination'
import setPagesToBeRefreshed from '../utils/setPagesToBeRefreshed'

const DELETE_LIST_ITEM_MUTATION = gql`
  mutation DELETE_LIST_ITEM_MUTATION($id: ID!) {
    deleteListItem(id: $id) {
      id
      title
    }
  }
`

class ListItems extends Component {
  update = cache => {
    // Here in the item list we know that the connection query will always be in 
    // our local cache so we can query the info directly from the cache in the update
    // function which will save the query from being run for every rendered item like
    // it would be if we used the Query component like in Create.js
    
    const { listItemsConnection: { count } } = cache.readQuery({ query: LIST_ITEMS_CONNECTION_QUERY })
    setPagesToBeRefreshed(cache, count)
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
                    disabled={loading}
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