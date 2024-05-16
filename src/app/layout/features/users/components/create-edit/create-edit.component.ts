import { HttpParams } from '@angular/common/http';
import { AlertService } from './../../../../../shared/services/alert.service';
import { InputValidation } from './../../../../../shared/utils/InputValidation';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { PageType } from 'src/app/core/Models/pageType';
import { genericResponse } from 'src/app/shared/model/genericResponse';
import { GenericService } from 'src/app/shared/services/generic.service';
import { ErrorTooltipService } from 'src/app/shared/utils/ErrorMsgs';
import { ConfirmEventType, ConfirmationService } from 'primeng/api';
import { dropDownDTO } from 'src/app/shared/model/dropdown';
import { User } from '../../Models/user';

@Component({
  selector: 'app-create-edit',
  templateUrl: './create-edit.component.html',
  styleUrls: ['./create-edit.component.scss'],
})
export class CreateEditComponent {
  form!: FormGroup;
  data: any = null;
  item: User;
  isformvalueChanges: boolean = false;
  permissions: any[] = [];
  show: boolean = false;
  roles: dropDownDTO[];
  constructor(
    public ErrorTooltipService: ErrorTooltipService,
    private config: DynamicDialogConfig,
    private genericService: GenericService,
    private AlertService: AlertService,
    private dialogRef: DynamicDialogRef,
    private confirmationService: ConfirmationService
  ) {}
  ngOnInit() {
    this.data = this.config.data;
    this.initForm();
    if (this.data.PageType == PageType.edit) {
      this.GetUserById();
    }
  }

  GetUserById() {
    console.log(this.data);

    this.genericService
      .get<User>(`users/${this.data !== undefined ? this.data?.obj?.id : 1}`)
      .subscribe((data) => {
        this.item = data;
        this.initForm(this.item);
      });
  }

  initForm(data?) {
    this.form = new FormGroup({
      fullName: new FormControl(data?.name, [
        Validators.required,
        Validators.maxLength(50),
        Validators.pattern(InputValidation.EnglishRegx),
      ]),
      email: new FormControl(data?.email, [
        Validators.required,
        Validators.email,
        Validators.maxLength(200),
        Validators.pattern(InputValidation.validEmail),
      ]),
      phone: new FormControl(data?.phone, [Validators.required]),
    });
  }

  submit() {
    let baseUserDTO = {
      email: this.form.get('email').value,

      fullName: this.form.get('fullName').value,
    };

    let userDTO =
      this.data.PageType == PageType.edit
        ? { ...baseUserDTO, id: this.data.obj?.id }
        : { ...baseUserDTO };
    this.data.PageType == PageType.edit
      ? this.genericService
          .put<any>(`users/${this.data.obj?.id}`, userDTO)
          .subscribe((data) => {
            console.log(data);
            this.AlertService.showMessage('success', 'done');
            this.dialogRef.close();
          })
      : this.genericService.post<any>(`users`, userDTO).subscribe((data) => {
          console.log(data);
          this.AlertService.showMessage('success', 'done');
          this.dialogRef.close();
        });
  }
  cancel() {
    if (this.isformvalueChanges) {
      let cancelConfirm: DynamicDialogRef;
      this.confirmationService.confirm({
        message: 'Your Data Will be Removed, Do you want to Cancel?',
        header: 'Cancel Confirm',
        icon: 'pi pi-info-circle',
        acceptLabel: 'Yes',
        rejectLabel: 'No',

        accept: () => {
          cancelConfirm?.close();
          this.dialogRef.close();
        },
        reject: (type) => {
          switch (type) {
            case ConfirmEventType.REJECT:
              cancelConfirm?.close();
              break;
            case ConfirmEventType.CANCEL:
              cancelConfirm?.close();
              break;
          }
        },
      });
    } else {
      this.dialogRef.close();
    }
  }
}
