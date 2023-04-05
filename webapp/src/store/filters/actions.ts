import { action } from 'typesafe-actions'
import {filterBarState} from "../../core/misc";

export enum ActionTypes {
    SET_FILTER = 'SET_FILTER',
}

export interface setFilter { type: ActionTypes.SET_FILTER, payload: filterBarState }
export const setFilterAction = (x: filterBarState) => action(ActionTypes.SET_FILTER, x)

export type Actions = setFilter
