import {
  Component,
  ElementRef,
  EventEmitter,
  Output,
  ViewChild,
} from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  formGroup!: FormGroup;
  @ViewChild('imgBrand') imgBrand: ElementRef;
  stateOptions: any[] = [
    {
      label: 'ar',
      value: 'ar',
      flag: '../../../assets/images/flags/saudi-arabia-flag-icon.svg',
    },
    {
      label: 'en',
      value: 'en',
      flag: '../../../assets/images/flags/united.svg',
    },
  ];

  userInteracted = true;
  private destroy$ = new Subject<void>();

  constructor(private router: Router) {}
  ngAfterViewInit() {
    window.addEventListener('click', () => {
      this.userInteracted = true;
    });
  }
  ngOnInit() {
    this.formGroup = new FormGroup({
      currentLang: new FormControl('en'),
    });
  }

  getVipRequests(tab) {
    this.router.navigateByUrl(`/vip-requests/${tab}`);
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
