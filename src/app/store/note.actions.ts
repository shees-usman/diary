import {Action} from '@ngrx/store';
import {Note} from '../models/note.interface';

export const GET_NOTE = '[NOTES] Get Note';
export const ADD_NOTE = '[NOTES] Add Note';
export const UPDATE_NOTE = '[NOTES] Update Note';
export const REMOVE_NOTE = '[NOTES] Remove Note';

// Defining Note Actions
export class GetNote implements Action {
  readonly type = GET_NOTE;
  constructor (public id: (string | number)) {}
}

export class AddNote implements Action {
  readonly type = ADD_NOTE;
  constructor (public payload: Note) {}
}

export class UpdateNote implements Action {
  readonly type = UPDATE_NOTE;
  constructor (public id: string, public payload: Partial<Note>) {}
}

export class RemoveNote implements Action {
  readonly type = REMOVE_NOTE;
  constructor (public id: string) {}
}

// Defining type for Note Actions union
export type NoteActions = GetNote | AddNote | UpdateNote | RemoveNote;
