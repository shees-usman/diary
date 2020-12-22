import {createEntityAdapter, Dictionary} from '@ngrx/entity';

import { EntityState } from '@ngrx/entity';


import {
  ADD_NOTE, UPDATE_NOTE, REMOVE_NOTE, NoteActions
} from './note.actions';
import {Note} from '../models/note.interface';
import {createFeatureSelector, createSelector} from '@ngrx/store';
import {View} from '../models/view.interface';
import {getDrawerOpen} from './view.reducer';
import {getDiaryDateById, getDiaryDateState} from './diaryDate.reducer';
import {DiaryDate} from '../models/diaryDate.interface';


const noteAdapter = createEntityAdapter<Note>({
  selectId: (note: Note) => note.timestamp, // Set id as node Id
  sortComparer: false, // Disable sorting
});

export interface NoteState extends EntityState<Note> {}


// Initialize State
const initialState: NoteState = noteAdapter.getInitialState({});

export function notesReducer(state = initialState, action: any): NoteState {
  switch (action.type) {

    case ADD_NOTE:
      return noteAdapter.upsertOne(action.payload, state);

    case UPDATE_NOTE:
      return noteAdapter.updateOne({
        id: action.id,
        changes: action.payload
      }, state);

    case REMOVE_NOTE:
      return noteAdapter.removeOne(action.id, state);

    default:
      return state;
  }
}

// Define Selectors for Notes
export const {
  selectIds: selectAllNoteIds,
  selectEntities: selectAllNoteEntities,
  selectAll: selectAllNotes,
  selectTotal: selectTotalNotes
} = noteAdapter.getSelectors();

export const getNoteState = createFeatureSelector<NoteState>('notes');

export const getNoteEntities = createSelector(
  getNoteState,
  selectAllNoteEntities
);
export const getNoteById = () => createSelector(
  getNoteEntities,
  (entities: Dictionary<Note>, props: any) => entities[props.id]
);
export const getNotesById = () => createSelector(
  getNoteEntities,
  (entities: Dictionary<Note>, props: any) => props.ids.map((id: string) => entities[id])
);
export const getNotesByDate = () => createSelector(
  getNoteEntities,
  getDiaryDateState,
  (notes: Dictionary<Note>, dates: DiaryDate, props: any) => dates[props.id] ? dates[props.id]
    .map(noteId => notes[noteId])
    .filter(note => note !== undefined) : []
);

