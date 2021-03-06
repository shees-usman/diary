import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { select, Store } from '@ngrx/store';
import {State} from './app.reducer';
import {ADD_NOTE, AddNote, REMOVE_NOTE, RemoveNote} from './note.actions';
import {AddNoteToDate, RemoveNoteFromDate} from './diaryDate.actions';
import {of} from 'rxjs';
import {switchMap} from 'rxjs/operators';

@Injectable()
export class NoteEffects {

  constructor(private actions$: Actions, private store: Store<State>) {
  }

  /**
   * Effect to add note to date each time note is added to store
   */
  @Effect()
  add$ = this.actions$.pipe(
    ofType(ADD_NOTE),
    switchMap((action: AddNote) => {
      return of(new AddNoteToDate(action.payload.timestamp));
    })
  );

  /**
   * Effect to remove noteid from date once removed from store
   */
  @Effect()
  remove$ = this.actions$.pipe(
    ofType(REMOVE_NOTE),
    switchMap((action: RemoveNote) => {
      return of(new RemoveNoteFromDate(action.id));
    })
  );
}
