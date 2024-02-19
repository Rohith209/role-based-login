import { Component, inject } from '@angular/core';
import { MaterialReferencesModule } from '../../material-references/material-references.module';
import {
  FormBuilder,
  NgForm,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { Router, RouterLink } from '@angular/router';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    MaterialReferencesModule,
    ReactiveFormsModule,
    ToastrModule,
    RouterLink,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  userService: UserService = inject(UserService);
  constructor(
    private fb: FormBuilder,
    private toastr: ToastrService,
    private router: Router
  ) {}

  loginForm = this.fb.group({
    email: this.fb.control(
      '',
      Validators.compose([Validators.email, Validators.required])
    ),
    password: this.fb.control('', Validators.required),
  });

  onLoginSubmit() {
    if (this.loginForm.valid) {
      this.userService.loginUser().subscribe((users: any) => {
        if (users) {
          try {
            let isValiduser = users.filter((user: any) => {
              if (user.email === this.loginForm.value.email) {
                if (user.password === this.loginForm.value.password) {
                  return true;
                } else {
                  return false;
                }
              } else {
                return false;
              }
            });
            if (isValiduser.length > 0) {
              sessionStorage.setItem('role', isValiduser[0].role);
              this.toastr.success('Form Valid', 'Success');
              this.loginForm.reset();
              this.router.navigate(['/dashboard']);
            } else {
              this.toastr.error('Invalid Credentials', 'Error');
            }
          } catch (error: any) {
            this.toastr.error(error, 'Error');
            this.loginForm.reset();
          }
        }
      });
    } else {
      this.toastr.error('Form Invalid', 'Error');
    }
  }
}
