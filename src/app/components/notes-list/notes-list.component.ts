import {ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';
import {defaultNote, Note} from '../../models/note.interface';
import {State} from '../../store/app.reducer';
import {Store} from '@ngrx/store';
import {RemoveNote} from '../../store/note.actions';

@Component({
  selector: 'app-notes-list',
  templateUrl: './notes-list.component.html',
  styleUrls: ['./notes-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NotesListComponent implements OnInit {

  @Input() note: Note | undefined = defaultNote();
  constructor(private store: Store<State>) { }

  ngOnInit(): void {
  }

  deleteNote() {
    if (this.note) {
      this.store.dispatch(new RemoveNote(this.note.timestamp));
    }
  }

}
