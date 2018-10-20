import { PER_PAGE } from '../config'

export default (totalCount) => {
  // using or 1 incase the count is 0!
  const count = totalCount || 1
  return Math.ceil(count / PER_PAGE)
}