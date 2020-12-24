// ANgular Imports
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// Component Imports
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
// Environment Import
import { environment } from '../environments/environment';
// Store Imports
import { StoreModule } from '@ngrx/store';
import { reducers } from './store/app.reducer';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import {metaReducers} from './store/app.meta-reducer';
import {EffectsModule} from '@ngrx/effects';
import {NoteEffects} from './store/note.effects';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    StoreModule.forRoot(reducers, { metaReducers }),
    !environment.production ? StoreDevtoolsModule.instrument() : [],
    EffectsModule.forRoot([
      NoteEffects
    ]),
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
