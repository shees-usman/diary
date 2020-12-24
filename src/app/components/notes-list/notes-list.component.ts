// Angular Imports
import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
// Interface Imports
import { defaultNote, Note } from '../../models/note.interface';
// Store Imports
import { State } from '../../store/app.reducer';
import { Store } from '@ngrx/store';
import { RemoveNote } from '../../store/note.actions';

@Component({
  selector: 'app-notes-list',
  templateUrl: './notes-list.component.html',
  styleUrls: ['./notes-list.component.scss'],
  // Since component is pure change detection only needs to run for change in inputs
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NotesListComponent {

  // Input note to show date for, Default to empty values
  @Input() note: Note | undefined = defaultNote();

  constructor(private store: Store<State>) { }

  /**
   * Delete Note callback to trigger note deletion in store
   */
  deleteNote() {
    if (this.note) {
      this.store.dispatch(new RemoveNote(this.note.timestamp));
    }
  }

}
