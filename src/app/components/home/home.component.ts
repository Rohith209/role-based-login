import {
  AfterViewInit,
  Component,
  OnInit,
  ViewChild,
  inject,
} from '@angular/core';
import { MaterialReferencesModule } from '../../material-references/material-references.module';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { UserService } from '../../services/user.service';
import { ToastrService } from 'ngx-toastr';
import { MatSort } from '@angular/material/sort';
import { EditUserComponent } from './../edit-user/edit-user.component';
import {
  MatDialog,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [MaterialReferencesModule, MatDialogModule],
  providers: [
    {
      provide: MatDialogRef,
      useValue: {},
    },
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements AfterViewInit, OnInit {
  usersData: any;
  displayedColumns: string[] = [
    'sno',
    'id',
    'username',
    'email',
    'gender',
    'role',
    'actions',
  ];
  userService: UserService = inject(UserService);
  toastr: ToastrService = inject(ToastrService);
  dataSource: any;
  currUserRole: any = '';
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private dialog: MatDialog) {}

  ngOnInit(): void {
    this.getUsers();
  }

  ngAfterViewInit() {
    this.currUserRole = sessionStorage.getItem('role');
    setTimeout(() => {
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }, 1000);
  }

  getUsers() {
    this.userService.getAllUsers().subscribe((data: any) => {
      this.dataSource = new MatTableDataSource<Users>(data);
    });
  }

  editUser(user: Users) {
    const dialogRef = this.dialog.open(EditUserComponent, {
      data: user,
      width: '600px',
    });

    dialogRef.afterClosed().subscribe((result: Users) => {
      this.userService.editUser(result).subscribe((data) => {
        if (data) {
          this.toastr.info('Updated Successfully', 'Update');
          this.getUsers();
        }
      });
    });
  }

  deleteUser(user: Users) {
    this.userService.deleteUser(user.id).subscribe((res) => {
      if (res) {
        this.toastr.warning('User Deleted', 'Delete');
        this.getUsers();
      }
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
export interface Users {
  username: string;
  id: string;
  role: string;
  email: string;
  gender: string;
}
