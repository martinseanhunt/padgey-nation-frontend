import React, { Component } from 'react'
import { Mutation } from 'react-apollo'
import gql from 'graphql-tag'
import { FaTrashAlt } from 'react-icons/fa'

const DELETE_LIST_ITEM_MUTATION = gql`
  mutation DELETE_LIST_ITEM_MUTATION($id: ID!) {
    deleteListItem(id: $id) {
      id
      title
    }
  }
`

class ListItems extends Component {
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
              variables={{ id: listItem.id }}
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