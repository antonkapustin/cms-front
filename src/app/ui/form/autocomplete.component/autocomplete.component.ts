import { Component, effect, inject, input, signal } from '@angular/core';
import { FormControl, FormGroupDirective, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { TitleCasePipe } from '@angular/common';

@Component({
  selector: 'app-autocomplete',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatAutocompleteModule,
    TitleCasePipe
  ],
  templateUrl: './autocomplete.component.html',
  styleUrls: ['../form.scss'],
})
export class AutocompleteComponent {
  private _parentForm = inject(FormGroupDirective, {
    optional: true,
    host: true,
  });
  readonly label = input<string>();
  readonly controlName = input.required<string>();
  readonly control = input<FormControl>();
  readonly options = input.required<{id: number, name: string}[]>();
  readonly placeholder = input<string>('');

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
