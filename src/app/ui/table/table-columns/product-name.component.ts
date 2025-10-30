import { TitleCasePipe } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  standalone: true,
  imports: [TitleCasePipe],
  template: `
    <div class="product-name__container">
      <div class="product-name__img-box">
        <img class="product-name__img" [src]="img" alt="product" />
      </div>
      <div class="product-name__text-box">
        <span class="product-name__title">{{ name | titlecase }}</span>
        <span class="product-name__subtitle">{{ code | titlecase }}</span>
      </div>
    </div>
  `,
  styles: `
    .product-name__container {
      display: flex;
      align-items: center;
      gap: 10px;
    }
    .product-name__text-box {
      display: flex;
      flex-direction: column;
      gap: 10px;
    }
    .product-name__title {
      font-size: 20px;
      font-weight: 500;
    }
    .product-name__subtitle {
      font-size: 14px;
      font-weight: 200;
      color: var(--color-gray);
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
  @Input() code!: string;
}
