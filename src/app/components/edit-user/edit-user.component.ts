import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { MaterialReferencesModule } from '../../material-references/material-references.module';

@Component({
  selector: 'app-edit-user',
  standalone: true,
  imports: [MatDialogModule, ReactiveFormsModule, MaterialReferencesModule],
  templateUrl: './edit-user.component.html',
  styleUrl: './edit-user.component.scss',
})
export class EditUserComponent implements OnInit {
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

  editUser: any;
  constructor(
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    public dialogRef: MatDialogRef<EditUserComponent>
  ) {}

  ngOnInit() {
    this.editUser = this.fb.group({
      email: this.fb.control(
        this.data?.email,
        Validators.compose([Validators.email, Validators.required])
      ),
      username: this.fb.control(this.data?.username, [
        Validators.required,
        Validators.minLength(3),
      ]),
      role: this.fb.control(this.data?.role, Validators.required),
      password: this.fb.control(this.data?.password, Validators.required),
      gender: this.fb.control(this.data?.gender, Validators.required),
      id: this.fb.control(this.data?.id),
    });
  }

  onEditSubmit() {
    this.dialogRef.close(this.editUser.value);
  }
}

export interface DialogData {
  id(id: any): import('@angular/forms').FormControl<any>;
  email(email: any): import('@angular/forms').FormControl<any>;
  username(username: any): import('@angular/forms').FormControl<any>;
  role(role: any): import('@angular/forms').FormControl<any>;
  password(password: any): import('@angular/forms').FormControl<any>;
  gender(gender: any): import('@angular/forms').FormControl<any>;
  user: {
    email: string;
    password: string;
    role: string;
    username: string;
    gender: string;
    id: string;
  };
}
