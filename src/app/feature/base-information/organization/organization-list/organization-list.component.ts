import {AfterViewInit, Component, OnInit} from '@angular/core';
import {Organization} from "../../../../model/baseInformation/organization";
import {ProvinceService} from "../../../../service/baseInformation/province.service";
import {CityService} from "../../../../service/baseInformation/city.service";
import {OrganService} from "../../../../service/baseInformation/organ.service";
import {Province} from "../../../../model/baseInformation/province";
import {City} from "../../../../model/baseInformation/city";
import swal from 'sweetalert2'
import {Router} from "@angular/router";
import {Swal} from "../../../../base/utility/swal";
import {Location} from "../../../../model/location";
import {Config} from "../../../../configuration/config";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {ToastrService} from "ngx-toastr";

declare let $: any;

@Component({
  selector: 'app-organization-list',
  templateUrl: './organization-list.component.html',
  styleUrls: ['./organization-list.component.scss']
})
export class OrganizationListComponent implements OnInit, AfterViewInit {
  organ: Organization = new Organization();
  organEdit: Organization = new Organization();
  provinceList: Array<Province> = [];
  cityList: Array<City> = [];
  organList: Array<Organization> = [];
  organListSelect: Array<Organization> = [];
  // province:Province=new Province()
  mode: string = '';
  private oId: number;
  lat: number = 32.76880048488168;
  lng: number = 54.84375;
  zoom: number = 9;
  saveButton: boolean;
  saveButton2: boolean;
  form: FormGroup;
  editForm: FormGroup;
  addForm: FormGroup;

  constructor(private provinceService: ProvinceService,
              private cityService: CityService,
              private organService: OrganService,
              private router: Router,
              private toastr: ToastrService,
              private fb: FormBuilder) {
    // this.form = fb.group({
    //   province: new FormControl(null, [Validators.required]),
    //   city: new FormControl(null, [Validators.required]),
    //   parentOrgan: new FormControl(null, [Validators.required]),
    //
    // });
    this.addForm = fb.group({
      addProvince: new FormControl(null, [Validators.required]),
      addCity: new FormControl(null, [Validators.required]),
      parentOrgan: new FormControl(null, [Validators.required]),
      organName: new FormControl(null, [Validators.required]),
      organCode: new FormControl(null, [Validators.required]),

    });
    this.editForm = fb.group({
      editProvince: new FormControl(null, [Validators.required]),
      editCity: new FormControl(null, [Validators.required]),
      parentIdEdit: new FormControl(null, [Validators.required]),
      editOrganName: new FormControl(null, [Validators.required]),
      editCode: new FormControl(null, [Validators.required]),

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
      $('.js-example-basic-single-OrganizationCity').select2({
        placeholder: 'شهر'
      }).on('change', (e) => {
        window['mThisDonor'].organ.city.id = ($(e.currentTarget).val());
        window['mThisDonor'].setCity();
        window['mThisDonor'].setLocation();
      });
    });
    $(document).ready(function () {
      $('.js-example-basic-single-OrganizationFormCity').select2({
        placeholder: 'شهر'
      }).on('change', (e) => {
        window['mThisDonor'].organ.city.id = ($(e.currentTarget).val());
        window['mThisDonor'].setCity();
        window['mThisDonor'].setLocation();
      });
    });
    $(document).ready(function () {
      $('.js-example-basic-single-OrganizationFormCityEdit').select2({
        placeholder: 'شهر'
      }).on('change', (e) => {
        window['mThisDonor'].organEdit.city.id = ($(e.currentTarget).val());
        window['mThisDonor'].setCityEdit();
        window['mThisDonor'].setLocationEdit();
      });
    });

    $(document).ready(function () {
      $('.js-example-basic-single-OrganizationProvince').select2({
        placeholder: 'استان'
      }).on('change', (e) => {
        window['mThisDonor'].organ.province.id = ($(e.currentTarget).val());
        window['mThisDonor'].setProvince();
      });
    });
    $(document).ready(function () {
      $('.js-example-basic-single-OrganizationFormProvince').select2({
        placeholder: 'استان'
      }).on('change', (e) => {
        window['mThisDonor'].organ.province.id = ($(e.currentTarget).val());
        window['mThisDonor'].setProvince();
      });
    });
    $(document).ready(function () {
      $('.js-example-basic-single-OrganizationFormProvinceEdit').select2({
        placeholder: 'استان'
      }).on('change', (e) => {
        window['mThisDonor'].organEdit.province.id = ($(e.currentTarget).val());
        window['mThisDonor'].setProvinceEdit();
      });
    });


    $(document).ready(function () {
      $('.js-example-basic-single-OrganizationFormOrganizationParent').select2({
        placeholder: 'سازمان والد'
      }).on('change', (e) => {
        window['mThisDonor'].organ.parentOrgan.id = ($(e.currentTarget).val());
      });
    });
    $(document).ready(function () {
      $('.js-example-basic-single-OrganizationFormOrganizationParentList').select2({
        placeholder: 'سازمان والد'
      }).on('change', (e) => {
        window['mThisDonor'].organ.parentOrgan.id = ($(e.currentTarget).val());
        window['mThisDonor'].getChildOrgan(window['mThisDonor'].organ.parentOrgan.id)
      });
    });
    $(document).ready(function () {
      $('.js-example-basic-single-OrganizationFormOrganizationParentEdit').select2({
        placeholder: 'سازمان والد'
      }).on('change', (e) => {
        window['mThisDonor'].organEdit.parentOrgan.id = ($(e.currentTarget).val());
      });
    });


  }

