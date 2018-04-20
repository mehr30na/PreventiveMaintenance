import {Injectable} from '@angular/core';
import {ServiceBase2} from "../../serivce-base2.service";
import {Http} from "@angular/http";
import {HttpClient} from "@angular/common/http";

@Injectable()
export class UserService extends ServiceBase2 {

  constructor(public _HttpClient: HttpClient) {
    super();
    this._objectName = 'user';
  }

  create(user) {
    return this.postService(user, '/save');
  }

  checkNational(nationalCode) {
    return this.getService('/nationalCode/' + nationalCode);
  }

  getUserById(userId) {
    return this.getService('/' + userId);
  }

  getAllUser() {
    return this.getService('/all');
  }

  deleteUser(id) {
    return this.deleteService(id)
  }

  editUser(user) {
    return this.putService(user, '/update')
  }

  getAllExpert(organId) {
    return this.getService('/expert/' + organId)
  }

  getImageById(id) {
    return this.getService('/download/' + id)
  }

  sendToken(token, id) {
    return this.getService('/fcmtoken/' + token + '/' + id);
  }
  sendUsernameForget(username){
    return this.postService(username, '/forgetpassword');
  }
  sendCodeForget(username,code){
    return this.postService(code, '/checkcode/'+username);
  }
  sendNewPass(username,password){
    return this.postService(password, '/resetpassword/'+username);
  }
}
