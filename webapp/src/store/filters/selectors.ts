import { AppState } from '..'
import { createSelector } from 'reselect'

const getFilterState = ((state: AppState) => state.filter)

export const filter = createSelector(getFilterState, s => {
    return s.items.slice(-1).pop()
})