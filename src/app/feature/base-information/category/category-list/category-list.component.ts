import {AfterViewInit, Component, OnInit} from '@angular/core';
import {Category} from "../../../../model/baseInformation/category";
import {CategoryService} from "../../../../service/baseInformation/category.service";
import {Router} from "@angular/router";
import {Config} from "../../../../configuration/config";
import swal from 'sweetalert2'
import {Swal} from "../../../../base/utility/swal";
import {User} from "../../../../model/management/userManagement/user";
import {UserService} from "../../../../service/management/userManagement/user.service";
import {Toolkit} from "../../../../base/utility/toolkit";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {ToastrService} from "ngx-toastr";
import {Validations} from "../../../../base/utility/validations";
import {isNullOrUndefined} from "util";

declare var $: any;

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.scss']
})
export class CategoryListComponent implements OnInit {
  //
  // category: Category = new Category();
  // categoryEdit: Category = new Category();
  // categoryList: Array<Category> = [];
  // expertList: Array<User> = [];
  // categoryListSelect: Array<Category> = [];
  // mode: string = '';
  // user: User = new User();
  //
  // cId: number;
  showSubModal:boolean=false;

  myVal = Validations;
  category:Category=new Category();
  category1:Category=new Category();
  category2:Category=new Category();
  newSub:Category=new Category();
  title:string;



  items1:Array<Category>=[];
  items2:Array<Category>=[];
  items3:Array<Category>=[];

  constructor(private categoryService: CategoryService,
              private router: Router,
              private userService: UserService,
              private toastr: ToastrService,
              private fb: FormBuilder) {

  }

  // add() {
  //   this.mode = 'add';
  //   this.ngAfterViewInit();
  // }

  // cancel() {
  //   this.mode = '';
  //   this.category = new Category();
  //   this.category.parentCategory = new Category();
  //   this.ngAfterViewInit();
  // }

  // ngAfterViewInit() {
  //   // window['mThisDonor'] = this;
  //   // $(document).ready(function () {
  //   //   $('.js-example-basic-single-CategoryExpertEdit').select2({
  //   //     placeholder: 'تعمیرکار'
  //   //   }).on('change', (e) => {
  //   //     window['mThisDonor'].categoryEdit.categoryUsers.id = ($(e.currentTarget).val());
  //   //   });
  //   // });
  //   // $(document).ready(function () {
  //   //   $('.js-example-basic-single-ExpertSelect').select2({
  //   //     placeholder: 'تعمیرکار'
  //   //   }).on('change', (e) => {
  //   //     window['mThisDonor'].category.categoryUsers.id = ($(e.currentTarget).val());
  //   //   });
  //   // });
  //   // $(document).ready(function () {
  //   //   $('.js-example-basic-single-CategoryParentIdEdit').select2({
  //   //     placeholder: 'دسته بندی والد'
  //   //   }).on('change', (e) => {
  //   //     window['mThisDonor'].categoryEdit.parentCategory.id = ($(e.currentTarget).val());
  //   //   });
  //   // });
  //   // $(document).ready(function () {
  //   //   $('.js-example-basic-single-CategoryParentId').select2({
  //   //     placeholder: 'دسته بندی والد'
  //   //   }).on('change', (e) => {
  //   //     window['mThisDonor'].category.parentCategory.id = ($(e.currentTarget).val());
  //   //   });
  //   // });
  //   // $(document).ready(function () {
  //   //   $('.js-example-basic-single-CategorySelect').select2({
  //   //     placeholder: 'دسته بندی والد'
  //   //   }).on('change', (e) => {
  //   //     window['mThisDonor'].category.parentCategory.id = ($(e.currentTarget).val());
  //   //     window['mThisDonor'].setCategoryList(window['mThisDonor'].category.parentCategory.id)
  //   //   });
  //   // });
  //   //
  //   // $(document).ready(function () {
  //   //   $('.expert-list').select2({
  //   //     placeholder: 'کارشناس'
  //   //   }).on('change', (e) => {
  //   //     // console.log(e)
  //   //     window['mThisDonor'].category.categoryUsers =
  //   //       Toolkit.changeSelectedListCat(
  //   //         window['mThisDonor'].expertList,
  //   //         window['mThisDonor'].category.categoryUsers,
  //   //         $(e.currentTarget).val()
  //   //       );
  //   //     // alert(JSON.stringify($(e.currentTarget).val()))
  //   //   });
  //   // });
  //   // $(document).ready(function () {
  //   //   $('.expert-list-edit').select2({
  //   //     placeholder: 'کارشناس'
  //   //   }).on('change', (e) => {
  //   //     window['mThisDonor'].categoryEdit.categoryUsers =
  //   //       Toolkit.changeSelectedListCat(
  //   //         window['mThisDonor'].expertList,
  //   //         window['mThisDonor'].categoryEdit.categoryUsers,
  //   //         $(e.currentTarget).val()
  //   //       );
  //   //   });
  //   // });
  // }

