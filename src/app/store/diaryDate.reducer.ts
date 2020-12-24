import {createFeatureSelector, createSelector} from '@ngrx/store';
import {ADD_NOTE_TO_DATE, REMOVE_DATE, REMOVE_NOTE_FROM_DATE} from './diaryDate.actions';
import {DiaryDate} from '../models/diaryDate.interface';

// Initialize State
const initialState: DiaryDate = {} ;

export function diaryDateReducer(state = initialState, action: any): DiaryDate {
  switch (action.type) {

    case ADD_NOTE_TO_DATE:
      return {
        ...state,
        [action.noteId.split(' ')[0]]: [ ...(state[action.noteId.split(' ')[0]] ? state[action.noteId.split(' ')[0]] : []), action.noteId ]
      };

    case REMOVE_NOTE_FROM_DATE: {
      // Get date from note id as noteId is timestamp of note
      const date = action.noteId.split(' ')[0];
      const tempRemovedItem = state[date].filter(item => item !== action.noteId);
      const stateClone = { ...state }; // since state is immutable delete wouldnt work with state itself
      // so copying to overcome that problem
      if (tempRemovedItem.length <= 0) { // If no remaining notes for a date remove date from store
        delete stateClone[date];
      } else {
        stateClone[date] = [ ...tempRemovedItem ];
      }
      return stateClone;
    }

    case REMOVE_DATE: {
      const stateClone = { ...state };
      delete stateClone[action.dateId];
      return stateClone;
    }

    default:
      return state;
  }
}

// Selectors for DiaryDate Model
export const getDiaryDateState = createFeatureSelector<DiaryDate>('diaryDate');
export const getDiaryDateById = () => createSelector(
  getDiaryDateState,
  (state: DiaryDate, props: { id: string }): string[] => state[props.id]
);
