export default cache => {
  // Loop through all the data in our cache
  // And delete any items that start with "ListItem"
  // This empties the cache of all of our list items and 
  // forces a refetch of the data.
  console.log(cache.data)
  Object.keys(cache.data.data).forEach(key => 
    key.match(/^ListItem/) && cache.data.delete(key)
  )
}