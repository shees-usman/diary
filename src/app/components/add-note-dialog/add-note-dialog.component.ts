import {Component, Inject, OnInit} from '@angular/core';
import {FormArray, FormControl, FormGroup, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-add-note-dialog',
  templateUrl: './add-note-dialog.component.html',
  styleUrls: ['./add-note-dialog.component.scss']
})
export class AddNoteDialogComponent implements OnInit {

  currentTime = new Date();
  noteForm = new FormGroup({
    title: new FormControl('', [ Validators.required ]),
    time: new FormControl(
      `${this.currentTime.getHours().toString().padStart(2, '0')}:${this.currentTime.getMinutes().toString().padStart(2, '0')}:${this.currentTime.getSeconds().toString().padStart(2, '0')}`,
      [Validators.pattern('^([0-1]?[0-9]|2[0-3]):[0-5][0-9]:[0-5][0-9]$')]),
    desc: new FormControl('', [ Validators.maxLength(500) ]),
    attachments: new FormArray([])
  });

  constructor(
    public dialogRef: MatDialogRef<AddNoteDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { date: string }
  ) { }

  ngOnInit(): void {
  }

  get noteFormControlsExceptAttachments() {
    return Object.keys(this.noteForm.controls).filter(name => name !== 'attachments');
  }

  get attachments() {
    return this.noteForm.get('attachments') as FormArray;
  }

  addAttachment() {
    this.attachments.push(new FormGroup({
      type: new FormControl('url', [ Validators.required, Validators.pattern('^(url|img)$') ]),
      desc: new FormControl('', [ Validators.required, Validators.maxLength(100) ]),
      value: new FormControl('', [ Validators.required ])
    }));
  }

  saveNote() {
    if (!this.noteForm.valid) {
      return;
    }
    const dataToSave = this.noteForm.getRawValue();
    dataToSave['timestamp'] = this.data.date + ' ' + dataToSave['time'];
    delete dataToSave['time'];
    this.dialogRef.close({ status: true, value: dataToSave });
  }

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
