import {Action} from '@ngrx/store';

export const SET_DRAWER_OPEN = '[VIEW] Set Drawer';
export const TOGGLE_DRAWER_OPEN = '[VIEW] Toggle Drawer';

// Defining View Actions
export class SetDrawer implements Action {
  readonly type = SET_DRAWER_OPEN;
  constructor (public payload: boolean) {}
}

export class ToggleDrawer implements Action {
  readonly type = TOGGLE_DRAWER_OPEN;
  constructor () {}
}

// Defining type for View Actions union
export type ViewActions = SetDrawer | ToggleDrawer;
