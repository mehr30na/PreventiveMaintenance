import {Component, Input, OnInit} from '@angular/core';
import {EnumObject} from "../../../../../base/utility/enum/enum-object";
import {EnumHandle} from "../../../../../base/utility/enum/enum-handle";
import {Role} from "../../../../../base/helper/enum/userManagement/role";
import {AdminAccess} from "../../../../../base/helper/enum/userManagement/adminAccess";
import {UserAccess} from "../../../../../base/helper/enum/userManagement/userAccess";
import {ManagerAccess} from "../../../../../base/helper/enum/userManagement/managerAccess";
import {ExpertAccess} from "../../../../../base/helper/enum/userManagement/expertAccess";
import {UserType} from "../../../../../model/management/userManagement/userType";
import {RoleService} from "../../../../../service/management/userManagement/role.service";
import {Swal} from "../../../../../base/utility/swal";
import {RoleDataService} from "../role-data.service";

declare let $: any;

@Component({
  selector: 'app-role-add',
  templateUrl: './role-add.component.html',
  styleUrls: ['./role-add.component.scss']
})
export class RoleAddComponent implements OnInit {
  @Input() mode: string;
  @Input() roleId: number;
  roleAccessList = [] as EnumObject[];
  roleList = [] as EnumObject[];
  userType: UserType = new UserType();

  constructor(private roleService: RoleService,
              private roleDataService: RoleDataService) {
  }


  ngOnInit() {

    if (this.mode == 'edit') {
      this.roleService.getRoleById(this.roleId).subscribe((res: UserType) => {
        this.userType = res;
      })
    }
    this.roleList = EnumHandle.getEnumObjectList(EnumHandle.listEnums<Role>(Role));
  }

  setRoleAccess(event) {
    this.userType.role = event;
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
      this.userType.privilages.push(item._value)
    }
  }

  addRole() {
    this.roleService.create(this.userType).subscribe((res: UserType) => {
      if (res) {
        Swal.successAdd();
        this.roleDataService.setRoleOne(res)
      }
    })
  }

  editRole() {
    this.roleService.editRole(this.userType).subscribe(res => {
      if (res) {
        Swal.successEdit()
      }
    })
  }

}
