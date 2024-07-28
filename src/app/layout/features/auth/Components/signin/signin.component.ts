import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../../../core/services/auth.service';
import { GenericService } from 'src/app/shared/services/generic.service';
import { genericResponse } from 'src/app/shared/model/genericResponse';
import { NgxPermissionsService } from 'ngx-permissions';
import { InputValidation } from 'src/app/shared/utils/InputValidation';
import { AlertService } from 'src/app/shared/services/alert.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss'],
})
export class SigninComponent implements OnInit {
  show = false;
  stateOptions: any[] = [
    // { label: 'Login As Admin', value: 1 },
    // { label: 'Login As User', value: 2 },
  ];
  form: FormGroup<{
    email: FormControl<string>;
    password: FormControl<string>;
    userType: FormControl<number>;
  }>;
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private genericService: GenericService,
    public AuthService: AuthService,
    private permissionsService: NgxPermissionsService,
    private AlertService: AlertService
  ) {}

  initForm() {
    this.form = this.fb.group({
      userType: new FormControl(1, [Validators.required]),
      email: new FormControl('', [
        Validators.required,
        Validators.email,
        Validators.maxLength(80),
        Validators.pattern(InputValidation.validEmail),
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(30),
        // Validators.pattern(Patterns.complexPassword),
      ]),
    });
  }
  ngOnInit() {
    this.initForm();
    // this.initFormValue();
  }

  submit() {
    const emailValue = this.form.controls.email.value.trim();
    const passwordValue = this.form.controls.password.value.trim();
    let isAuthorized = false;

    switch (emailValue) {
      case 'ahmedallawati@omandatapark.com':
        isAuthorized = passwordValue === 'Xp4!vMq2';
        break;
      case 'hmallawati@omandatapark.com':
        isAuthorized = passwordValue === 'R3$t6w!B';
        break;
      case 'beylasan-alruzaiqi@omandatapark.com':
        isAuthorized = passwordValue === 'Z7!hP5g#';
        break;
      default:
        isAuthorized = false;
    }

    if (isAuthorized) {
      let body = {
        email: emailValue,
        password: passwordValue,
        userType: this.form.controls.userType.value,
      };

      this.AuthService.setCurrentUser(body);
      this.router.navigateByUrl('/home');
    } else {
      this.AlertService.showMessage('error', 'Error in Email or Password');
    }
  }

  onOptionClick(event: any): void {
    console.log(event);
    // this.initFormValue();
  }
}
