import { Component, inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { Input } from '../../form/input/input';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Button } from '../../button/button';
import { CurrencyService } from '../../../services/currency.service';
import { AutocompleteComponent } from '../../form/autocomplete.component/autocomplete.component';
import { AsyncPipe } from '@angular/common';
import { map, tap } from 'rxjs';

@Component({
  selector: 'app-store.component',
  standalone: true,
  imports: [MatDialogModule, Input, ReactiveFormsModule, Button, AutocompleteComponent, AsyncPipe],
  templateUrl: './store.component.html',
  styleUrl: './store.component.scss'
})
export class StoreComponent implements OnInit {
  private readonly _dialogRef = inject(MatDialogRef);
  private readonly _currencyService = inject(CurrencyService);
  readonly data = inject(MAT_DIALOG_DATA);

  currencies$ = this._currencyService.getAllCurrencies().pipe(map((value) => value.map((item, index )=> ({name: item.code, id: index}))));

  storeForm = new FormGroup({
    name: new FormControl('',[Validators.required]),
    currency: new FormControl('',[Validators.required]),
  })

  ngOnInit(): void {
    // this.storeForm.get('currency')?.valueChanges.pipe(tap(console.log)).subscribe()
  }

  onClose():void {
    const value = this.storeForm.value;

    this._dialogRef.close(this.data ? {id: this.data.id, ...value} : value);
  }
}
