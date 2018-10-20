import React, { Component } from 'react'
import { withRouter } from 'next/router'
import Link from 'next/link'
import { FaPlusSquare } from 'react-icons/fa'

import Pagination from './Pagination'
import ListItems from './ListItems'
import getItemsForPage from '../utils/getItemsForPage'

class Index extends Component {  

  // Load items for page on first load
  componentDidMount = () => {
    const { router, client } = this.props
    getItemsForPage(router.query.page, client)
  }

  componentDidUpdate = () => {
    const { router, client, updateCurrentPage } = this.props
    if (updateCurrentPage === true) {
      getItemsForPage(router.query.page, client)
    } 
  }

  onPageChange = (page) => {
    getItemsForPage(page, this.props.client)
  }

  render() {
    const { listItemsToRender, listItemsLoading, loadingError } = this.props
    if(loadingError) return console.log(loadingError) || <div/>
     
    return (
      <div>
        <header>
          <h2>List items</h2>
          <p>A simple list of listItems</p>

          <Link href='/create' >
            <a className="add-link"><FaPlusSquare /></a>
          </Link>
        </header>

        {listItemsLoading 
          ? <div className="loading-items"><p>Loading...</p></div> 
          : <ListItems listItems={listItemsToRender}/>}
        
        <Pagination onPageChange={this.onPageChange} />
      </div>
    )
  }
}

export default withRouter(Index)