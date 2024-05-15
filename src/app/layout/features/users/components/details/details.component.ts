import { HttpParams } from '@angular/common/http';
import { Component } from '@angular/core';
import { DialogService, DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { genericResponse } from 'src/app/shared/model/genericResponse';
import { AlertService } from 'src/app/shared/services/alert.service';
import { GenericService } from 'src/app/shared/services/generic.service';
import { User } from '../../Models/user';
import { PageType } from 'src/app/core/Models/pageType';
import { CreateEditComponent } from '../create-edit/create-edit.component';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss'],
  providers:[DynamicDialogConfig]
})
export class DetailsComponent {
  item: User;
  data: any;

  constructor(
    private config: DynamicDialogConfig,
    private genericService: GenericService,
    public dialogService: DialogService,

  ) {}
  ngOnInit() {
    this.data = this.config.data;
    console.log(this.data?.obj.id);
    this.GetUserById();
  }

  GetUserById() {
    
    this.genericService
      .get<any>(`users/${ this.data ? this.data?.obj.id : 1}`)
      .subscribe((data) => {
        this.item = data;
      });
  }
  editUser() {
    console.log(this.data);
    
    const obj =this.item
    let dialogRef: DynamicDialogRef;
    let pageType: PageType = obj !== null ? PageType.edit : PageType.add;
    dialogRef = this.dialogService.open(CreateEditComponent, {
      header: pageType == PageType.add ? 'Add New User' : 'Update User',
      data: { obj: obj, PageType: pageType },
      width: '60%',
      closable: false,
    });
  }  
}
