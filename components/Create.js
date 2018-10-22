import React, { Component } from 'react'
import { Mutation } from 'react-apollo'
import gql from 'graphql-tag'
import Router from 'next/router'

import { LIST_ITEMS_CONNECTION_QUERY } from './Pagination'
import { GET_LIST_ITEMS_QUERY } from './Index'

const CREATE_LIST_ITEM = gql`
  mutation CREATE_LIST_ITEM($title: String!) {
    createListItem(title: $title) {
      id
      title
    }
  }
`

class Create extends Component {
  state = {
    title: ''
  }

  update = async (cache, payload) => {
    // This function fires once the CREATE_LIST_ITEM is complete

    // We're always sending them back to page 1
    const queryVars = { skip: 0 }

    // read cache for the page we need to change, GET_LIST_ITEMS_QUERY 
    // imported from Index.js
    const data = cache.readQuery({ 
      query: GET_LIST_ITEMS_QUERY, variables: queryVars 
    })

    // add item at beginning of page 1 array
    const newData = {
      listItems: [payload.data.createListItem, ...data.listItems]
    }

    // Write the page 1 query with the new item 
    // to local cache
    await cache.writeQuery({ 
      query: GET_LIST_ITEMS_QUERY, data: newData, variables: queryVars 
    })
  }

  render() {
    return (
      <div>
        <header>
          <h2>Create List Item</h2>
          <p>Create a new Item</p>
        </header>

          <div className='list-item list-item--form'>
          <Mutation 
            mutation={CREATE_LIST_ITEM} 
            variables={{ title: this.state.title }}
            // remember to refetch trhe pagination data so we can update
            // the item count / pages
            refetchQueries={[{ query: LIST_ITEMS_CONNECTION_QUERY }]}
            update={this.update}
            onCompleted={() => Router.push('/') }
          >
            {(createListItem, {error, loading}) => {
              if(loading) return <p>Loading...</p>
              if(error) return alert(error)

              return (
                <>
                <label htmlFor="title">
                  Title: 
                  <input 
                    id="title" 
                    name="title"
                    onChange={e => this.setState({ title: e.target.value })}
                  />
                </label>

                <button onClick={createListItem}>Create Item</button>
                </>
              )
            }}
          </Mutation>
          </div>
      </div>
    )
  }
}

export default Create