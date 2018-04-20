import {Injectable} from '@angular/core';
import {BehaviorSubject} from "rxjs/BehaviorSubject";
import {User} from "../../../../model/management/userManagement/user";

@Injectable()
export class UserDataService {

  constructor() {
  }

  private userOne = new BehaviorSubject<User>(null);


  gettingUserOne = this.userOne.asObservable();

  setUserOne(userOne) {
    this.userOne.next(userOne)
  }
}
