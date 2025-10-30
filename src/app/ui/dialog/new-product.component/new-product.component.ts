import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
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
import { filter, map, switchMap, tap } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { DeleteDialog } from '../delete.dialog/delete.dialog';
import { ProductService } from '../../../services/product.service';

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
    AsyncPipe,
  ],
  templateUrl: './new-product.component.html',
  styleUrl: './new-product.component.scss',
})
export class NewProductComponent implements OnInit {
  private readonly _dialogRef = inject(MatDialogRef);
  private readonly _categoryService = inject(CategoryService);
  private readonly _productService = inject(ProductService);
  private readonly _destroyRef = inject(DestroyRef);
  private readonly _dialog = inject(MatDialog);
  readonly data = inject(MAT_DIALOG_DATA);

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

  categoryOptions = this._categoryService.getAllCategories().pipe(
    map((value) =>
      value.map((item) => ({
        id: item.categoryId,
        name: item.name,
      }))
    )
  );

  ngOnInit(): void {
    if(this.data) {
      this._patchValue()
    }
  }

  onRemoveCategory(id: number): void {
    this._dialog
      .open(DeleteDialog, {
        data: {
          title: 'Delete category',
          text: 'If you delete category, all products inside this category will be deleted. Are you sure?',
        },
      })
      .afterClosed()
      .pipe(
        filter(data => data),
        switchMap(() => this._categoryService.deleteCategory(id)),
        tap(() => this._productService.refetchAllProducts()),
        tap(() => this._dialogRef.close()),
        takeUntilDestroyed(this._destroyRef)
      ).subscribe()
  }

  onClose(): void {
    const formValue = this.newProductForm.getRawValue();
    const value = {
      ...formValue,
      currency: 'USD',
      price: +formValue.price,
    };

    this._dialogRef.close(this.data ? {id: this.data.id, ...value} : value);
  }

  private _patchValue(): void {
    const data = {
      title: this.data.product.name,
      description: this.data.description,
      price: this.data.price,
      code: this.data.product.code,
      categoryName: this.data.category.name
    }

    this.newProductForm.patchValue(data);
  }
}
