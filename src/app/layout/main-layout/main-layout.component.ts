import { Component } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss'],
})
export class MainLayoutComponent {
  // currentUser$: Observable<CurrentUserDto> = this.configState.getOne$('currentUser');
  items: MenuItem[] | undefined;

  home: MenuItem | undefined;
  menuItems: MenuItem[] | undefined;

  constructor() {}

  ngOnInit() {}

  screenWidth = 0;

  // getBodyClass(): string {
  //   let styleClass = '';
  //   if (this.isSidenavCollapsed && this.screenWidth > 768) {
  //     styleClass = 'content-trimmed';
  //   } else if (
  //     this.isSidenavCollapsed &&
  //     this.screenWidth <= 768 &&
  //     this.screenWidth > 0
  //   ) {
  //     styleClass = 'content-md-screen';
  //   }
  //   return styleClass;
  // }

  get hasLoggedIn(): boolean {
    return false; // this.authService.isAuthenticated;
  }
}
