/**
 * Root level reducer to map
 * individual reducers to object
 */
import { ActionReducerMap } from '@ngrx/store';

import {notesReducer, NoteState} from './note.reducer';
import {View} from '../models/view.interface';
import {viewReducer} from './view.reducer';
import {DiaryDate} from '../models/diaryDate.interface';
import {diaryDateReducer} from './diaryDate.reducer';

// Define State object
export interface State {
  view: View;
  diaryDate: DiaryDate;
  notes: NoteState;
}

// Define mapping of reducers to keys in State
export const reducers: ActionReducerMap<State> = {
  view: viewReducer,
  diaryDate: diaryDateReducer,
  notes: notesReducer
};
