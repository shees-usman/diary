import {Component, OnDestroy, OnInit} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {State} from '../store/app.reducer';
import {getDrawerOpenState} from '../store/view.reducer';
import {takeUntil} from 'rxjs/operators';
import {Subject} from 'rxjs';
import {SetDrawer, ToggleDrawer} from '../store/view.actions';

@Component({
  selector: 'app-secure',
  templateUrl: './secure.component.html',
  styleUrls: ['./secure.component.scss']
})
export class SecureComponent implements OnInit, OnDestroy {

  ngUnsubscribe$: Subject<boolean> = new Subject<boolean>();
  drawerState$ = this.store.pipe(select(getDrawerOpenState));
  constructor(private store: Store<State>) { }

  ngOnInit(): void {

  }

  closeDrawer() {
    this.store.dispatch(new SetDrawer(false));
  }

  exportAsJson() {
    const dataStr = 'data:text/json;charset=utf-8,' +
      encodeURIComponent('{ "notes": ' +
        localStorage.getItem('notes') + ',"diaryDate": ' +
        localStorage.getItem('diaryDate') + '}');
    const downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute('href',     dataStr);
    downloadAnchorNode.setAttribute('download',  'diary.json');
    document.body.appendChild(downloadAnchorNode);
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe$.next(true);
    this.ngUnsubscribe$.complete();
  }

}
