import {Component, Input, OnInit} from '@angular/core';
import {Warranty} from "../../../model/asset/warranty";
import {WarrantyService} from "../../../service/asset/warranty.service";
import {WarrantyDataService} from "../../../service/asset/dataService/warranty-data.service";
import {Toolkit} from "../../../base/utility/toolkit";
import * as moment from 'jalali-moment';
@Component({
  selector: 'warranty-add-form',
  templateUrl: './warranty-add-form.component.html',
  styleUrls: ['./warranty-add-form.component.scss']
})
export class WarrantyAddFormComponent implements OnInit {
  @Input() target:string;
  warranty:Warranty=new Warranty();
  dateObject:any;
  constructor(private warrantyService:WarrantyService,
              private warrantyData:WarrantyDataService) { }

  ngOnInit() {
    this.dateObject= moment('1397-02-01','jYYYY,jMM,jDD');

  }
  createWarranty(){
    // console.log(this.dateObject.format('jYYYY/jMM/jDD'));
    this.warranty.expiry=Toolkit.changeJalaliToGregorian(this.dateObject.format('jYYYY/jMM/jDD'));
    this.warrantyService.create(this.warranty).subscribe((res:Warranty)=>{
      if(res){
        if(this.target=='asset'){
          this.warrantyData.setWarrantyOne(res)
        }else if(this.target=='part'){
          this.warrantyData.setWarrantyOneBOM(res)
        }

      }
    })
  }


}
