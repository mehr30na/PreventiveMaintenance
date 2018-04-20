import {Component, OnInit} from '@angular/core';
import {Collector} from "../../../../model/management/storeManagement/collector";
import {Router} from "@angular/router";
import {Config} from "../../../../configuration/config";
import {Swal} from "../../../../base/utility/swal";
import {CollectorService} from "../../../../service/management/storeManagement/collector.service";
import swal from 'sweetalert2'
import {ToastrService} from "ngx-toastr";
import {Validations} from "../../../../base/utility/validations";
import {isNullOrUndefined} from "util";

@Component({
  selector: 'app-collector-add',
  templateUrl: './collector-add.component.html',
  styleUrls: ['./collector-add.component.scss']
})
export class CollectorAddComponent implements OnInit {

  collector: Collector = new Collector();
  collectorEdit: Collector = new Collector();
  collectorList: Array<Collector> = [];
  mode: string = '';
  mId: number;
  myVal=Validations;

  constructor(private collectorService: CollectorService,
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
      this.collectorService.getAllCollector().subscribe((res: Collector[]) => {
        if (res) {
          this.collectorList = res;
        } else {
          this.toastr.warning('سازنده ای ثبت نشده!','هشدار')
        }
      });
    }
    // this.provinceDataService.gettingProvinceOne.subscribe((res:Province)=> {
    //     this.provinceList.push(res);
    // })

  }

  deleteCollector(id, i) {
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
        self.collectorService.deleteCollector(id).subscribe(res => {
          if (res) {
            self.collectorList.splice(i, 1);
            self.toastr.success('سازنده با موفقیت حذف شد','موفق')
          } else {
            self.toastr.error('هنگام حذف مشکلی رخ داده است','خطا')
          }
        });

      }
    })
  }

  editCollector(id) {
    this.mode = 'edit';
    // this.userId = id;
    this.collectorService.getCollectorById(id).subscribe((res: Collector) => {
      // alert(JSON.stringify(res));
      if (res != null) {
        this.collectorEdit = res;

      }
    })
  }

  addCollector() {
    if (!isNullOrUndefined(this.collector.name) &&
      !isNullOrUndefined(this.collector.collectorContact.phoneNumber) &&
      !isNullOrUndefined(this.collector.collectorContact.address)) {
      this.collectorService.create(this.collector).subscribe((res: Collector) => {
        if (res != null) {
          this.toastr.success('سازنده با موفقیت افزوده شد', 'موفق')
          // this.provinceDataService.setProvinceOne(res);
          this.mode = '';
          this.collectorList.push(res);
          this.collector = new Collector();
        }
      });
    }else{
      this.toastr.error('اطلاعات به صورت کامل وارد نشده','خطا')
    }
  }

  updateCollector() {
    this.collectorService.editCollector(this.collectorEdit).subscribe(res => {
      if (res) {
        this.toastr.success('سازنده با موفقیت ویرایش شد','موفق')
        this.mode = '';
        let i = 0;
        for (let item of this.collectorList) {
          if (item.id == this.collectorEdit.id) {
            this.mId = i;
          } else {
            i++;
          }
        }
        this.collectorList.splice(this.mId, 1);
        this.collectorList.push(this.collectorEdit);
        this.collectorEdit = new Collector();
      }
    });
  }

}
