import { Component } from '@angular/core';
import { NetworkService } from './shared/services/network.service';
import { TranslateService } from '@ngx-translate/core';
import { NgxPermissionsService } from 'ngx-permissions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'AWP_FE';
  currentLang: string;

  constructor(
    public networkService: NetworkService,
    public translate: TranslateService,
    private permissionsService: NgxPermissionsService
  ) {}

  ngOnInit() {
    this.initLang();
    const perm = ['ADMIN', 'EDITOR'];
    this.permissionsService.addPermission(perm);

    this.permissionsService.loadPermissions(perm);
  }

  initLang() {
    localStorage.getItem('currentLang')
      ? localStorage.getItem('currentLang')
      : localStorage.setItem('currentLang', 'en');
    this.currentLang = localStorage.getItem('currentLang') || 'en';
    this.translate.use(this.currentLang);
  }

  changeCurrentLang(lang: string) {
    const storedLang = localStorage.getItem('currentLang');
    if (storedLang == lang) {
      return;
    } else {
      this.translate.use(lang);
      localStorage.setItem('currentLang', lang);
      location.reload();
    }
  }
  dir() {
    let dir = localStorage.getItem('currentLang');
    return dir;
  }
}
