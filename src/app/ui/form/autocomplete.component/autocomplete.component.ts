import {
  Component,
  effect,
  inject,
  input,
  OnInit,
  output,
  signal,
} from '@angular/core';
import {
  FormControl,
  FormGroupDirective,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { AsyncPipe, TitleCasePipe } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { map, Observable, of, startWith, switchMap, tap } from 'rxjs';
import { toObservable } from '@angular/core/rxjs-interop';

export interface Option {
  id: number;
  name: string;
}
@Component({
  selector: 'app-autocomplete',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatAutocompleteModule,
    TitleCasePipe,
    MatButtonModule,
    MatIconModule,
    AsyncPipe,
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
  readonly options = input.required<Option[]>();
  readonly placeholder = input<string>('');
  readonly removableOptions = input<boolean>();

  formControl = signal(new FormControl(''));
  options$ = toObservable(this.options);
  filterOptions$: Observable<Option[]> = this.options$;

  readonly removeOption = output<number>();

  constructor() {
    effect(() => {
      this.formControl.set(
        this.control() ||
          (this._parentForm?.form.get(this.controlName()) as FormControl)
      );

      this.filterOptions$ = this.formControl()?.valueChanges.pipe(
        startWith(''),
        switchMap((value) =>
          value
            ? this.options$?.pipe(
                map((options) =>
                  options.filter((option) =>
                    option.name.toLowerCase().includes(value.toLowerCase())
                  )
                ),
                startWith([])
              )
            : this.options$
        )
      );
    });
  }

  displayLabelFn = (id: number) => {
    const option = this.options().find((o) => o.id === id);
    return option?.name ?? '';
  };

  onRemoveOption(id: number): void {
    this.removeOption.emit(id);
  }
}
