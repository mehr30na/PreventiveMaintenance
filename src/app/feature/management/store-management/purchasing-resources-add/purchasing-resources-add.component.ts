import {Component, OnInit} from '@angular/core';
import {PurchasingResources} from "../../../../model/management/storeManagement/purchasingResources";
import {Router} from "@angular/router";
import {PurchasingResourcesService} from "../../../../service/management/storeManagement/purchasing-resources.service";
import {Config} from "../../../../configuration/config";
import {Swal} from "../../../../base/utility/swal";
import swal from 'sweetalert2'
import {ToastrService} from "ngx-toastr";
import {Validations} from "../../../../base/utility/validations";
import {isNullOrUndefined} from "util";

@Component({
  selector: 'app-purchasing-resources-add',
  templateUrl: './purchasing-resources-add.component.html',
  styleUrls: ['./purchasing-resources-add.component.scss']
})
export class PurchasingResourcesAddComponent implements OnInit {

  purchasingResources: PurchasingResources = new PurchasingResources();
  purchasingResourcesEdit: PurchasingResources = new PurchasingResources();
  purchasingResourcesList: Array<PurchasingResources> = [];
  mode: string = '';
  mId: number;
  myVal=Validations;

  constructor(private purchasingResourcesService: PurchasingResourcesService,
              private toastr: ToastrService,
              private router: Router) {
  }

  add() {
    this.mode = 'add';
  }

  cancel() {
    this.mode = '';
  }

  ngOnInit() {
    if (Config.getLocalStorageToken() == null) {
      this.router.navigateByUrl('/authentication/signIn');
    } else {
      // this.mode = 'add';
      this.purchasingResourcesService.getAllPurchasingResources().subscribe((res: PurchasingResources[]) => {
        if (res) {
          this.purchasingResourcesList = res;
        } else {
          this.toastr.warning('منبع خریدی ثبت نشده!','هشدار')
        }
      });
    }
    // this.provinceDataService.gettingProvinceOne.subscribe((res:Province)=> {
    //     this.provinceList.push(res);
    // })

  }

  deletePurchasingResources(id, i) {
    let self = this;
    swal({
      title: 'حذف',
      type: 'warning',
      showCloseButton: true,
      confirmButtonColor: '#321834',
      text: 'آیا از حذف اطمینان دارید؟',
      background: '#e4e4e4',
      showCancelButton: true,
      cancelButtonColor: '#321834',
      cancelButtonText: 'خیر',
      confirmButtonText: 'بله'
    }).then((result) => {
      if (result.value) {
        self.purchasingResourcesService.deletePurchasingResources(id).subscribe(res => {
          if (res) {
            self.purchasingResourcesList.splice(i, 1);
            self.toastr.success('منبع خرید با موفقیت حذف شد','موفق')
          } else {
            self.toastr.error('هنگام حذف مشکلی رخ داده است','خطا')
          }
        });

      }
    })
  }

  editPurchasingResources(id) {
    this.mode = 'edit';
    // this.userId = id;
    this.purchasingResourcesService.getPurchasingResourcesById(id).subscribe((res: PurchasingResources) => {
      // alert(JSON.stringify(res));
      if (res != null) {
        this.purchasingResourcesEdit = res;

      }
    })
  }

  addPurchasingResources() {
    if (!isNullOrUndefined(this.purchasingResources.name) &&
      !isNullOrUndefined(this.purchasingResources.contact.phoneNumber) &&
      !isNullOrUndefined(this.purchasingResources.contact.address)) {
      this.purchasingResourcesService.create(this.purchasingResources).subscribe((res: PurchasingResources) => {
        if (res != null) {
          this.toastr.success('منبع خرید با موفقیت افزوده شد', 'موفق')
          // this.provinceDataService.setProvinceOne(res);
          this.mode = '';
          this.purchasingResourcesList.push(res);
          this.purchasingResources = new PurchasingResources();
        }
      });
    }else{
      this.toastr.error('اطلاعات به صورت کامل وارد نشده','خطا')
    }
  }

  updatePurchasingResources() {
    this.purchasingResourcesService.editPurchasingResources(this.purchasingResourcesEdit).subscribe(res => {
      if (res) {
        this.toastr.success('منبع خرید با موفقیت ویرایش شد','موفق')
        this.mode = '';
        let i = 0;
        for (let item of this.purchasingResourcesList) {
          if (item.id == this.purchasingResourcesEdit.id) {
            this.mId = i;
          } else {
            i++;
          }
        }
        this.purchasingResourcesList.splice(this.mId, 1);
        this.purchasingResourcesList.push(this.purchasingResourcesEdit);
        this.purchasingResourcesEdit = new PurchasingResources();
      }
    });
  }


}
