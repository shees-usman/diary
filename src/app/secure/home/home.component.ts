// Angular Imports
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
// Store Imports
import { Store } from '@ngrx/store';
import { State } from '../../store/app.reducer';
import { ToggleDrawer } from '../../store/view.actions';
import { AddNote } from '../../store/note.actions';
import { getNotesByDate } from '../../store/note.reducer';
// RxJS Imports
import { takeUntil } from 'rxjs/operators';
import { Observable, Subject } from 'rxjs';
// Interface Imports
import { Note } from '../../models/note.interface';
// Component Imports
import { AddNoteDialogComponent } from '../../components/add-note-dialog/add-note-dialog.component';

/**
 * Home Component to list, browser all notes
 * and trigger note creations
 */
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy{

  // Form control for date selector
  selectedDate = new FormControl(new Date());

  // unsubscribe subject to cleanly handle all subscription cleanups on component destruction
  ngUnsubscribe$: Subject<boolean> = new Subject<boolean>();

  // selected date notes observable to watch for all notes for selected date
  selectedDateNotes$: Observable<(Note | undefined)[]> = this.store.select(getNotesByDate(), { id: this.formattedDateString(new Date()) });

  constructor(private store: Store<State>, private dialog: MatDialog) {}

  /**
   * Setup selected date notes on component load
   */
  ngOnInit() {
    this.selectedDate.valueChanges.pipe(takeUntil(this.ngUnsubscribe$)).subscribe((value) => {
      this.selectedDateNotes$ = this.store.select(getNotesByDate(), { id: this.formattedDateString(value) });
    });
  }

  /**
   * Trigger addNote dialog
   */
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

  /**
   * Trigger drawer toggle
   */
  toggleDrawer() {
    this.store.dispatch(new ToggleDrawer());
  }

  /**
   * Cleanup subscriptions on destroy
   */
  ngOnDestroy() {
    this.ngUnsubscribe$.next(true);
    this.ngUnsubscribe$.complete();
  }

  /**
   * Date formatter to get consistent date format
   * @param date
   */
  formattedDateString(date: any) {
    return (1900 + date.getYear()) + '-' + (date.getMonth() + 1) + '-' + date.getDate();
  }

}
