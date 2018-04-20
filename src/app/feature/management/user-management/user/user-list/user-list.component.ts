import {AfterViewInit, Component, OnInit} from '@angular/core';
import {UserService} from "../../../../../service/management/userManagement/user.service";
import {User} from "../../../../../model/management/userManagement/user";
import swal from 'sweetalert2'
import {UserDataService} from "../user-data.service";
import {Contact} from "../../../../../model/contact";
import {UserType} from "../../../../../model/management/userManagement/userType";
import {RoleService} from "../../../../../service/management/userManagement/role.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Config} from "../../../../../configuration/config";
import {Toolkit} from "../../../../../base/utility/toolkit";
import {ImageStatus} from "../../../../../base/helper/enum/ImageStatus";
import {Organization} from "../../../../../model/baseInformation/organization";
import {OrganService} from "../../../../../service/baseInformation/organ.service";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {MyPattern} from "../../../../../base/helper/myPattern";
import {ToastrService} from "ngx-toastr";
import {Validations} from "../../../../../base/utility/validations";
import {isNullOrUndefined} from "util";

declare var $: any;

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit, AfterViewInit {
  mode: string = '';
  userId: number;
  infoDisable: boolean = false;
  contactDisable: boolean = true;
  profileDisable: boolean = true;
  infoEditDisable: boolean = false;
  contactEditDisable: boolean = true;
  profileEditDisable: boolean = true;
  infoCompleteDisable: boolean = false;
  contactCompleteDisable: boolean = true;
  profileCompleteDisable: boolean = true;
  cPassword: string;
  confirmPassword: boolean = false;
  userTypeList: Array<UserType>;
  organList: Array<Organization>;
  user: User = new User();
  userEdit: User = new User();
  userComplete: User = new User();
  userList: Array<User> = [];


  saveButton: boolean;
  saveButton2: boolean;
  saveButton3: boolean;
  editForm: FormGroup;
  addForm: FormGroup;
  completeForm: FormGroup;
  myVal=Validations;
  myConfig=Config;
  public mask = [/\d/, /\d/, /\d/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/];
  constructor(private userService: UserService,
              private userDataService: UserDataService,
              private roleService: RoleService,
              private route: ActivatedRoute,
              private router: Router,
              private fb: FormBuilder,
              private toastr: ToastrService,
              private organService: OrganService) {
  }

  cancel() {
    this.mode = '';
    this.ngAfterViewInit()
  }

  ngAfterViewInit() {
    window['mThisDonor'] = this;
    $(document).ready(function () {
      $('.js-example-basic-single-UserTypeEdit').select2({
        placeholder: 'سطح دسترسی'
      }).on('change', (e) => {
        window['mThisDonor'].userEdit.userType.id = ($(e.currentTarget).val());
      });
    });

    $(document).ready(function () {
      $('.js-example-basic-single-organEdit').select2({
        placeholder: 'سازمان'
      }).on('change', (e) => {
        window['mThisDonor'].userEdit.organization.id = ($(e.currentTarget).val());
      });
    });
    $(document).ready(function () {
      $('.js-example-basic-single-userTypeComplete').select2({
        placeholder: 'سطح دسترسی'
      }).on('change', (e) => {
        window['mThisDonor'].userComplete.userType.id = ($(e.currentTarget).val());
      });
    });

    $(document).ready(function () {
      $('.js-example-basic-single-organComplete').select2({
        placeholder: 'سازمان'
      }).on('change', (e) => {
        window['mThisDonor'].userComplete.organization.id = ($(e.currentTarget).val());
      });
    });
    $(document).ready(function () {
      $('.js-example-basic-single-organ').select2({
        placeholder: 'سازمان'
      }).on('change', (e) => {
        window['mThisDonor'].user.organization.id = ($(e.currentTarget).val());
      });
    });
    $(document).ready(function () {
      $('.js-example-basic-single-userType').select2({
        placeholder: 'سطح دسترسی'
      }).on('change', (e) => {
        window['mThisDonor'].user.userType.id = ($(e.currentTarget).val());
      });
    });
  }

  ngOnInit() {
    // ************************localStorage*********************
    if (JSON.parse(localStorage.getItem('userForm')) !== null) {
      this.user = JSON.parse(localStorage.getItem('userForm'));

    }
    // this.user.userContact=new Contact();
    // this.user.userType=new UserType();
    // this.user.image=new Image();
    // this.userEdit.userContact=new Contact();
    // this.userEdit.userType=new UserType();
    // this.userEdit.image=new Image();
    // this.userComplete.userContact=new Contact();
    // this.userComplete.userType=new UserType();
    // this.userComplete.image=new Image();
    if (Config.getLocalStorageToken() == null) {
      this.router.navigateByUrl('/authentication/signIn');
    } else {
      this.route.queryParams.subscribe(params => {
        if (params['mode'] == 'complete') {
          this.mode = 'complete';
          this.userId = Config.getLocalStorageUserId();
          if (Config.getLocalStorageUserId() != null) {
            this.userService.getUserById(this.userId).subscribe((res: User) => {
              if (res != null) {
                if (this.userComplete.userContact == null) {
                  this.userComplete.userContact = new Contact();
                }
                if (this.userComplete.organization == null) {
                  this.userComplete.organization = new Organization();
                }
                if (this.userComplete.userType == null) {
                  this.userComplete.userType = new UserType();
                }
                if (this.userComplete.image == null) {
                  // this.userComplete.image = new Image();
                }
                this.userComplete = res;
              }
            })
          }
        }
      });

      this.userService.getAllUser().subscribe((res: User[]) => {
        if (res) {
          for (let item of res) {
            if (item.userContact == null) {
              item.userContact = new Contact();
            }
            if (item.organization == null) {
              item.organization = new Organization();
            }
            if (item.userType == null) {
              item.userType = new UserType();
            }
            if (item.image == null) {
              // item.image = new Image();
            }
          }
          this.userList = res;
          // alert(JSON.stringify(res))
        } else {
          this.toastr.warning('کاربری ثبت نشده!','هشدار')
        }
      });
      this.userDataService.gettingUserOne.subscribe((res: User) => {
        if (res != null)
          this.userList.push(res);
      });
      this.roleService.getAllRole().subscribe((res: UserType[]) => {
        this.userTypeList = res;
      });
      this.organService.getAllOrgan().subscribe((res: Organization[]) => {
        this.organList = res;
      })
    }


  }

  editUser(id) {

    this.mode = 'edit';
    this.ngAfterViewInit();
    this.userService.getUserById(id).subscribe((res: User) => {
      if (res != null) {
        // alert(JSON.stringify(res));
        this.userEdit = res;
        if (this.userEdit.userContact == null) {
          this.userEdit.userContact = new Contact();
        }
        if (this.userEdit.organization == null) {
          this.userEdit.organization = new Organization();
        }
        if (this.userEdit.image == null) {
          // this.userEdit.image = new Image();
        }else{
          this.userEdit.imageUrl=Config.getUrl()+this.userEdit.image.imageData+'?Authorization='+Config.getLocalStorageToken();
        }
        if (this.userEdit.userType == null) {
          this.userEdit.userType = new UserType();
        }

      }
    })
  }

  deleteUser(id, i) {
    let self = this;
    swal({
      title: 'حذف',
      type: 'warning',
      text: 'آیا از حذف اطمینان دارید؟',
      showCloseButton: true,
      confirmButtonColor: '#321834',
      background: '#e4e4e4',
      showCancelButton: true,
      cancelButtonColor: '#321834',
      cancelButtonText: 'خیر',
      confirmButtonText: 'بله'
    }).then((result) => {
      if (result.value) {
        self.userService.deleteUser(id).subscribe(res => {
          if (res) {
            self.userList.splice(i, 1);
            self.toastr.success('کاربر با موفقیت حذف شد','موفق')
          } else {
            self.toastr.error('هنگام حذف مشکلی رخ داده است','خطا')
          }
        });

      }
    })

  }

  // *************************userAdd*****************************

  addUser() {
    if (!isNullOrUndefined(this.user.name)&&
      !isNullOrUndefined(this.user.family)&&
      !isNullOrUndefined(this.user.fatherName) &&
      !isNullOrUndefined(this.user.userName)&&
      !isNullOrUndefined(this.user.birthDay)&&
      !isNullOrUndefined(this.user.password)&&
      !isNullOrUndefined(this.cPassword)&&
      !isNullOrUndefined(this.user.userContact.phoneNumber)&&
      !isNullOrUndefined(this.user.userContact.email)&&
      !isNullOrUndefined(this.user.userContact.address)&&
      !isNullOrUndefined(this.user.startWork)) {
      this.userService.create(this.user).subscribe((res: User) => {

        if (res != null) {
          this.toastr.success('کاربر با موفقیت افزوده شد','موفق');
          this.userDataService.setUserOne(res);
          this.mode = '';
          this.user = new User();
          this.openTab('info');
          localStorage.removeItem('userForm')
        }
      });
    }else{
      this.toastr.error('اطلاعات به صورت کامل وارد نشده است. لطفا اطلاعات خود را تکمیل کنید','خطا')
    }
  }

  edit() {
    if (!isNullOrUndefined(this.userEdit.name)&&
      !isNullOrUndefined(this.userEdit.family)&&
      !isNullOrUndefined(this.userEdit.fatherName) &&
      !isNullOrUndefined(this.userEdit.userName)&&
      !isNullOrUndefined(this.userEdit.birthDay)&&
      !isNullOrUndefined(this.userEdit.userContact.phoneNumber)&&
      !isNullOrUndefined(this.userEdit.userContact.email)&&
      !isNullOrUndefined(this.userEdit.userContact.address)&&
      !isNullOrUndefined(this.userEdit.startWork)) {
      this.userService.editUser(this.userEdit).subscribe(res => {
        if (res) {
          this.toastr.success('کاربر با موفقیت ویرایش شد', 'موفق')
          // this.router.navigate(['/management/userManagement/listUser'])
          this.mode = '';
        }
      });
    }else{
      this.toastr.error('اطلاعات به صورت کامل وارد نشده است. لطفا اطلاعات خود را تکمیل کنید','خطا')
    }
  }

  complete() {
    if (!isNullOrUndefined(this.userComplete.name)&&
      !isNullOrUndefined(this.userComplete.family)&&
      !isNullOrUndefined(this.userComplete.fatherName) &&
      !isNullOrUndefined(this.userComplete.userName)&&
      !isNullOrUndefined(this.userComplete.birthDay)&&
      !isNullOrUndefined(this.userComplete.userContact.phoneNumber)&&
      !isNullOrUndefined(this.userComplete.userContact.email)&&
      !isNullOrUndefined(this.userComplete.userContact.address)&&
      !isNullOrUndefined(this.userComplete.startWork)) {
      // alert(JSON.stringify(this.userComplete));
      this.userService.editUser(this.userComplete).subscribe(res => {
        if (res) {
          this.toastr.success('اطلاعات کاربر با موفقیت تکمیل شد','موفق')
          this.ngAfterViewInit()
          this.mode = '';
          this.router.navigateByUrl('pages/dashboard')
        }
      });
    }else{
      this.toastr.error('اطلاعات به صورت کامل وارد نشده است. لطفا اطلاعات خود را تکمیل کنید','خطا')
    }
  }

  setUserType(event) {
    this.user.userType.id = event;
  }

  setUserTypeEdit(event) {
    this.userEdit.userType.id = event;
  }

  setOrgan(event) {
    this.user.organization.id = event;
  }

  setOrganEdit(event) {
    this.userEdit.organization.id = event;
  }

  setOrganComplete(event) {
    this.userComplete.organization.id = event;
  }


  openTab(tabName) {
    if (tabName == 'contact') {
      this.contactDisable = false;
    }
    if (tabName == 'profile') {
      this.profileDisable = false;
    }
    if (tabName == 'contactEdit') {
      this.contactEditDisable = false;
    }
    if (tabName == 'profileEdit') {
      this.profileEditDisable = false;
    }
    if (tabName == 'contactComplete') {
      this.contactCompleteDisable = false;
    }
    if (tabName == 'profileComplete') {
      this.profileCompleteDisable = false;
    }
    // Declare all variables
    var i, tabcontent, tablinks;

    // Get all elements with class="tabcontent" and hide them
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
      tabcontent[i].style.display = "none";
    }

    // Get all elements with class="tablinks" and remove the class "active"
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
      tablinks[i].className = tablinks[i].className.replace(" active", "");
    }

    // Show the current tab, and add an "active" class to the button that opened the tab
    document.getElementById(tabName).style.display = "block";
    // evt.currentTarget.className += " active";
  }

  fileChangeListener($event, user) {
    const image = new Image();
    const file = $event.target.files[0];
    const myReader: FileReader = new FileReader();
    const that = this;
    myReader.onloadend = function (loadEvent: any) {
      image.src = loadEvent.target.result;
      // that.cropper2.setImage(image);
      user.imageUrl = image.src;
      user.image.size = file.size;
      const n = user.imageUrl.search(';base64,');
      user.image.extension = '.' + user.imageUrl.substring(11, n);
      user.image.imageData = user.imageUrl.substring(n + 8, user.imageUrl.length);
      user.image.imageStatus = ImageStatus.NEW_IMAGE;

    };
    myReader.readAsDataURL(file);


  }

  checkPass() {
    if (this.cPassword == this.user.password) {
      this.confirmPassword = true;
    } else {
      this.toastr.error('رمز های وارد شده منطبق نیستند لطفا رمز های خود را بررسی کنید','خطا')
    }
  }


  search(nationalCode: string) {
    nationalCode = Toolkit.Fa2En(nationalCode);
    let TestNationalCode: boolean;
    TestNationalCode = Toolkit.checkCodeMeli(nationalCode.toString());

    if (TestNationalCode === true) {
      this.userService.checkNational(nationalCode).subscribe(res => {
        if (res) {

        } else {
          this.toastr.error('کد ملی وارد شده موجود است','خطا')
        }
      })

    } else {
      this.toastr.error('کد ملی وارد شده صحیح نیست','خطا')
    }


  }

  add() {
    this.mode = 'add';
    this.ngAfterViewInit();
  }

  storage() {
    localStorage.setItem('userForm', JSON.stringify(this.user));
  }
}
