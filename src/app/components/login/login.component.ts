import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { MatDividerModule } from '@angular/material/divider';

@Component({
  selector: 'app-login',
  changeDetection: ChangeDetectionStrategy.Default,
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    ReactiveFormsModule,
    MatDividerModule,
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);
  appVersion: string = '';
  form: FormGroup = this.formBuilder.group({
    username: ['', [Validators.required]],
    password: ['', [Validators.required]],
  });
  isVisible: boolean[] = [false, false];

  constructor(
    private router: Router,
    private formBuilder: FormBuilder
  ) 
  {}

  ngOnInit(): void {}

  changeVisibility(id: number) {
    this.isVisible[id] = !this.isVisible[id];
  }

  doLogin() {}


  doRegister() {
    this.router.navigate(['/create-account'], { replaceUrl: true, state: { registerDevice: true } })
  }

  changePassword(){
    this.router.navigate(['/change-password'], { replaceUrl: true, state: { registerDevice: true } })
  }
}
