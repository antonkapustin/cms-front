import { Component, input, output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [MatButtonModule, MatIconModule],
  templateUrl: './button.html',
  styleUrl: './button.scss',
})
export class Button {
  readonly label = input<string>();
  readonly buttonAppearanceType = input<'elevated' | 'outlined' | 'filled' | 'tonal' | ''>('');
  readonly icon = input<string>();
  readonly disabled = input<boolean>();
}
