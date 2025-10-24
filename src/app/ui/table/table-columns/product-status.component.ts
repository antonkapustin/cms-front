import { Component, Input, input } from '@angular/core';

@Component({
  selector: 'app-product-status.component',
  imports: [],
  template: '<span>{{ status }}</span>',
})
export class ProductStatusComponent {
  @Input() status!: string;
}
