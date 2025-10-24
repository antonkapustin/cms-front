import { Component, DestroyRef, inject } from '@angular/core';
import { Input } from '../../../ui/form/input/input';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Button } from '../../../ui/button/button';
import { AuthService } from '../../../services/auth.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { RouterService } from '../../../services/router';

@Component({
  selector: 'app-login-form',
  standalone: true,
  imports: [Input, ReactiveFormsModule, Button],
  templateUrl: './login-form.html',
  styleUrl: './login-form.scss',
})
export class LoginForm {
  private _authService = inject(AuthService);
  private _routerService = inject(RouterService);
  private _destroyRef = inject(DestroyRef);

  loginForm = new FormGroup({
    username: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
    password: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
  });

  get formValue(): { username: string; password: string } {
    return this.loginForm.value as { username: string; password: string };
  }

  login(): void {
    if (this.loginForm.valid) {
      this._authService
        .login(this.formValue)
        .pipe(takeUntilDestroyed(this._destroyRef))
        .subscribe({
          next: () => this._routerService.navigateTo('/dashboard'),
        });
    }
  }

  signup(): void {
    if (this.loginForm.valid) {
      this._authService
        .signup(this.formValue)
        .pipe(takeUntilDestroyed(this._destroyRef))
        .subscribe();
    }
  }
}