  ngOnInit() {
    if (Config.getLocalStorageToken() == null) {
      this.router.navigateByUrl('/authentication/signIn');
    } else {
      this.organ.parentOrgan = new Organization();
      this.organ.organLocation = new Location();
      this.provinceService.getAllProvince().subscribe((res: Province[]) => {
        if (res) {

          for (let item of res) {
            if (item.location == null) {
              item.location = new Location();
            }
          }
          this.provinceList = res;
          this.organ.province.id = this.provinceList[0].id;
          this.provinceService.getCityByPId(this.organ.province.id).subscribe((res: City[]) => {
            if (res) {

              for (let item of res) {
                if (item.location == null) {
                  item.location = new Location();
                }
                if (item.province == null) {
                  item.province = new Province();
                }
                if (item.province.location == null) {
                  item.province.location = new Location();
                }
              }
              this.cityList = res;
              this.organ.city.id = this.cityList[0].id;
              this.organ.city.location = this.cityList[0].location;
              this.cityService.getOrganByPId(this.organ.city.id).subscribe((res: Organization[]) => {
                if (res) {

                  for (let item of res) {
                    // alert(JSON.stringify(item.organLocation))
                    if (item.organLocation == null) {
                      item.organLocation = new Location();
                    }
                    if (item.city == null) {
                      item.city = new City();
                    }
                    if (item.city.province.location == null) {
                      item.city.province.location = new Location();
                    }
                    if (item.city.location == null) {
                      item.city.location = new Location();
                    }
                  }
                  this.organList = res;
                } else {
                  this.toastr.warning('سازمانی ثبت نشده!','هشدار')
                }
              })
            } else {
              this.toastr.warning('شهری ثبت نشده!','هشدار')
            }
          })
        } else {
          this.toastr.warning('استانی ثبت نشده!','هشدار')
          // this.router.navigateByUrl('/baseInformation/listProvince')
        }

      })
    }
  }

  setProvince() {
    this.provinceService.getCityByPId(this.organ.province.id).subscribe((res: City[]) => {
      if (res) {

        for (let item of res) {
          if (item.location == null) {
            item.location = new Location();
          }
          // if(item.province.location==null){
          //   item.province.location=new Location();
          // }
        }
        this.cityList = res;
        this.cityService.getOrganByPId(this.cityList[0].id).subscribe((res: Organization[]) => {
          if (res) {

            for (let item of res) {
              if (item.organLocation == null) {
                item.organLocation = new Location();
              }
              if (item.city.location == null) {
                item.city.location = new Location();
              }
            }
            this.organList = res;
          } else {
            this.organList = [];
          }
        })
      } else {
        this.cityList = [];
        this.organList = [];
      }
    })
  }

  setCity() {
    this.organ.city.province.id = this.organ.province.id;
    this.cityService.getOrganByPId(this.organ.city.id).subscribe((res: Organization[]) => {
      if (res) {
        // alert(JSON.stringify(res))
        console.log(res);
        for (let item of res) {
          if (item.organLocation == null) {
            item.organLocation = new Location();
          }
          if (item.city.location == null) {
            item.city.location = new Location();
          }
        }
        this.organList = res;
        this.organListSelect = res;
      } else {
        this.organList = [];
        this.organListSelect = [];
      }
    })
  }

  setLocation() {
    this.cityService.getCityById(this.organ.city.id).subscribe((res: City) => {
      this.organ.city.location.lat = res.location.lat;
      this.organ.city.location.lng = res.location.lng;
    });
  }

  setLocationEdit() {
    this.cityService.getCityById(this.organEdit.city.id).subscribe((res: City) => {
      this.organEdit.city.location.lat = res.location.lat;
      this.organEdit.city.location.lng = res.location.lng;
    });
  }

  setProvinceEdit() {
    this.provinceService.getCityByPId(this.organ.province.id).subscribe((res: City[]) => {
      if (res) {

        for (let item of res) {
          if (item.location == null) {
            item.location = new Location();
          }
          if (item.province.location == null) {
            item.province.location = new Location();
          }
        }
        this.cityList = res;
        this.cityService.getOrganByPId(this.cityList[0].id).subscribe((res: Organization[]) => {
          if (res) {

            for (let item of res) {
              if (item.organLocation == null) {
                item.organLocation = new Location();
              }
              if (item.city.location == null) {
                item.city.location = new Location();
              }
            }
            this.organList = res;
          } else {
            this.organList = [];
          }
        })
      } else {
        this.cityList = [];
        this.organList = [];
      }
    })
  }


