import { Component, effect, inject, input, signal } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import {
  FormGroupDirective,
  FormControl,
  AbstractControl,
  ReactiveFormsModule,
} from '@angular/forms';
import { TitleCasePipe } from '@angular/common';

@Component({
  selector: 'app-input',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    TitleCasePipe,
    ReactiveFormsModule
  ],
  templateUrl: './input.html',
  styleUrl: '../form.scss',
})
export class Input {
  private _parentForm = inject(FormGroupDirective, {
    optional: true,
    host: true,
  });
  readonly label = input<string>();
  readonly controlName = input.required<string>();
  readonly control = input<FormControl>();
  readonly type = input<string>('');

  formControl = signal(new FormControl(''));

  constructor() {
    effect(() => {
      this.formControl.set(
        this.control() ||
          (this._parentForm?.form.get(this.controlName()) as FormControl)
      );
    });
  }

  isRequired(): boolean {
    const validator = this.formControl().validator;
    return validator ? validator({} as AbstractControl)?.['required'] : false;
  }
}
