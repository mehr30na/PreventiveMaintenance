import {ServiceBase} from './service-base.service';
import {Subject} from 'rxjs/Subject';
import {ResponseContent} from '../base/helper/response/response-content';
import {Keyword} from '../base/helper/response/Keyword';
import swal from 'sweetalert2'
import {el} from "@angular/platform-browser/testing/src/browser_util";
import {Router} from "@angular/router";

declare const $: any;

// @Injectable()
export class ServiceBase2 extends ServiceBase {
  router:Router
  constructor() {
    super();
  }

  getService(_url) {
    const ret = new Subject();

    super.getService(_url).subscribe((res:ResponseContent) => {
      // console.log(_url + '------->' , res )
// ;
      if (res.flag) {
        ret.next(res.data);
      } else {
        // console.log('operation failed!');
        const from = 'top';
        const align = 'center';
        const type_ = 'danger';
        const msg = '';
        // console.log('عملیات انجام نشد');
        for (const state of res.states) {
          if (state.message !== '') {
            // Notifyme.showNotify(from, align, type_, state.message);
            console.log(state.message);
          }
          else {
            // Notifyme.showNotify(from, align, type_, Keyword[state.keyword]);
            console.log(Keyword[state.keyword]);
          }
        }
      }
    }, error => {
      // alert(JSON.stringify(error))
      if (error.status === 500) {
        console.log(500);
        console.log(error._body)
      }
      if (error.status == 403)
        console.log("درخواست غیرمجاز");
      // if (error.status == 401) {
      //   this.router.navigateByUrl('/authentication/signIn')
      // }
      else
        console.log('error.status ' + error.status);
      // // console.log('error---> ' + error);
      // console.log('error._body ' + error._body)
    });
    return ret.asObservable();
  }

  getService_f(_url) {
    const ret = new Subject();
    super.getService(_url).subscribe((res:ResponseContent) => {
      // console.log(_url + '------->' , res );
      if (res.flag) {
        ret.next(res.data);
      } else {
        ret.error(res);
      }
    }, error => {
      // if (error.status === 500){
      //   alert(500);
      //   alert(error._body)
      // }
      if (error.status == 403)
        alert("درخواست غیرمجاز");
      // if (error.status == 401)
        // this.router.navigateByUrl('/authentication/signIn');
      else
        console.log('error.status ' + error.status);
      // console.log('error---> ' + error);
      // console.log('error._body ' + error._body)
    });
    return ret.asObservable();
  }

  postService(value: any, _url) {
    const ret = new Subject();
    super.postService(value, _url).subscribe((res: ResponseContent) => {
      // console.log('response =======>', res);
      if (res.flag) {
        ret.next(res.data);
      } else {
        // console.log('operation failed!');
        const from = 'top';
        const align = 'center';
        const type_ = 'danger';
        const msg = '';
        for (const state of res.states) {
          if (state.message !== '') {
            // Notifyme.showNotify(from, align, type_, state.message);
            // alert(state.message);
            swal({
              showCloseButton: true,
              confirmButtonColor: '#04383c',
              background: '#e4e4e4',
              type: 'error',
              title: 'خطا!',
              html:
              '<p>' + state.message + '</p>'
              ,
              confirmButtonText: 'تایید'

            });
          }
          else {
            // Notifyme.showNotify(from, align, type_, Keyword[state.keyword]);
            // alert(Keyword[state.keyword]);


            swal({
              showCloseButton: true,
              confirmButtonColor: '#04383c',
              background: '#e4e4e4',
              type: 'error',
              title: 'خطا!',
              html:
              '<p>' + Keyword[state.keyword] + '</p>'
              ,
              confirmButtonText: 'تایید'

            });

          }
        }
      }
    }, error => {
      // if (error.status === 500){
      //   alert(500);
      //   alert(error._body)
      // }
      if (error.status == 403)
        alert("درخواست غیرمجاز");
      // if (error.status == 401)
        // this.router.navigateByUrl('/authentication/signIn');
      else
        console.log('error.status ' + error.status);
      // console.log('error---> ' + error);
      // console.log('error._body ' + error._body)
    });
    return ret.asObservable();
  }

