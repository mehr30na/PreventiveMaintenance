import {Component, Input, OnInit} from '@angular/core';
import {UnitOfMeasurement} from "../../../../model/baseInformation/unitOfMeasurement";
import {MeasurementService} from "../../../../service/baseInformation/measurement.service";
import {Router} from "@angular/router";
import {Config} from "../../../../configuration/config";
import swal from 'sweetalert2'
import {Swal} from "../../../../base/utility/swal";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {ToastrService} from "ngx-toastr";
import {MeasurementDataService} from "../../../../service/asset/dataService/measurement-data.service";
declare let $:any;
@Component({
  selector: 'app-measurement-list',
  templateUrl: './measurement-list.component.html',
  styleUrls: ['./measurement-list.component.scss']
})
export class MeasurementListComponent implements OnInit {

  measurement: UnitOfMeasurement = new UnitOfMeasurement();
  measurementEdit: UnitOfMeasurement = new UnitOfMeasurement();
  measurementList: Array<UnitOfMeasurement> = [];
  @Input() mode: string;
  mId: number;


  saveButton: boolean;
  saveButton2: boolean;
  editForm: FormGroup;
  addForm: FormGroup;

  constructor(private measurementService: MeasurementService,
              private measurementDataService:MeasurementDataService,
              private router: Router,
              private toastr: ToastrService,
              private fb: FormBuilder) {
    this.addForm = fb.group({
      measureName: new FormControl(null, [Validators.required]),
      measureUnit: new FormControl(null, [Validators.required]),

    });
    this.editForm = fb.group({
      measureNameEdit: new FormControl(null, [Validators.required]),
      measureUnitEdit: new FormControl(null, [Validators.required]),

    });
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
      this.measurementService.getAllMeasurement().subscribe((res: UnitOfMeasurement[]) => {
        if (res) {
          this.measurementList = res;
        } else {
          this.toastr.warning('واحد اندازه گیری ثبت نشده','هشدار')
        }
      });
    }
    // this.provinceDataService.gettingProvinceOne.subscribe((res:Province)=> {
    //     this.provinceList.push(res);
    // })

  }

  deleteMeasurement(id, i) {
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
        self.measurementService.deleteMeasurement(id).subscribe(res => {
          if (res) {
            self.measurementList.splice(i, 1);
            self.toastr.success('واحد اندازه گیری با موفقیت حذف شد','موفق')
          } else {
            self.toastr.error('هنگام حذف مشکلی رخ داده است','خطا')
          }
        });

      }
    })
  }

  editMeasurement(id) {
    this.mode = 'edit';
    // this.userId = id;
    this.measurementService.getMeasurementById(id).subscribe((res: UnitOfMeasurement) => {
      // alert(JSON.stringify(res));
      if (res != null) {
        this.measurementEdit = res;

      }
    })
  }

  addMeasurement() {
    this.saveButton = true;
    if (
      this.addForm.controls['measureName'].valid
      && this.addForm.controls['measureUnit'].valid
    ) {
      this.measurementService.create(this.measurement).subscribe((res: UnitOfMeasurement) => {
        if (res != null) {
          this.toastr.success('واحد اندازه گیری با موفقیت افزوده شد','موفق')
          this.measurementDataService.setMeasurementOne(res);
          // this.provinceDataService.setProvinceOne(res);
          this.mode = '';
          this.measurementList.push(res);
          this.measurement = new UnitOfMeasurement();
        }
      });
    }
  }

  updateMeasurement() {
    this.saveButton2 = true;
    if (
      this.addForm.controls['measureNameEdit'].valid
      && this.addForm.controls['measureUnitEdit'].valid
    ) {
      this.measurementService.editMeasurement(this.measurementEdit).subscribe(res => {
        if (res) {
          this.toastr.success('واحد اندازه گیری با موفقیت ویرایش شد','موفق')
          this.mode = '';
          let i = 0;
          for (let item of this.measurementList) {
            if (item.id == this.measurementEdit.id) {
              this.mId = i;
            } else {
              i++;
            }
          }
          this.measurementList.splice(this.mId, 1);
          this.measurementList.push(this.measurementEdit);
          this.measurementEdit = new UnitOfMeasurement();
        }
      });
    }
  }


}
