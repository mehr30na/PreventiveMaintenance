import {AfterViewInit, Component, Input, OnInit} from '@angular/core';

import {NbMenuService, NbSidebarService} from '@nebular/theme';
// import { UserService } from '../../../@core/data/users.service';
import {AnalyticsService} from '../../../@core/utils/analytics.service';
import {UserService} from "../../../service/management/userManagement/user.service";
import {User} from "../../../model/management/userManagement/user";
import {Config} from "../../../configuration/config";
import {Router} from "@angular/router";
import swal from 'sweetalert2'

declare let $: any;

@Component({
  selector: 'ngx-header',
  styleUrls: ['./header.component.scss'],
  templateUrl: './header.component.html',
  providers: [UserService]
})
export class HeaderComponent implements OnInit, AfterViewInit {


  @Input() position = 'inverse';

  user: User = new User;
  userId: number;
  userMenu: any;
  image1: string;
  myConfig = Config;

  constructor(private sidebarService: NbSidebarService,
              private menuService: NbMenuService,
              private userService: UserService,
              private analyticsService: AnalyticsService,
              private router: Router) {
  }

  ngAfterViewInit() {


    let self = this;
    var image = '<img src="{{image1}}" class="img-circle" height="60px" width="110px" style="margin-right: 1%; border-radius: 50%">';
    let footer = '<button class="btn btn-default btn-sm text-center clear" id="pop" style="width: 99%; margin-top: 1%; background-color:#0b7c83;color:#fff;z-index: 999!important;">خروج</button>';
    $('#popover').popover({
      placement: 'bottom',
      title: image,
      content: footer,
      html: true
    }).on('shown.bs.popover', function (eventShown) {
      var $popup = $('#' + $(eventShown.target).attr('aria-describedby'));
      $popup.find('button.clear').click(function (e) {
        $popup.popover('hide');
        self.clear()
      });
    });
  }

  ngOnInit() {

    // if(this.user==null){
    //     this.router.navigateByUrl('/authentication/signIn')
    // }else{
    //
    // }
    // this.image=Config.getUrl() + 'user/download/'+this.user.id+'?Authorization='+Config.getLocalStorageToken()
    //   this.userMenu = [{ name: 'Profile',link:'/management/userManagement/detail/'+ this.userId }, { name: 'Log out' }];
    //   if(Config.getLocalStorageToken()!==null){
    //       this.userId=Config.getLocalStorageUserId();
    //       alert(this.userId);
    //       this.userService.getUserById(this.userId).subscribe((res:User) => {
    //           this.user=res;
    //           alert(this.user.userName)
    //       });
    //   }
    if (Config.getLocalStorageToken() == null) {
      this.router.navigateByUrl('/authentication/signIn')

    } else {
      this.user = Config.getLocalStorageUser();
      // if (this.user.image !== null) {
      //   this.image1 = this.user.image.imageData;
      // }
      // if(this.user==null){
      // }else{

      // }
    }


  }

  toggleSidebar(): boolean {
    this.sidebarService.toggle(true, 'menu-sidebar');
    return false;
  }

  toggleSettings(): boolean {
    this.sidebarService.toggle(false, 'settings-sidebar');
    return false;
  }

  goToHome() {
    this.menuService.navigateHome();
  }

  startSearch() {
    this.analyticsService.trackEvent('startSearch');
  }

  clear() {
    let self = this;
    swal({
      title: 'خروج',
      type: 'warning',
      showCloseButton: true,
      confirmButtonColor: '#321834',
      text: 'آیا از خروج اطمینان دارید؟',
      background: '#e4e4e4',
      showCancelButton: true,
      cancelButtonColor: '#321834',
      cancelButtonText: 'خیر',
      confirmButtonText: 'بله'
    }).then((result) => {
      if (result.value) {
        swal(
          'موفق!',
          'با موفقیت خارج شدید',
          'success'
        );
        Config.clearLocalStorageToken();
        self.router.navigateByUrl('/authentication/signIn')
      }
    })

  }
}
