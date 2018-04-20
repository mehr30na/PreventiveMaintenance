import {Component, OnInit} from '@angular/core';
import swal from 'sweetalert2'
import {RoleService} from "../../../../../service/management/userManagement/role.service";
import {UserType} from "../../../../../model/management/userManagement/userType";
import {EnumObject} from "../../../../../base/utility/enum/enum-object";
import {EnumHandle} from "../../../../../base/utility/enum/enum-handle";
import {Role} from "../../../../../base/helper/enum/userManagement/role";
import {Swal} from "../../../../../base/utility/swal";
import {AdminAccess} from "../../../../../base/helper/enum/userManagement/adminAccess";
import {UserAccess} from "../../../../../base/helper/enum/userManagement/userAccess";
import {ManagerAccess} from "../../../../../base/helper/enum/userManagement/managerAccess";
import {ExpertAccess} from "../../../../../base/helper/enum/userManagement/expertAccess";
import {RoleDataService} from "../role-data.service";
import {Config} from "../../../../../configuration/config";
import {Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";
import {NgNoValidate} from "@angular/forms/src/directives/ng_no_validate_directive";
import {Validations} from "../../../../../base/utility/validations";
import {isNullOrUndefined} from "util";

@Component({
  selector: 'app-role-list',
  templateUrl: './role-list.component.html',
  styleUrls: ['./role-list.component.scss']
})
export class RoleListComponent implements OnInit {

  mode: string = '';
  roleId: number;
  roleList: Array<UserType> = [];
  roleAccessList = [] as EnumObject[];
  roleOfList = [] as EnumObject[];
  userType: UserType = new UserType();
  userTypeEdit: UserType = new UserType();
  myVal=Validations;

  constructor(private roleService: RoleService,
              private roleDataService: RoleDataService,
              private toastr: ToastrService,
              private router: Router) {
  }

  add() {
    this.mode = 'add';
  }

  cancel() {
    this.mode = '';
  }

  ngOnInit() {
    if (Config.getLocalStorageToken() == null) {
      this.router.navigateByUrl('/authentication/signIn');
    } else {
      this.userType.privilages = [];

      this.roleService.getAllRole().subscribe((res: UserType[]) => {
        if (res !== null) {
          this.roleList = res;
        } else {
          this.toastr.warning('نقشی ثبت نشده!','هشدار')
        }
      });
      this.roleOfList = EnumHandle.getEnumObjectList(EnumHandle.listEnums<Role>(Role));
      this.roleAccessList = EnumHandle.getEnumObjectList(EnumHandle.listEnums<AdminAccess>(AdminAccess));
    }
  }

  editRole(id) {
    this.mode = 'edit';
    this.roleId = id;
    this.roleService.getRoleById(id).subscribe((res: UserType) => {
      this.userTypeEdit = res;
      // alert(JSON.stringify(this.roleAccessList));
      this.setRoleAccessEdit(this.userTypeEdit.role);
      if (res.privilages == null) {
        this.userTypeEdit.privilages = [];
      }
    })
  }

  deleteRole(i, id) {
    let self = this;
    swal({
      title: 'حذف',
      type: 'warning',
      showCloseButton: true,
      confirmButtonColor: '#321834',
      background: '#e4e4e4',
      showCancelButton: true,
      cancelButtonColor: '#321834',
      cancelButtonText: 'خیر',
      confirmButtonText: 'بله'
    }).then((result) => {
      if (result.value) {
        self.roleService.deleteRole(id).subscribe(res => {
          if (res) {
            self.roleList.splice(i, 1)
            self.toastr.success('نقش با موفقیت حذف شد','موفق')
          } else {
            self.toastr.error('هنگام حذف مشکلی رخ داده است','خطا')
          }

        })
      }
    })

  }

  setRoleAccess(event) {
    this.userType.privilages = [];
    // alert(event);
    this.userType.role = event;
    // alert(event);
    if (event == 'ADMIN') {
      // alert('raft');
      this.roleAccessList = EnumHandle.getEnumObjectList(EnumHandle.listEnums<AdminAccess>(AdminAccess));
    }
    else if (event == 'USER') {
      this.roleAccessList = EnumHandle.getEnumObjectList(EnumHandle.listEnums<UserAccess>(UserAccess));
    }
    else if (event == 'MANAGER') {
      this.roleAccessList = EnumHandle.getEnumObjectList(EnumHandle.listEnums<ManagerAccess>(ManagerAccess));
    }
    else if (event == 'EXPERT') {
      this.roleAccessList = EnumHandle.getEnumObjectList(EnumHandle.listEnums<ExpertAccess>(ExpertAccess));
    }

  }

  setRoleAccessEdit(event) {
    this.userTypeEdit.role = event;
    // alert(event);
    if (event == 'ADMIN') {
      this.roleAccessList = EnumHandle.getEnumObjectList(EnumHandle.listEnums<AdminAccess>(AdminAccess));
    }
    else if (event == 'USER') {
      this.roleAccessList = EnumHandle.getEnumObjectList(EnumHandle.listEnums<UserAccess>(UserAccess));
    }
    else if (event == 'MANAGER') {
      this.roleAccessList = EnumHandle.getEnumObjectList(EnumHandle.listEnums<ManagerAccess>(ManagerAccess));
    }
    else if (event == 'EXPERT') {
      this.roleAccessList = EnumHandle.getEnumObjectList(EnumHandle.listEnums<ExpertAccess>(ExpertAccess));
    }

  }

  check(item, event) {
    if (event.target.checked) {
      // alert(item._value);
      this.userType.privilages.push(item._value)
    }
  }

  checkEdit(item, event) {
    if (event.target.checked) {
      // alert(item._value);
      this.userTypeEdit.privilages.push(item._value)
    }
  }

  // checkNgModel(event){
  //     for(let item of this.userType.privilages){
  //         if(event===item)
  //             return true
  //     }
  // }
  checkNgModelEdit(event): boolean {
    // alert(JSON.stringify(event));
    if (this.userTypeEdit.privilages != null) {
      for (let item of this.userTypeEdit.privilages) {
        if (event === item)
          return true
      }
    }

  }

  addRole() {
    if(!isNullOrUndefined(this.userType.name)){
      this.roleService.create(this.userType).subscribe((res: UserType) => {
        if (res) {
          this.toastr.success('نقش با موفقیت افزوده شد', 'موفق')
          this.userType = new UserType();
          // this.roleDataService.setRoleOne(res)
          this.roleList.push(res)
          this.mode='';
        }
      })
    }else{
      this.toastr.error('اطلاعات به صورت کامل وارد نشده','خطا')
    }
    // alert(JSON.stringify(this.userType.privilages));
    // alert(this.userType.role);

  }

  updateRole() {
    this.roleService.editRole(this.userTypeEdit).subscribe(res => {
      if (res) {
        this.toastr.success('نقش با موفقیت ویرایش شد','موفق')
        this.mode = '';
      }
    })
  }

  // onDeleteConfirm(event): void {
  //   if (window.confirm('Are you sure you want to delete?')) {
  //     event.confirm.resolve();
  //   } else {
  //     event.confirm.reject();
  //   }
  // }
  // editConfirm(event) :void{
  //   if (window.confirm('Are you sure you want to save?')) {
  //     alert(event.target.value);
  //     event.confirm.resolve();
  //   }
  // }


  // settings = {
  //   add: {
  //     addButtonContent: '<i class="nb-plus"></i>',
  //     createButtonContent: '<i class="nb-checkmark"></i>',
  //     cancelButtonContent: '<i class="nb-close"></i>',
  //     confirmAdd:true,
  //   },
  //   edit: {
  //     editButtonContent: '<i class="nb-edit"></i>',
  //     saveButtonContent: '<i class="nb-checkmark"></i>',
  //     cancelButtonContent: '<i class="nb-close"></i>',
  //     confirmSave:true,
  //   },
  //   delete: {
  //     deleteButtonContent: '<i class="nb-trash"></i>',
  //     confirmDelete: true,
  //   },
  //   columns: {
  //
  //     role: {
  //       name: 'نقش',
  //       type: 'string',
  //     },
  //     id: {
  //       name: 'ID',
  //       type: 'number',
  //     },
  //   },
  // };

}