  postService_f(value: any, _url) {
    const ret = new Subject();
    super.postService(value, _url).subscribe((res: ResponseContent) => {
      // console.log('response =======>', res);
      if (res.flag) {
        ret.next(res.data);
      } else {
        ret.error(res);
      }
    }, error => {
      // if (error.status === 500){
      //   alert(500);
      //   alert(error._body)
      // }
      if (error.status == 403)
        alert("درخواست غیرمجاز");
      // if (error.status == 401)
        // this.router.navigateByUrl('/authentication/signIn');
      else
        console.log('error.status ' + error.status);
      // console.log('error---> ' + error);
      // console.log('error._body ' + error._body)
    });
    return ret.asObservable();
  }


  putService(value: any, _url) {
    const ret = new Subject();
    super.putService(value, _url).subscribe((res: ResponseContent) => {
      // console.log('response =======>', res);
      if (res.flag) {
        ret.next(res.data);
      } else {
        // console.log('operation failed!');
        const from = 'top';
        const align = 'center';
        const type_ = 'danger';
        const msg = '';

        for (const state of res.states) {
          if (state.message !== '') {
            // Notifyme.showNotify(from, align, type_, state.message);
            console.log(state.message);
          }
          else {
            // Notifyme.showNotify(from, align, type_, Keyword[state.keyword]);
            console.log(Keyword[state.keyword]);
          }
        }
      }
    }, error => {
      // if (error.status === 500){
      //   alert(500);
      //   alert(error._body)
      // }
      if (error.status == 403)
        alert("درخواست غیرمجاز");
      // if (error.status == 401)
        // this.router.navigateByUrl('/authentication/signIn');
      else
        console.log('error.status ' + error.status);
      // console.log('error---> ' + error);
      // console.log('error._body ' + error._body)
    });
    return ret.asObservable();
  }


  putService_f(value: any, _url) {
    const ret = new Subject();
    super.putService(value, _url).subscribe((res: ResponseContent) => {
      // console.log('response =======>', res);
      if (res.flag) {
        ret.next(res.data);
      } else {
        ret.error(res);
      }
    }, error => {
      // if (error.status === 500){
      //   alert(500);
      //   alert(error._body)
      // }
      if (error.status == 403)
        alert("درخواست غیرمجاز");
      else
        console.log('error.status ' + error.status);
      // console.log('error---> ' + error);
      // console.log('error._body ' + error._body)
    });
    return ret.asObservable();
  }

  deleteService(parentId: string) {
    const ret = new Subject();
    super.deleteService(parentId).subscribe((res:ResponseContent) => {
      if (res.flag) {
        ret.next(res.data);
      } else {
        // console.log('operation failed!');
        const from = 'top';
        const align = 'center';
        const type_ = 'danger';
        const msg = '';

        for (const state of res.states) {
          if (state.message !== '') {
            // Notifyme.showNotify(from, align, type_, state.message);
            console.log(state.message);
          }
          else {
            // Notifyme.showNotify(from, align, type_, Keyword[state.keyword]);
            console.log(Keyword[state.keyword]);
          }
        }
      }
    }, error => {
      // if (error.status === 500){
      //   alert(500);
      //   alert(error._body)
      // }
      if (error.status == 403)
        alert("درخواست غیرمجاز");
      // if (error.status == 401)
        // this.router.navigateByUrl('/authentication/signIn');
      else
        console.log('error.status ' + error.status);
      // console.log('error---> ' + error);
      // console.log('error._body ' + error._body)
    });
    return ret.asObservable();
  }

  deleteService_f(parentId: string) {
    const ret = new Subject();
    super.deleteService(parentId).subscribe((res:ResponseContent) => {
      if (res.flag) {
        ret.next(res.data);
      } else {
        ret.error(res);
      }
    }, error => {
      // if (error.status === 500){
      //   alert(500);
      //   alert(error._body)
      // }
      if (error.status == 403)
        alert("درخواست غیرمجاز");
      // if (error.status == 401)
        // this.router.navigateByUrl('/authentication/signIn');
      else
        console.log('error.status ' + error.status);
      // console.log('error---> ' + error);
      // console.log('error._body ' + error._body)
    });
    return ret.asObservable();
  }
}
