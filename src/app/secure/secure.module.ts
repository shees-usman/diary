import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { SecureRModule } from './secure-routing.module';
import {NotesListComponent} from '../components/notes-list/notes-list.component';
import {MatExpansionModule} from '@angular/material/expansion';
import { SecureComponent } from './secure.component';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatNativeDateModule, MatOptionModule} from '@angular/material/core';
import {MatInputModule} from '@angular/material/input';
import {ReactiveFormsModule} from '@angular/forms';
import {ScrollingModule} from '@angular/cdk/scrolling';
import {MatDialogModule} from '@angular/material/dialog';
import {AddNoteDialogComponent} from '../components/add-note-dialog/add-note-dialog.component';
import {MatSelectModule} from '@angular/material/select';



@NgModule({
  declarations: [
    HomeComponent,
    NotesListComponent,
    AddNoteDialogComponent,
    SecureComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatExpansionModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatFormFieldModule,
    MatInputModule,
    MatDialogModule,
    MatSelectModule,
    MatOptionModule,
    ScrollingModule,
    SecureRModule
  ]
})
export class SecureModule { }
