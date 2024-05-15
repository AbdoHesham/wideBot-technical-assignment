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

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss'],
})
export class SigninComponent implements OnInit {
  show = false;
  stateOptions: any[] = [
    { label: 'Login As Admin', value: 1 },
    { label: 'Login As User', value: 2 },
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
    private permissionsService: NgxPermissionsService
  ) {}

  initForm() {
    this.form = this.fb.group({
      userType: new FormControl(1, [Validators.required]),
      email: new FormControl(null, [
        Validators.required,
        Validators.email,
        Validators.maxLength(80),
        Validators.pattern(InputValidation.validEmail),
      ]),
      password: new FormControl(null, [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(30),
        // Validators.pattern(Patterns.complexPassword),
      ]),
    });
  }
  ngOnInit() {
    this.initForm();
    this.initFormValue();
  }

  submit() {
    let body = {
      email: this.form.controls.email.value.trim(),
      password: this.form.controls.password.value.trim(),
      userType: this.form.controls.userType.value,
    };
    const perm = this.form.controls.userType.value == 1 ? ['ADMIN'] : ['USER'];
    this.permissionsService.addPermission(perm);
    this.AuthService.setCurrentUser(body);
    this.router.navigateByUrl('/users');
  }
  initFormValue() {
    this.form.controls.email.patchValue(
      this.form.controls.userType.value == 1
        ? 'admin@admin.com'
        : 'user@user.com'
    );
    this.form.controls.password.patchValue('P@ssw0rd');
  }
  onOptionClick(event: any): void {
    console.log(event);
    this.initFormValue();
  }
}
