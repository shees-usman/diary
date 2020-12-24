// Angular Imports
import { Component, Inject } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-add-note-dialog',
  templateUrl: './add-note-dialog.component.html',
  styleUrls: ['./add-note-dialog.component.scss']
})
export class AddNoteDialogComponent {

  // Set current time to use as default value while creating note
  currentTime = new Date();

  // Note form to handle note creation values
  noteForm = new FormGroup({
    title: new FormControl('', [ Validators.required ]),
    time: new FormControl(
      `${this.currentTime.getHours().toString().padStart(2, '0')}:${this.currentTime.getMinutes().toString().padStart(2, '0')}:${this.currentTime.getSeconds().toString().padStart(2, '0')}`,
      // Validate pattern to be xx:yy:zz where xx can be upto 24, yy and zz can be upto 59
      [Validators.pattern('^([0-1]?[0-9]|2[0-3]):[0-5][0-9]:[0-5][0-9]$')]),
    desc: new FormControl('', [ Validators.maxLength(500) ]),
    // FormArray for dynamic attachments in form
    attachments: new FormArray([])
  });

  constructor(
    // Dialog Ref for close callback
    public dialogRef: MatDialogRef<AddNoteDialogComponent>,
    // Dialog data injector
    @Inject(MAT_DIALOG_DATA) public data: { date: string }
  ) { }

  /**
   * Getter to get attachment form controls
   */
  get attachments() {
    return this.noteForm.get('attachments') as FormArray;
  }

  /**
   * Push new form control for each new attachment created
   */
  addAttachment() {
    this.attachments.push(new FormGroup({
      type: new FormControl('url', [ Validators.required, Validators.pattern('^(url|img)$') ]),
      desc: new FormControl('', [ Validators.required, Validators.maxLength(100) ]),
      value: new FormControl('', [ Validators.required ])
    }));
  }

  /**
   * Save note callback to save note to store.
   */
  saveNote() {
    if (!this.noteForm.valid) {
      return;
    }
    const dataToSave = this.noteForm.getRawValue();
    dataToSave['timestamp'] = this.data.date + ' ' + dataToSave['time'];
    delete dataToSave['time'];
    this.dialogRef.close({ status: true, value: dataToSave });
  }

  /**
   * File Input handler to handler image read to base64
   * @param event
   * @param toBind
   */
  fileChanged(event: any, toBind: any) {
    const file = event.target.files[0];
    const myReader = new FileReader();

    myReader.onloadend = (e) => {
      if (toBind) {
        toBind.setValue(myReader.result ? myReader.result : '');
      }
    };
    myReader.readAsDataURL(file);
  }

}
