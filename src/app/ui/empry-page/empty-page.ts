import { Component, input, output } from '@angular/core';
import { Button } from '../button/button';

@Component({
  selector: 'app-empty-page',
  standalone: true,
  imports: [Button],
  templateUrl: './empty-page.html',
  styleUrl: './empty-page.scss'
})
export class EmptyPageComponent {
  readonly img = input.required<string>();
  readonly title = input<string>();
  readonly subtitle = input<string>();
  readonly buttonText = input<string>('');

  buttonClick = output<void>();

  onButtonClick():void {
    this.buttonClick.emit();
  }
}
