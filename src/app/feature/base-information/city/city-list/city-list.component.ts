import {AfterViewInit, Component, OnInit} from '@angular/core';
import {City} from "../../../../model/baseInformation/city";
import {CityService} from "../../../../service/baseInformation/city.service";
import {ProvinceService} from "../../../../service/baseInformation/province.service";
import {Province} from "../../../../model/baseInformation/province";
import swal from 'sweetalert2'
import {Swal} from "../../../../base/utility/swal";
import {Router} from "@angular/router";
import {Config} from "../../../../configuration/config";
import {FormGroup, FormControl, Validators, FormBuilder} from "@angular/forms";
import {ToastrService} from "ngx-toastr";

declare var $: any;

@Component({
  selector: 'app-city-list',
  templateUrl: './city-list.component.html',
  styleUrls: ['./city-list.component.scss']
})
export class CityListComponent implements OnInit, AfterViewInit {
  city: City = new City();
  cityEdit: City = new City();
  cityList: Array<City> = [];
  mode: string = '';
  provinceList: Array<Province> = [];
  cId: number;
  lat: number = 32.76880048488168;
  lng: number = 54.84375;
  zoom: number = 6;


  saveButton: boolean;
  saveButton2: boolean;
  editForm: FormGroup;
  addForm: FormGroup;

  constructor(private cityService: CityService,
              private provinceService: ProvinceService,
              private router: Router,
              private toastr: ToastrService,
              private fb: FormBuilder) {
    this.addForm = fb.group({
      provinceAdd: new FormControl(null, [Validators.required]),
      cityName: new FormControl(null, [Validators.required]),
    });
    this.editForm = fb.group({
      provinceEdit: new FormControl(null, [Validators.required]),
      cityNameEdit: new FormControl(null, [Validators.required]),
    });
  }

  add() {
    this.mode = 'add';
    this.ngAfterViewInit();
  }

  cancel() {
    this.mode = '';
    this.ngAfterViewInit();
  }

  ngAfterViewInit() {
    window['mThisDonor'] = this;
    $(document).ready(function () {
      $('.js-example-basic-single-Province').select2({
        placeholder: 'استان'
      }).on('change', (e) => {
        window['mThisDonor'].city.province.id = ($(e.currentTarget).val());
        window['mThisDonor'].setProvince();
        window['mThisDonor'].setLocation();
      });
    });
    $(document).ready(function () {
      $('.js-example-basic-single-provinceAdd').select2({
        placeholder: 'استان'
      }).on('change', (e) => {
        window['mThisDonor'].city.province.id = ($(e.currentTarget).val());
        window['mThisDonor'].setLocation();
      });
    });
    $(document).ready(function () {
      $('.js-example-basic-single-provinceEdit').select2({
        placeholder: 'استان'
      }).on('change', (e) => {
        window['mThisDonor'].cityEdit.province.id = ($(e.currentTarget).val());
        window['mThisDonor'].setLocation();
      });
    });
  }

  ngOnInit() {
    if (Config.getLocalStorageToken() == null) {
      this.router.navigateByUrl('/authentication/signIn');
    } else {
      this.provinceService.getAllProvince().subscribe((res: Province[]) => {
        if (res) {
          this.provinceList = res;
          // alert(JSON.stringify(res))
          this.city.province.id = this.provinceList[0].id;
          this.city.province.location.lat = this.provinceList[0].location.lat;
          this.city.province.location.lng = this.provinceList[0].location.lng;

          this.provinceService.getCityByPId(this.city.province.id).subscribe((res: City[]) => {
            if (res) {
              this.cityList = res;
            } else {
              this.toastr.warning('شهری ثبت نشده!','هشدار')
              // this.router.navigateByUrl('/baseInformation/listProvince')
            }
          })
        } else {
          this.toastr.warning('استانی ثبت نشده!','هشدار')
          this.router.navigateByUrl('/baseInformation/listProvince')
        }

      })
    }
  }

  setLocation() {
    this.provinceService.getProvinceById(this.city.province.id).subscribe((res: Province) => {
      // alert(JSON.stringify(res));
      this.city.province.location.lat = res.location.lat;
      this.city.province.location.lng = res.location.lng;
    });
  }

  setProvince() {
    this.provinceService.getCityByPId(this.city.province.id).subscribe((res: City[]) => {
      if (res) {
        // alert(JSON.stringify(res));
        this.cityList = res;
      } else {
        this.cityList = [];
      }
    })
  }

  // setProvinceAdd(event){
  //     this.city.province.id=event;
  // }
  // setProvinceEdit(event){
  //     this.cityEdit.province.id=event;
  // }
  deleteCity(id, i) {
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
        self.cityService.deleteCity(id).subscribe(res => {
          if (res) {
            self.cityList.splice(i, 1);
            self.toastr.success('شهر با موفقیت حذف شد','موفق')
          } else {
            self.toastr.error('هنگام حذف مشکلی رخ داده است','خطا')
          }
        });

      }
    })
  }

  editCity(id) {


    this.ngAfterViewInit()

    this.mode = 'edit';
    // this.userId = id;
    this.cityService.getCityById(id).subscribe((res: City) => {
      // alert(JSON.stringify(res));
      if (res != null) {
        // alert(JSON.stringify(res));
        this.cityEdit = res;
        this.cityEdit.province.id = res.province.id;

      }
    })
  }

  addCity() {
    this.saveButton = true;
    if (
      this.addForm.controls['provinceAdd'].valid
      && this.addForm.controls['cityName'].valid
    ) {
      this.cityService.create(this.city).subscribe((res: City) => {
        if (res != null) {
          this.toastr.success('شهر با موفقیت افزوده شد','موفق')
          // this.provinceDataService.setProvinceOne(res);
          this.mode = '';
          this.ngAfterViewInit();
          this.cityList.push(this.city);
          this.city.name = '';
        }
      });
    }
  }

  updateCity() {
    this.saveButton2 = true;
    if (
      this.addForm.controls['provinceEdit'].valid
      && this.addForm.controls['cityNameEdit'].valid
    ) {
      this.cityService.editCity(this.cityEdit).subscribe(res => {
        if (res) {
          this.toastr.success('شهر با موفقیت ویرایش شد','موفق')
          this.mode = '';
          this.ngAfterViewInit();
          let i = 0;
          for (let item of this.cityList) {
            if (item.id == this.cityEdit.id) {
              this.cId = i;
            } else {
              i++;
            }
          }
          this.cityList.splice(this.cId, 1);
          this.cityList.push(this.cityEdit);
          this.cityEdit = new City();
        }
      });
    }
  }

  mapClicked($event) {
    this.city.location.lat = $event.coords.lat;
    this.city.location.lng = $event.coords.lng;

  }

  mapClickedEdit($event) {
    this.cityEdit.location.lat = $event.coords.lat;
    this.cityEdit.location.lng = $event.coords.lng;


  }

}
