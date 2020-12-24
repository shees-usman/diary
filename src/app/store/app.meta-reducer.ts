// Store Imports
import { ActionReducer, MetaReducer } from '@ngrx/store';
import { State } from './app.reducer';
// Environment Import
import { environment } from '../../environments/environment';
// 3rd Party Imports
import { localStorageSync } from 'ngrx-store-localstorage';

/**
 * Local Storage Sync reducer to syncu local storage
 * @param reducer
 */
export function localStorageSyncReducer(reducer: ActionReducer<any>): ActionReducer<any> {
  return localStorageSync({keys: ['diaryDate', 'notes']})(reducer);
}

/**
 * Set metareducers array
 */
export const metaReducers: MetaReducer<State>[] = !environment.production ? [
  localStorageSyncReducer
] : [
  localStorageSyncReducer
];
