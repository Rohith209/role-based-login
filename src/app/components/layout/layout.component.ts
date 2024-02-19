import { Component, OnInit } from '@angular/core';
import { MaterialReferencesModule } from '../../material-references/material-references.module';
import {
  ActivatedRoute,
  ActivatedRouteSnapshot,
  NavigationEnd,
  NavigationStart,
  Router,
  RouterOutlet,
} from '@angular/router';
import { CommonModule } from '@angular/common';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [MaterialReferencesModule, CommonModule, RouterOutlet],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss',
})
export class LayoutComponent implements OnInit {
  isHeaderShown: boolean = true;
  currURL: string = '';
  constructor(
    private router: Router,
    private toastr: ToastrService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.currURL = event.url;
        if (this.currURL == '/login' || this.currURL == '/register') {
          this.isHeaderShown = false;
        } else {
          this.isHeaderShown = true;
        }
      }
    });
  }

  logoutUser() {
    sessionStorage.removeItem('role');
    this.toastr.success('Logged out successfully', 'Success');
    this.router.navigate(['/login']);
    sessionStorage.clear();
  }
}