  setCityEdit() {
    this.cityService.getOrganByPId(this.organEdit.city.id).subscribe((res: Organization[]) => {
      if (res) {

        for (let item of res) {
          if (item.organLocation == null) {
            item.organLocation = new Location();
          }
          if (item.city.location == null) {
            item.city.location = new Location();
          }
        }
        this.organListSelect = res;
      } else {
        this.organListSelect = [];
      }
    })
  }

  getChildOrgan(id) {
    this.organService.getChild(id).subscribe((res: Organization[]) => {
      if (res) {

        for (let item of res) {
          if (item.organLocation == null) {
            item.organLocation = new Location();
          }
          if (item.city.location == null) {
            item.city.location = new Location();
          }
        }
        this.organList = res;
      } else {
        this.organList = [];
      }

    })
  }


  checkOrganCode() {
    this.organService.checkCode(this.organ.organCode).subscribe(res => {
      if (res) {

      } else {
        this.toastr.error('کد سازمان باید منحصر به فرد باشد','خطا');
        this.organ.organCode = '';
      }
    })
  }

  checkOrganCodeEdit() {
    this.organService.checkCode(this.organEdit.organCode).subscribe(res => {
      if (res) {

      } else {
        this.toastr.error('کد سازمان باید منحصر به فرد باشد','خطا');
        this.organEdit.organCode = '';
      }
    })
  }

  // setProvinceAdd(event) {
  //     this.organ.province.id = event;
  // }
  //
  // setCityAdd(event) {
  //     this.organ.city.id = event;
  // }
  //
  // setProvinceEdit(event) {
  //     this.organ.province.id = event;
  // }
  //
  // setCityEdit(event) {
  //     this.organ.city.id = event;
  // }
  // setParentOrgan(event){
  //     this.organ.parentOrgan.id=event;
  // }
  // setParentOrganEdit(event){
  //     this.organEdit.parentOrgan.id=event;
  // }

  deleteOrgan(id, i) {
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
        self.organService.deleteOrgan(id).subscribe(res => {
          if (res) {
            self.organList.splice(i, 1);
            self.toastr.success('سازمان با موفقیت حذف شد','موفق')
          } else {
            self.toastr.error('هنگام حذف مشکلی رخ داده است','خطا')
          }
        });

      }
    })
  }

  editOrgan(id) {
    this.mode = 'edit';
    this.provinceService.getProvinceByOrganId(id).subscribe((res: Province) => {
      if (res.location == null) {
        res.location = new Location()
      }
      this.organEdit.province = res;
    });
    // this.userId = id;
    this.organService.getOrganById(id).subscribe((res: Organization) => {
      // alert(JSON.stringify(res));
      if (res != null) {

        if (res.organLocation == null) {
          res.organLocation = new Location();
        }
        if (res.city.location == null) {
          res.city.location = new Location();
        }
        if (res.parentOrgan == null) {
          res.parentOrgan = new Organization();
        }
        this.organEdit = res;
      }

    })
  }

  addOrgan() {
    this.saveButton = true;
    if (
      this.addForm.controls['addProvince'].valid
      && this.addForm.controls['addCity'].valid
      && this.addForm.controls['parentOrgan'].valid
      && this.addForm.controls['organName'].valid
      && this.addForm.controls['organCode'].valid
    ) {
      this.organ.city.province = this.organ.province;
      // alert(JSON.stringify(this.organ));
      this.organService.create(this.organ).subscribe((res: Organization) => {
        if (res != null) {
          this.toastr.success('سازمان با موفقیت افزوده شد','موفق');
          // this.provinceDataService.setProvinceOne(res);
          this.mode = '';
          this.ngAfterViewInit()
          this.organList.push(res);
          this.organ = new Organization();
          this.organ.parentOrgan = new Organization();
        }
      });
    }
  }

  updateOrgan() {
    this.saveButton2 = true;
    if (
      this.editForm.controls['editProvince'].valid
      && this.editForm.controls['editCity'].valid
      && this.editForm.controls['parentIdEdit'].valid
      && this.editForm.controls['editOrganName'].valid
      && this.editForm.controls['editCode'].valid
    ) {
      this.organService.editOrgan(this.organEdit).subscribe(res => {
        if (res) {
          this.toastr.success('سازمان با موفقیت ویرایش شد','موفق');
          this.mode = '';
          let i = 0;
          for (let item of this.organList) {
            if (item.id == this.organEdit.id) {
              this.oId = i;
            } else {
              i++;
            }
          }
          this.organList.splice(this.oId, 1);
          this.organList.push(this.organEdit);
          this.organEdit = new Organization();
        }
      });
    }
  }

  mapClicked($event) {
    this.organ.organLocation.lat = $event.coords.lat;
    this.organ.organLocation.lng = $event.coords.lng;

  }

  mapClickedEdit($event) {
    this.organEdit.organLocation.lat = $event.coords.lat;
    this.organEdit.organLocation.lng = $event.coords.lng;


  }


}
