import { TitleCasePipe } from '@angular/common';
import { Component, effect, inject, input, signal } from '@angular/core';
import { FormGroupDirective, FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-textarea',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, ReactiveFormsModule, TitleCasePipe],
  templateUrl: './textarea.component.html',
  styleUrl: '../form.scss'
})
export class TextareaComponent {
 private _parentForm = inject(FormGroupDirective, {
    optional: true,
    host: true,
  });
  readonly label = input<string>();
  readonly controlName = input.required<string>();
  readonly control = input<FormControl>();
  readonly placeholder = input<string>("");

  formControl = signal(new FormControl(''));

  constructor() {
    effect(() => {
      this.formControl.set(
        this.control() ||
          (this._parentForm?.form.get(this.controlName()) as FormControl)
      );
    });
  }
}
