import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Users } from '../components/home/home.component';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiURL = 'http://localhost:3000/users';
  constructor(private http: HttpClient) {}

  registerUser(registerData: any) {
    return this.http.post(this.apiURL, registerData);
  }

  loginUser() {
    return this.http.get(this.apiURL);
  }

  getAllUsers() {
    return this.http.get(this.apiURL);
  }

  deleteUser(id: string) {
    return this.http.delete(this.apiURL + '/' + id);
  }

  editUser(user: Users) {
    return this.http.put(this.apiURL + '/' + user.id, user);
  }
}
