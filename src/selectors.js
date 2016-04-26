import { createSelector } from 'reselect'

const rawState = state => state

const selector = createSelector(
  rawState,
  (state) => {
    return {...state}
  }
)

export default selector
