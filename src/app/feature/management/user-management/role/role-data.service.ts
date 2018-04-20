import {Injectable} from '@angular/core';
import {BehaviorSubject} from "rxjs/BehaviorSubject";
import {Role} from "../../../../base/helper/enum/userManagement/role";
import {UserType} from "../../../../model/management/userManagement/userType";

@Injectable()
export class RoleDataService {

  constructor() {
  }

  private roleOne = new BehaviorSubject<UserType>(null);


  gettingRoleOne = this.roleOne.asObservable();

  setRoleOne(roleOne) {
    this.roleOne.next(roleOne)
  }
}
