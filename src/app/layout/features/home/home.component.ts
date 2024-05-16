import { NgxPermissionsService } from 'ngx-permissions';
import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  isUserView: boolean = false;
  perms;
  constructor() {}
  ngOnInit() {
    this.perms = JSON.parse(localStorage.getItem('perm'));
    this.perms == 'USER' ? (this.isUserView = true) : (this.isUserView = false);
  }
}
