import { Component, inject, OnInit } from '@angular/core';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { Button } from '../../button/button';
import { Input } from '../../form/input/input';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AutocompleteComponent } from '../../form/autocomplete.component/autocomplete.component';
import { TextareaComponent } from '../../form/textarea.component/textarea.component';
import { CategoryService } from '../../../services/category.service';
import { AsyncPipe } from '@angular/common';
import { map } from 'rxjs';

@Component({
  selector: 'app-new-product.component',
  standalone: true,
  imports: [
    MatDialogModule,
    Button,
    Input,
    ReactiveFormsModule,
    AutocompleteComponent,
    TextareaComponent,
    AsyncPipe
  ],
  templateUrl: './new-product.component.html',
  styleUrl: './new-product.component.scss',
})
export class NewProductComponent {
  private readonly _dialogRef = inject(MatDialogRef);
  private readonly _categoryService = inject(CategoryService);

  newProductForm = new FormGroup({
    title: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
    description: new FormControl(''),
    price: new FormControl<number>(0, {
      nonNullable: true,
      validators: [Validators.required],
    }),
    code: new FormControl(''),
    categoryName: new FormControl(''),
  });

  categoryOptions =
    this._categoryService.getAllCategories().pipe(
      map((value) =>
        value.map((item) => ({
          id: item.categoryId,
          name: item.name,
        }))
      )
    );

  onClose(): void {
    if (this.newProductForm.invalid) return;
    const formValue = this.newProductForm.getRawValue();
    const value = {
      ...formValue,
      currency: 'USD',
      price: +formValue.price,
    };

    this._dialogRef.close(value);
  }
}
