import { Component, Input, linkedSignal, OnInit } from '@angular/core';

@Component({
  standalone: true,
  imports: [],
  template: `
    <div class="category__box">
      <div class="category__badge" [style.background-color]="color">
        <span class="category__name">{{ name }}</span>
      </div>
    </div>
  `,
  styles: `
    .category__box {
        display: flex;
    }
    .category__badge {
        color: var(--color-white);
        opacity: 0.8;
        width: fit-content;
        border-radius: 6px;
        padding: 10px 20px;
    }
  `,
})
export class CategoryComponent implements OnInit {
  @Input() id!: number;
  @Input() name!: string;

  color!: string;

  ngOnInit(): void {
    this.color = this._getColor();
  }

  private _getColor(): string {
    const str = String(this.name);
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      hash = str.charCodeAt(i) + ((hash << 5) - hash);
      hash = hash & hash;
    }
    let color = '#';
    for (let i = 0; i < 3; i++) {
      const value = (hash >> (i * 8)) & 0xff;
      color += ('00' + value.toString(16)).slice(-2);
    }
    return color;
  }
}
