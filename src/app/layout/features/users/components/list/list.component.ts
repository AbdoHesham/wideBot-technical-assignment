import { Component } from '@angular/core';

import {
  ConfirmEventType,
  ConfirmationService,
  LazyLoadEvent,
  MenuItem,
  MessageService,
} from 'primeng/api';

import { AlertService } from 'src/app/shared/services/alert.service';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { FormControl, FormGroup } from '@angular/forms';
import { debounceTime } from 'rxjs';
import { Column, Columntype } from '../../../../../core/Models/Column';
import { GenericService } from '../../../../../shared/services/generic.service';

import { PageType } from 'src/app/core/Models/pageType';
import { CreateEditComponent } from '../create-edit/create-edit.component';

import { DetailsComponent } from '../details/details.component';
import { User } from '../../Models/user';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent {
  visible: boolean;
  showPopup: boolean;
  ref: DynamicDialogRef;
  Columntypelst = Columntype;
  listItems: User[] = [];
  selectedItem: any;
  constructor(
    public dialogService: DialogService,
    public messageService: MessageService,
    private AlertService: AlertService,
    private genericService: GenericService,
    private confirmationService: ConfirmationService
  ) {}
  formGroup = new FormGroup({ searchCtrl: new FormControl('') });
  CountryName;
  input: any = {
    sorting: '',
    maxResultCount: 10,
    search: '',
    skipCount: 0,
  };

  totalItems: number;
  selectedId;

  Menuitems: MenuItem[] = [
    {
      label: 'View',
      icon: 'pi pi-eye',
      styleClass: 'defualt',
      command: (event) => {
        this.viewDetails(this.selectedItem);
      },
    },
    {
      label: 'Edit',
      icon: 'pi pi-pencil',
      styleClass: 'defualt',
      command: (event) => {
        console.log(event);

        this.manage(this.selectedItem);
      },
    },
    {
      label: 'Delete',
      icon: 'pi pi-trash',
      styleClass: 'defualt',
      command: (event) => {
        this.delete(this.selectedItem.id);
      },
    },
  ];

  columns: Column[] = [
    {
      field: 'username',
      header: 'User Name',
      type: Columntype.String,
      // width: '25px',
      sortable: true,
    },
    {
      field: 'email',
      header: 'Email Address',
      type: Columntype.String,
      // width: '25px',
      sortable: true,
    },
    {
      field: 'phone',
      header: 'Phone',
      type: Columntype.String,
      // width: '25px',
      sortable: true,
    },
    {
      field: 'address',
      header: 'Address',
      type: Columntype.address,
      // width: '25px',
      sortable: true,
    },

    {
      field: 'actions',
      header: 'Actions',
      type: Columntype.ActionMenu,
      sortable: false,
      // width: '5px',
    },
  ];

  onLoad(event: LazyLoadEvent | any) {
    if (event.sortField != null && event.sortField != undefined) {
      let sortField = event.sortField;
      let sortOrder = event.sortOrder;
      this.input.sorting = `${sortField} ${sortOrder === 1 ? 'asc' : 'desc'}`;
    }
    this.LoadList();
  }
  onPageChange(event) {
    this.input.skipCount = event.page * event.rows;
    this.input.maxResultCount = event.rows;

    this.LoadList();
  }
  ngOnInit(): void {
    this.LoadList();

    this.formGroup.controls.searchCtrl?.valueChanges
      .pipe(debounceTime(1000))
      .subscribe((value) => {
        this.input.search = value;
        // this.LoadList();
        this.listItems = this.listItems.filter(
          (item) => item.username === value
        );
        console.log(this.listItems);
        
      });
  }
  LoadList() {
    this.genericService.get<User[]>(`users`).subscribe((response) => {
      this.listItems = response;
      this.totalItems = response.length;
    });
  }

  menuItemOpened(e: any) {
    console.log(e);
    this.selectedItem = e;

    this.Menuitems.forEach((menuItem) => {
      menuItem.visible = true;
    });
  }

  delete(id: number) {
    let dialogRef: DynamicDialogRef;

    this.confirmationService.confirm({
      message: 'Are you sure you want to delete this item?',
      header: 'Delete item.',
      icon: 'pi pi-info-circle',
      acceptLabel: 'Yes',
      rejectLabel: 'No',
      accept: () => {
        this.genericService.delete(`users/${id}`).subscribe((res) => {
          this.AlertService.showMessage('success', 'Deleted Successfully');
          this.listItems = this.listItems.filter(
            (item) => item.id != id
          );
          dialogRef?.close();
        });
      },
      reject: (type) => {
        switch (type) {
          case ConfirmEventType.REJECT:
            dialogRef?.close();
            break;
          case ConfirmEventType.CANCEL:
            dialogRef?.close();
            break;
        }
      },
    });
  }
  cannotRemoveConfirm(resultMessege) {
    let cannotRemoveConfirm: DynamicDialogRef;
    this.confirmationService.confirm({
      message: resultMessege,
      header: 'cannot Remove Confirm',
      icon: 'pi pi-info-circle',
      acceptLabel: 'Ok',
      rejectVisible: false,
      accept: () => {
        cannotRemoveConfirm?.close();
        this.LoadList();
      },
      reject: (type) => {
        switch (type) {
          case ConfirmEventType.REJECT:
            cannotRemoveConfirm?.close();
            break;
          case ConfirmEventType.CANCEL:
            cannotRemoveConfirm?.close();
            break;
        }
      },
    });
  }
  manage(obj?) {
    let dialogRef: DynamicDialogRef;
    let pageType: PageType = obj !== null ? PageType.edit : PageType.add;
    dialogRef = this.dialogService.open(CreateEditComponent, {
      header: pageType == PageType.add ? 'Add New User' : 'Update User',
      data: { obj: obj, PageType: pageType },
      width: '60%',
      closable: false,
    });
    dialogRef.onClose.subscribe((data) => {
      this.LoadList();
    });
  }
  toggleMenu(menu, event) {
    menu.toggle(event);
  }
  jsonData: any[] = [];

  viewDetails(obj) {
    let dialogRef: DynamicDialogRef;
    let pageType: PageType.view;
    dialogRef = this.dialogService.open(DetailsComponent, {
      header: 'View User Details',
      data: { obj: obj, PageType: pageType },
      width: '60%',
    });
  }
}
