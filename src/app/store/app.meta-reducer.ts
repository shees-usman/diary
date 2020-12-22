// NgRx Imports
import {ActionReducer, MetaReducer} from '@ngrx/store';
import {State} from './app.reducer';
import {environment} from '../../environments/environment';
import {localStorageSync} from 'ngrx-store-localstorage';

export function localStorageSyncReducer(reducer: ActionReducer<any>): ActionReducer<any> {
  return localStorageSync({keys: ['diaryDate', 'notes']})(reducer);
}

export const metaReducers: MetaReducer<State>[] = !environment.production ? [
  localStorageSyncReducer
] : [
  localStorageSyncReducer
];
