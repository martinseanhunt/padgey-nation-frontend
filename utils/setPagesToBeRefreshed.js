import { PER_PAGE } from '../config/config'

export default async (cache, totalCount) => {  
  // Work out number of pages 
  // using or 1 incase the count is 0!
  const count = totalCount || 1
  const pages = Math.ceil(count / PER_PAGE)

  // Create array of all the page numbers
  const pagesArray = [...Array(pages)].map((page, i) => i + 1) 

  // Save that array to our local apollo cache
  cache.writeData({
  data: {
      pagesToRefetch: pagesArray,
      updateCurrentPage: true // This is how the page knows to update when we click back to a list page
    }
  })

}