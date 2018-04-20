import {Component, ElementRef, NgZone, OnInit, ViewChild} from '@angular/core';
import {Province} from "../../../../model/baseInformation/province";
import {ProvinceService} from "../../../../service/baseInformation/province.service";
import swal from 'sweetalert2'
import {Swal} from "../../../../base/utility/swal";
import {Router} from "@angular/router";
import {Config} from "../../../../configuration/config";
import {Location} from "../../../../model/location";
import {Validations} from "../../../../base/utility/validations";
import {isNullOrUndefined, isUndefined} from "util";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-province-list',
  templateUrl: './province-list.component.html',
  styleUrls: ['./province-list.component.scss']
})
export class ProvinceListComponent implements OnInit {
  province: Province = new Province();
  provinceEdit: Province = new Province();
  provinceList: Array<Province> = [];
  mode: string = '';
  lat: number = 32.76880048488168;
  lng: number = 54.84375;
  zoom: number = 6;
  pId: number;
  myVal=Validations;

  constructor(private provinceService: ProvinceService,
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
      this.provinceService.getAllProvince().subscribe((res: Province[]) => {
        if (res) {
          this.provinceList = res;
          for (let item of res) {
            if (item.location == null) {
              item.location = new Location();
            }
          }
        } else {
          this.toastr.warning('استانی ثبت نشده','هشدار')
        }
      });
    }
    // this.provinceDataService.gettingProvinceOne.subscribe((res:Province)=> {
    //     this.provinceList.push(res);
    // })

  }

  private setCurrentPosition() {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.province.location.lat = position.coords.latitude;
        this.province.location.lng = position.coords.longitude;
        this.zoom = 6;
      });
    }
  }

  deleteProvince(id, i) {
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
        self.provinceService.deleteProvince(id).subscribe(res => {
          if (res) {
            self.provinceList.splice(i, 1);
            self.toastr.success('استان با موفقیت حذف شد','موفق')
          } else {
            self.toastr.error('هنگام حذف مشکلی رخ داده است','خطا')
          }
        });

      }
    })
  }

  editProvince(id) {
    this.mode = 'edit';
    // this.userId = id;
    this.provinceService.getProvinceById(id).subscribe((res: Province) => {
      // alert(JSON.stringify(res));
      if (res != null) {
        this.provinceEdit = res;

      }
    })
  }

  addProvince() {
    if(!isNullOrUndefined(this.province.name)){
      this.provinceService.create(this.province).subscribe((res: Province) => {
        if (res != null) {
          this.toastr.success('استان با موفقیت افزوده شد','موفق')
          // alert(JSON.stringify(res));
          // this.provinceDataService.setProvinceOne(res);
          this.mode = '';
          this.provinceList.push(res);
          this.province = new Province();
        }
      });
    }else{
      this.toastr.error('اطلاعات به صورت کامل وارد نشده','خطا')
    }

  }

  updateProvince() {
    this.provinceService.editProvince(this.provinceEdit).subscribe(res => {
      if (res) {
        this.toastr.success('استان با موفقیت ویرایش شد','موفق')
        this.mode = '';
        let i = 0;
        for (let item of this.provinceList) {
          if (item.id == this.provinceEdit.id) {
            this.pId = i;
          } else {
            i++;
          }
        }
        this.provinceList.splice(this.pId, 1);
        this.provinceList.push(this.provinceEdit);
        this.provinceEdit = new Province();
      }
    });
  }

  mapClicked($event) {
    this.province.location.lat = $event.coords.lat;
    this.province.location.lng = $event.coords.lng;

  }

  mapClickedEdit($event) {
    this.provinceEdit.location.lat = $event.coords.lat;
    this.provinceEdit.location.lng = $event.coords.lng;


  }


}
