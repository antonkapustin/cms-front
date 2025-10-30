import { Component, Input, input } from '@angular/core';

@Component({
  standalone: true,
  imports: [],
  template: '<span>{{ status }}</span>',
})
export class ProductStatusComponent {
  @Input() status!: string;
}