  ngOnInit() {
    if (!Config.getLocalStorageToken()) {
      this.router.navigateByUrl('/authentication/signIn')
    }else{
      this.categoryService.getAllCategory().subscribe((res: Category[]) => {
         if (res) {
           for(let i=0;i<3;i++){
             if(i==0){
               this.category=res[0];
             }else if(i==1){
               this.category1=res[1];
             }else if(i==2){
               this.category2=res[2];
             }
           }
         }
          });
    }
    // if (this.category.parentCategory == null) {
    //   this.category.parentCategory = new Category();
    // }
    // if (Config.getLocalStorageToken() == null) {
    //   this.router.navigateByUrl('/authentication/signIn');
    // } else {
    //   // this.mode = 'add';
    //   this.categoryService.getAllCategory().subscribe((res: Category[]) => {
    //     if (res) {
    //       this.categoryList = res;
    //     } else {
    //       this.toastr.warning('دسته بندی ثبت نشده!', 'هشدار')
    //     }
    //   });
    //   this.user = Config.getLocalStorageUser();
    //   if (this.user.organization) {
    //     if (this.user.organization.id !== null) {
    //       this.getAllExpert(this.user.organization.id)
    //     }
    //   }
    //
    //
    // }
    // this.provinceDataService.gettingProvinceOne.subscribe((res:Province)=> {
    //     this.provinceList.push(res);
    // })

  }

  newSubCategory(parent:Category) {
    this.title=parent.persianName;
    this.newSub=new Category();
    this.newSub.parentId=parent.id;
    this.newSub.image=parent.image;
    this.showSubModal=true;
  }
  deleteCategory(i, item) {
    let self = this;
    swal({
      title: 'حذف',
      type: 'warning',
      showCloseButton: true,
      confirmButtonColor: '#E91E63',
      background: '#e4e4e4',
      showCancelButton: true,
      cancelButtonColor: '#2196F3',
      cancelButtonText: 'خیر',
      confirmButtonText: 'بله'
    }).then((result) => {
      if (result.value) {
        if(item.parentId==self.category.id){
          self.categoryService.deleteCategory(item.id).subscribe(res=>{
            if(res){
              self.toastr.success('زیر دسته با موفقیت حذف شد','موفق');
              self.items1.splice(i,1)
            }else{
              self.toastr.error('هنگام حذف مشکلی رخ داده است','خطا');
            }
          })
        }else if(item.parentId==self.category1.id){
          self.categoryService.deleteCategory(item.id).subscribe(res=>{
            if(res){
              self.toastr.success('زیر دسته با موفقیت حذف شد','موفق');
              self.items2.splice(i,1)
            }else{
              self.toastr.error('هنگام حذف مشکلی رخ داده است','خطا');
            }
          })
        }else if(item.parentId==self.category2.id){
          self.categoryService.deleteCategory(item.id).subscribe(res=>{
            if(res){
              self.toastr.success('زیر دسته با موفقیت حذف شد','موفق');
              self.items3.splice(i,1)
            }else{
              self.toastr.error('هنگام حذف مشکلی رخ داده است','خطا');
            }
          })
        }
      }
    })
  }

  addSubCategory(){
    this.categoryService.create(this.newSub).subscribe((res:Category)=>{
      if(res){
        if(this.newSub.parentId==this.category.id){
          this.items1.push(res)
          this.toastr.success('زیر دسته با موفقیت افزوده شد','موفق')
          this.showSubModal=false;
        }else if(this.newSub.parentId==this.category1.id){
          this.items2.push(res)
          this.toastr.success('زیر دسته با موفقیت افزوده شد','موفق')
          this.showSubModal=false;
        }else if(this.newSub.parentId==this.category2.id){
          this.items3.push(res)
          this.toastr.success('زیر دسته با موفقیت افزوده شد','موفق')
          this.showSubModal=false;
        }
      }else{
        this.toastr.error('هنگام افزودن زیر دسته مشکلی رخ داده است','خطا');
      }
    })
  }

































