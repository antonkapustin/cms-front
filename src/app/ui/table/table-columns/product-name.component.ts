import { TitleCasePipe } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-product-name.component',
  imports: [TitleCasePipe],
  template: `
    <div class="product-name__container">
      <div class="product-name__img-box">
        <img class="product-name__img" [src]="img" alt="product" />
      </div>
      <div class="product-name__text-box">
        <span class="product-name__title">{{ name | titlecase }}</span>
      </div>
    </div>
  `,
  styles: `
    .product-name__container {
      display: flex;
      align-items: center;
      gap: 10px;
    }
    .product-name__img-box {
      position: relative;
      width: 50px;
      height: 50px;
    }
    .product-name__img {
      position: absolute;
      width: 100%;
      height: 100%;
      object-fit: contain;
    }
  `,
})
export class ProductNameComponent {
  @Input() name!: string;
  @Input() img!: string;
}
