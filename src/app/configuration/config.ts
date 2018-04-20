/**
 * Created by milad on 12/7/17.
 */
export class Config {
  // private static _url = 'http://94.232.173.183:8080/net/';
  // private static _url = 'http://localhost:8050/';
  private static _url = 'http://192.168.3.45:8050/';
  public static getUrl() {
    return this._url;
  }
  public static setUrl(url: string) {
    this._url = url;
  }
  public static setLocalStorageToken(token: string) {
    localStorage.setItem('token', token);
  }
  public static clearLocalStorageToken() {
    localStorage.clear()
  }
  public static getLocalStorageToken() {
    var token = localStorage.getItem('token');
    return token;
  }
  public static setLocalStorageUserId(id: string) {
    localStorage.setItem('userId', id);
  }
  public static getLocalStorageUserId() {
    var id = localStorage.getItem('userId');
    return parseInt(id);
  }

  public static setLocalStorageUser(user: any) {
    localStorage.setItem('user', JSON.stringify(user));
  }
  public static getLocalStorageUser() {
    var user = localStorage.getItem('user');
    return JSON.parse(user);
  }


  public static setLocalStorageUserType(userType: string) {
    localStorage.setItem('userType', userType);
  }
  public static getLocalStorageUserType() {
    var userType = localStorage.getItem('userType');
    return userType;
  }

  public static alertAudio() {
    var audio = new Audio();
    audio.src = "./assets/audio/1.mp3";
    audio.load();
    audio.play();
  }
  // public static setLoginedMemberId(logginedMemberId: string) {
  //   localStorage.setItem('LogginedMemberId', logginedMemberId);
  // }
  //
  // public static setLoginedPostId(logginedPostId: string) {
  //   localStorage.setItem('LogginedPostId', logginedPostId);
  // }

  // passParam(url: string, id: any) {
  //   return url + id;
  // }

  // public static  getLocalStorageOrganizationId() {
  //   var orgId = localStorage.getItem('orgId');
  //   return  orgId;
  // }
  // public static setLocalStoragePerson(person: any) {
  //   localStorage.setItem('_person', JSON.stringify(person));
  // }
  // public static  getLocalStorageOnlyToken() {
  //   var token = localStorage.getItem('token');
  //   return token;
  // }
  // public static  getLocalStoragePerson() {
  //   return JSON.parse(localStorage.getItem('_person'));
  // }


  // public static  setLocalStorageOrganizationId(orgId: string) {
  //   localStorage.setItem('orgId', orgId);
  // }


}
