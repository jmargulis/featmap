import {Actions, ActionTypes} from "./actions";
import { filterBarState } from "../../core/misc";

export interface State {
    items: filterBarState[]
}

export const initialState: State = {
    items: []
}

export function reducer(state: State = initialState, action: Actions) {
    switch (action.type) {
        case ActionTypes.SET_FILTER: {
            const ms = action.payload
            return {
                ...state,
                items: [...state.items, ms]
            }
        }

        default:
            return state
    }
}

export { reducer as filterReducer }