import { View } from '../models/view.interface';
import {SET_DRAWER_OPEN, TOGGLE_DRAWER_OPEN} from './view.actions';
import {createFeatureSelector, createSelector} from '@ngrx/store';

const initialState: View = { drawerOpen: true };

export function viewReducer(state = initialState, action: any ): View {
  switch (action.type) {

    case SET_DRAWER_OPEN:
      return {
        ...state,
        drawerOpen: action.payload
      };

    case TOGGLE_DRAWER_OPEN:
      return {
        ...state,
        drawerOpen: !state.drawerOpen
      };

    default: {
      return state;
    }
  }
}

// Selectors for View Model
export const getDrawerOpen = (state: View) => state.drawerOpen;

export const getViewState = createFeatureSelector<View>('view');
export const getDrawerOpenState = createSelector(
  getViewState,
  getDrawerOpen
);
