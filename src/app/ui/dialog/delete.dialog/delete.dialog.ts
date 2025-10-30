import { Component, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { Button } from "../../button/button";

@Component({
  selector: 'app-delete.dialog',
  standalone: true,
  imports: [MatDialogModule, Button],
  templateUrl: './delete.dialog.html',
  styleUrl: './delete.dialog.scss'
})
export class DeleteDialog {
   private readonly _dialogRef = inject(MatDialogRef);
  data: {title: string, text: string} = inject(MAT_DIALOG_DATA);

  onClose(value: boolean): void {
    this._dialogRef.close(value);
  }
}
