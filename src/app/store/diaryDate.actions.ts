// Store Import
import {Action} from '@ngrx/store';

// Define Action Identifiers
export const ADD_NOTE_TO_DATE = '[DATE] Add Note To Date';
export const REMOVE_NOTE_FROM_DATE = '[DATE] Remove Note From Date';
export const REMOVE_DATE = '[DATE] Remove Date';

// Defining Diary Date Actions
export class AddNoteToDate implements Action {
  readonly type = ADD_NOTE_TO_DATE;
  constructor (public noteId: string) {}
}

export class RemoveNoteFromDate implements Action {
  readonly type = REMOVE_NOTE_FROM_DATE;
  constructor (public noteId: string) {}
}

export class RemoveDate implements Action {
  readonly type = REMOVE_DATE;
  constructor (public dateId: string) {}
}

// Defining type for View Actions union
export type DiaryDateActions = AddNoteToDate | RemoveNoteFromDate | RemoveDate;
