import React, { Component } from 'react'
import { Mutation, Query } from 'react-apollo'
import gql from 'graphql-tag'
import Router from 'next/router'

import { LIST_ITEMS_CONNECTION_QUERY } from './Pagination'
import setPagesToBeRefreshed from '../utils/setPagesToBeRefreshed'

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

  render() {
    return (
      <div>
        <header>
          <h2>Create List Item</h2>
          <p>Create a new Item</p>
        </header>

        <Query query={LIST_ITEMS_CONNECTION_QUERY}>
          {({data: { listItemsConnection }}) => (
            <div className='list-item list-item--form'>
            <Mutation 
              mutation={CREATE_LIST_ITEM} 
              variables={{ title: this.state.title }}
              refetchQueries={[{ query: LIST_ITEMS_CONNECTION_QUERY }]}
              update={(cache) => setPagesToBeRefreshed(cache, listItemsConnection.count)}
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

                  <button disabled={loading} onClick={createListItem}>Create Item</button>
                  </>
                )
              }}
            </Mutation>
            </div>
          )}
        </Query>
      </div>
    )
  }
}

export default Create




