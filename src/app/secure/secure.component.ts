import { Component, OnDestroy, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { State } from '../store/app.reducer';
import { getDrawerOpenState } from '../store/view.reducer';
import {Subject} from 'rxjs';
import {SetDrawer, ToggleDrawer} from '../store/view.actions';

@Component({
  selector: 'app-secure',
  templateUrl: './secure.component.html',
  styleUrls: ['./secure.component.scss']
})
export class SecureComponent {

  // Drawer state watcher
  drawerState$ = this.store.pipe(select(getDrawerOpenState));

  constructor(private store: Store<State>) { }

  /**
   * Close the drawer
   */
  closeDrawer() {
    this.store.dispatch(new SetDrawer(false));
  }

  /**
   * Export all store data as JSON
   */
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

}
