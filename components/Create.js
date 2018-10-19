import React, { Component } from 'react'
import { Mutation } from 'react-apollo'
import gql from 'graphql-tag'
import { FaPlusSquare } from 'react-icons/fa'
import Router from 'next/router'

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

          <div className='list-item list-item--form'>
          <Mutation 
            mutation={CREATE_LIST_ITEM} 
            variables={{ title: this.state.title }}
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