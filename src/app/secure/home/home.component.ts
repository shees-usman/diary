import {Component, OnDestroy, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {State} from '../../store/app.reducer';
import {ToggleDrawer} from '../../store/view.actions';
import {FormControl} from '@angular/forms';
import {takeUntil} from 'rxjs/operators';
import {Observable, Subject} from 'rxjs';
import {getNotesByDate} from '../../store/note.reducer';
import {Note} from '../../models/note.interface';
import {AddNote} from '../../store/note.actions';
import {AddNoteDialogComponent} from '../../components/add-note-dialog/add-note-dialog.component';
import {MatDialog} from '@angular/material/dialog';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy{

  selectedDate = new FormControl(new Date());
  ngUnsubscribe$: Subject<boolean> = new Subject<boolean>();
  selectedDateNotes$: Observable<(Note | undefined)[]> = this.store.select(getNotesByDate(), { id: this.formattedDateString(new Date()) });

  constructor(private store: Store<State>, private dialog: MatDialog) {}

  ngOnInit() {
    this.selectedDate.valueChanges.pipe(takeUntil(this.ngUnsubscribe$)).subscribe((value) => {
      this.selectedDateNotes$ = this.store.select(getNotesByDate(), { id: this.formattedDateString(value) });
    });
  }

  addNote() {
    const dialogRef = this.dialog.open(AddNoteDialogComponent, {
      data: {
        date: this.formattedDateString(this.selectedDate.value)
      },
      panelClass: 'add-note-dialog-panel'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result && result.status) {
        this.store.dispatch(new AddNote(result.value));
      }
    });
  }

  toggleDrawer() {
    this.store.dispatch(new ToggleDrawer());
  }

  ngOnDestroy() {
    this.ngUnsubscribe$.next(true);
    this.ngUnsubscribe$.complete();
  }

  formattedDateString(date: any) {
    return (1900 + date.getYear()) + '-' + (date.getMonth() + 1) + '-' + date.getDate();
  }

}
