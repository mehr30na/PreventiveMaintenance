import {Component, OnInit} from '@angular/core';
import {Title} from "@angular/platform-browser";
import {Router} from "@angular/router";
import {SignInService} from "../../../service/auth/sign-in.service";
import {SignUpService} from "../../../service/auth/sign-up.service";
import {User} from "../../../model/management/userManagement/user";
import swal from 'sweetalert2'
import {Config} from "../../../configuration/config";
import {UserPass} from "../../../model/helper/userPass";
import {OrganService} from "../../../service/baseInformation/organ.service";
import {Organization} from "../../../model/baseInformation/organization";
import {ToastrService} from "ngx-toastr";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {MyPattern} from "../../../base/helper/myPattern";
import {ResponseContent} from "../../../base/helper/response/response-content";
import { UserService } from '../../../service/management/userManagement/user.service';
declare let $:any;
@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {
  user: User = new User();
  userPassIn: UserPass = new UserPass();
  userPass: UserPass = new UserPass();
  cPassword: string;
  confirmPassword: boolean = false;
  saveButton: boolean;
  saveButton2: boolean;
  form: FormGroup;
  form1: FormGroup;
  captcha:any;
  mode:string='setUserName';
  verification:string;
  timer:number;
  timerInt:any;
  passwordNew:string;
  // user:User=new User();

  constructor(private titleService: Title,
              private router: Router,
              private signInService: SignInService,
              private userService:UserService,
              private organService: OrganService,
              private toastr: ToastrService,
              private fb: FormBuilder,
              private signUpService: SignUpService) {
    this.form = fb.group({
      userName: new FormControl(null, [Validators.pattern(MyPattern.username),Validators.required]),
      password: new FormControl(null,[Validators.pattern(MyPattern.password),Validators.required]),
    });
    this.form1 = fb.group({
      userNameUp: new FormControl(null, [Validators.pattern(MyPattern.username),Validators.required]),
      passwordUp: new FormControl(null, [Validators.pattern(MyPattern.password),Validators.required]),
      cPassword: new FormControl(null, [Validators.pattern(MyPattern.password),Validators.required]),
    });
  }


  ngOnInit() {
    Config.clearLocalStorageToken();
    // setTimeout(function() {
    //     window.location.href = "/#/pages/dashboard";
    // }, 20000);
  }

  checkPass() {
    if (this.cPassword == this.userPass.password) {
      this.confirmPassword = true;
    } else {
      this.toastr.error('تکرار رمز وارد شده صحیح نمی باشد','خطا')
    }
  }


  signIn() {
    this.saveButton = true;
    if (
      this.form.controls['userName'].valid
      && this.form.controls['password'].valid
    ) {
      this.signInService.signIn(this.userPassIn).subscribe((res:ResponseContent) => {
        if (res !== null) {
          this.user = res.data.user;
          this.toastr.success(' موفقیت وارد شدید', 'موفق')
          Config.setLocalStorageUserType(res.data.user.userType.role);
          Config.setLocalStorageToken(res.data.token);
          this.organService.getOrganByUserId(res.data.user.id).subscribe((res: Organization) => {
            this.user.organization = res;
            Config.setLocalStorageUser(this.user);
            this.router.navigateByUrl('pages/dashboard');
            window.location.reload();
          });
          // Config.setLocalStorageUser(this.user);
          // console.log(this.user)

        }
      }, err => {
        if (err.status == 403) {
          this.toastr.error('نام کاربری و یا رمز عبور اشتباه است!', 'خطا')
        }
      })
    }else{
    }
  }
  handleCorrectCaptcha(event) {
    this.captcha=event;
  }


  signUp() {
    this.saveButton2 = true;
    if (
      this.form1.controls['userNameUp'].valid
      && this.form1.controls['passwordUp'].valid
      && this.form1.controls['cPassword'].valid
    ) {
      // alert(JSON.stringify(this.userPass));
      this.signUpService.signUp(this.userPass).subscribe((res:ResponseContent) => {
        if (res !== null) {
          this.toastr.success(' با موفقیت ثبت نام کردید اکنون اطلاعات کاربری خود را کامل کنید', 'موفق')
          Config.setLocalStorageUserId(res.data.user.id.toString());
          Config.setLocalStorageToken(res.data.token);
          Config.setLocalStorageUser(res.data.user);
          // this.router.navigateByUrl('/management/userManagement/listUser');
          this.router.navigate(['/management/userManagement/listUser'], {queryParams: {mode: 'complete'}})
        } else {
          this.toastr.error('ثبت نام با خطا مواجه شد', 'خطا')
        }
      })
    }else{

    }
  }

  goToMode(mode){
    this.mode=mode;
  }

  openModalForget(){
    $('#forgetPassModal').modal();
  }
  confirmUserName(){
    // this.userService.sendUsernameForget(this.userPass.userName).subscribe((res:boolean)=>{
    //   if(res){
        this.goToMode('activeCode')
    //     let self=this;
    //     this.timer=60;
    //     this.timerInt=setInterval(function(){
    //       if(self.timer==1){
    //         clearInterval(self.timerInt)
    //       }
    //       self.timer=self.timer-1;
    //     }, 1000);
    //   }
    // })
  }
  verificate(){
    // this.userService.sendCodeForget(this.userPass.userName,this.verification).subscribe((res:boolean)=>{
      // if(res){
        this.goToMode('changePassword')

      // }
    // })
  }
  setPassword(){
    this.userService.sendNewPass(this.userPass.userName,this.passwordNew).subscribe((res:boolean)=>{
      if(res){
        this.userPassIn.userName=this.userPass.userName;
        this.userPassIn.password=this.passwordNew;
        this.signInService.signIn(this.userPassIn).subscribe((res:ResponseContent) => {
          if (res !== null) {
            this.user = res.data.user;
            this.toastr.success(' موفقیت وارد شدید', 'موفق')
            Config.setLocalStorageUserType(res.data.user.userType.role);
            Config.setLocalStorageToken(res.data.token);
            this.organService.getOrganByUserId(res.data.user.id).subscribe((res: Organization) => {
              this.user.organization = res;
              Config.setLocalStorageUser(this.user);
              this.router.navigateByUrl('pages/dashboard');
              window.location.reload();
            });
            // Config.setLocalStorageUser(this.user);
            // console.log(this.user)

          }
        }, err => {
          if (err.status == 403) {
            this.toastr.error('نام کاربری و یا رمز عبور اشتباه است!', 'خطا')
          }
        })

      }
    })
  }

}
