import { Component, inject } from '@angular/core';
import { MaterialReferencesModule } from '../../material-references/material-references.module';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router, RouterLink } from '@angular/router';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [MaterialReferencesModule, ReactiveFormsModule, RouterLink],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent {
  userService: UserService = inject(UserService);

  constructor(
    private fb: FormBuilder,
    private toastr: ToastrService,
    private router: Router
  ) {}

  roles: any = [
    {
      value: 'developer',
      viewValue: 'Developer',
    },
    {
      value: 'manager',
      viewValue: 'Manager',
    },
    {
      value: 'tester',
      viewValue: 'Tester',
    },
    {
      value: 'admin',
      viewValue: 'Administrator',
    },
  ];

  registerForm = this.fb.group({
    username: this.fb.control(
      '',
      Validators.compose([Validators.required, Validators.minLength(3)])
    ),
    email: this.fb.control(
      '',
      Validators.compose([Validators.email, Validators.required])
    ),
    password: this.fb.control('', Validators.required),
    gender: this.fb.control('', Validators.required),
    role: this.fb.control('', Validators.required),
  });

  onRegisterSubmit() {
    if (this.registerForm.valid) {
      this.userService
        .registerUser(this.registerForm.value)
        .subscribe((res) => {
          sessionStorage.setItem('user', JSON.stringify(res));
          try {
            if (res) {
              this.toastr.success('Form Valid', 'Success');
              this.registerForm.reset();
              this.router.navigate(['/dashboard']);
            } else {
              this.toastr.error('Something went wrong', 'Error');
            }
          } catch (error: any) {
            this.toastr.error(error, 'Error');
          }
        });
    } else {
      this.toastr.error('Form Invalid', 'Error');
    }
  }
}