  // getAllExpert(organId) {
  //   this.userService.getAllExpert(organId).subscribe((res: User[]) => {
  //     if (res) {
  //       this.expertList = res;
  //     } else {
  //       this.toastr.warning('کارشناس ثبت نشده!', 'هشدار')
  //     }
  //   });
  // }
  //
  // deleteCategory(id, i) {
  //   let self = this;
  //   swal({
  //     name: 'حذف',
  //     type: 'warning',
  //     showCloseButton: true,
  //     confirmButtonColor: '#321834',
  //     text: 'آیا از حذف اطمینان دارید؟',
  //     background: '#e4e4e4',
  //     showCancelButton: true,
  //     cancelButtonColor: '#321834',
  //     cancelButtonText: 'خیر',
  //     confirmButtonText: 'بله'
  //   }).then((result) => {
  //     if (result.value) {
  //       self.categoryService.deleteCategory(id).subscribe(res => {
  //         if (res) {
  //           self.categoryList.splice(i, 1);
  //           self.toastr.success('دسته بندی با موفقیت حذف شد', 'موفق')
  //         } else {
  //           self.toastr.error('هنگام حذف مشکلی رخ داده است', 'خطا')
  //         }
  //       });
  //
  //     }
  //   })
  // }
  //
  // editCategory(id) {
  //   this.mode = 'edit';
  //   this.ngAfterViewInit();
  //   // this.userId = id;
  //   this.categoryService.getCategoryById(id).subscribe((res: Category) => {
  //     console.log(res);
  //     if (res != null) {
  //       if (res.parentCategory == null) {
  //         res.parentCategory = new Category();
  //       }
  //       if (res.categoryUsers) {
  //         this.addExitList(res.categoryUsers);
  //       }
  //       this.categoryEdit = res;
  //     }
  //   })
  // }
  //
  // addExitList(list) {
  //   let self = this;
  //   $(document).ready(function () {
  //     $('.expert-list-edit').select2({
  //       placeholder: 'لیست امکانات'
  //     }).on('change', (e) => {
  //
  //     });
  //     for (let item of list) {
  //       const newOption = new Option(item.userName, item.id.toString(), true, true);
  //       $('.expert-list-edit').append(newOption).trigger('change');
  //     }
  //   });
  // }
  //
  // addCategory() {
  //   // console.log(this.category);
  //   if (!isNullOrUndefined(this.category.name) &&
  //     !isNullOrUndefined(this.category.parentCategory.id) &&
  //     !isNullOrUndefined(this.category.description)) {
  //     this.categoryService.create(this.category).subscribe((res: Category) => {
  //       if (res != null) {
  //         this.toastr.success('دسته بندی با موفقیت افزوده شد', 'موفق')
  //         // this.provinceDataService.setProvinceOne(res);
  //         this.mode = '';
  //         this.categoryList.push(res);
  //         this.category = new Category();
  //         this.category.parentCategory = new Category()
  //         this.ngAfterViewInit();
  //         Toolkit.resetSelectedList('.expert-list');
  //       }
  //     });
  //   } else {
  //     this.toastr.error('اطلاعات به صورت کامل وارد نشده', 'خطا')
  //   }
  // }
  //
  // updateCategory() {
  //   if (!isNullOrUndefined(this.categoryEdit.name) &&
  //     !isNullOrUndefined(this.categoryEdit.parentCategory.id) &&
  //     !isNullOrUndefined(this.categoryEdit.description)) {
  //     this.categoryService.editCategory(this.categoryEdit).subscribe(res => {
  //       if (res) {
  //         this.toastr.success('دسته بندی با موفقیت ویرایش شد', 'موفق')
  //         this.mode = '';
  //         this.ngAfterViewInit();
  //         let i = 0;
  //         for (let item of this.categoryList) {
  //           if (item.id == this.categoryEdit.id) {
  //             this.cId = i;
  //           } else {
  //             i++;
  //           }
  //         }
  //         this.categoryList.splice(this.cId, 1);
  //         this.categoryList.push(this.categoryEdit);
  //         this.categoryEdit = new Category();
  //         this.categoryEdit.parentCategory = new Category();
  //         Toolkit.resetSelectedList('.expert-list');
  //       }
  //     });
  //   } else {
  //     this.toastr.error('اطلاعات به صورت کامل وارد نشده', 'خطا')
  //   }
  // }
  //
  // setCategoryList(parentId) {
  //   this.categoryService.getChildrenById(parentId).subscribe((res: Category[]) => {
  //     if (res) {
  //       this.categoryList = res;
  //     } else {
  //       this.categoryList = [];
  //     }
  //
  //   })
  // }

  // setParent(event){
  //     this.category.parentCategory.id=event;
  // }
  // setExpert(event){
  //     this.category.expert.id=event;
  // }
  // setParentEdit(event){
  //     this.categoryEdit.parentCategory.id=event;
  // }
  // setExpertEdit(event){
  //     this.categoryEdit.expert.id=event;
  // }

}
