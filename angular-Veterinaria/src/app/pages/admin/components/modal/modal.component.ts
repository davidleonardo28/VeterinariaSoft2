import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BaseFormUser } from '../../../../shared/utils/base-form-user';
import { UsersService } from '../../services/users.service';

enum Action {
  EDIT = 'edit',
  NEW = 'new',
}

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css'],
})
export class ModalComponent implements OnInit {
  actionTODO = Action.NEW;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public userForm: BaseFormUser,
    private userSvc: UsersService
  ) {}

  ngOnInit(): void {
    if (this.data?.user.hasOwnProperty('id')) {
      this.actionTODO = Action.EDIT;
      this.pathFormData();
    }
  }

  onSave(): void {
    const formValue = this.userForm.baseForm.value;
    if (this.actionTODO === Action.NEW) {
      //Nuevo
      this.userSvc.new(formValue).subscribe((res) => {
        console.log('New', res);
      });
    } else {
      //Editar
      const userId = this.data?.user?.id;
      this.userSvc.update(userId, formValue).subscribe((res) => {
        console.log('Update', res);
      });
    }
    console.log('Save');
  }

  checkField(field: string): boolean {
    return this.userForm.isValidField(field);
  }

  private pathFormData(): void {
    this.userForm.baseForm.patchValue({
      username: this.data?.user?.username,
      role: this.data?.user?.role,
    });
  }
}
