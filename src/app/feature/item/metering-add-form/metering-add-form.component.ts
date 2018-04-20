import {AfterViewInit, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Metering} from "../../../model/asset/metering";
import {UnitOfMeasurement} from "../../../model/baseInformation/unitOfMeasurement";
import {MeasurementService} from "../../../service/baseInformation/measurement.service";
import {MeteringService} from "../../../service/asset/metering.service";
import {MeteringDataService} from "../../../service/asset/dataService/metering-data.service";
import {MeasurementDataService} from "../../../service/asset/dataService/measurement-data.service";
declare let $:any;

@Component({
  selector: 'metering-add-form',
  templateUrl: './metering-add-form.component.html',
  styleUrls: ['./metering-add-form.component.scss']
})
export class MeteringAddFormComponent implements OnInit,AfterViewInit {
  @Input() target:string;

  showMeasurementModal:boolean=false;
  measurementList:Array<UnitOfMeasurement>=[];

  metering:Metering=new Metering();

  constructor(private measurementService:MeasurementService,
              private meteringService:MeteringService,
              private measurementData:MeasurementDataService,
              private meteringData:MeteringDataService) { }

  ngOnInit() {
    this.measurementService.getAllMeasurement().subscribe((res:UnitOfMeasurement[])=>{
      if(res){
        this.measurementList=res;
      }
    });
    this.measurementData.gettingMeasurementOne.subscribe((res:UnitOfMeasurement)=>{
      if(res){
        this.measurementList.push(res);
      }
    })


  }
  createMetering(){
    this.meteringService.create(this.metering).subscribe((res:Metering)=>{
      if(res){
        if(this.target=='asset'){
          this.meteringData.setMeteringOne(res)
        }else if(this.target=='part'){
          this.meteringData.setMeteringOneBOM(res)
        }else if(this.target=='workOrder'){
          this.meteringData.setMeteringOneWO(res)
        }

      }
    })
  }

  ngAfterViewInit(){
    let self=this;
    $(document).ready(function () {
      $('.measurement').select2({
        placeholder: 'واحد اندازه گیری'
      }).on('change', (e) => {
        self.metering.unit.id=$(e.currentTarget).val()
      });
    });
  }

  showMeasurementAdd(){
      this.showMeasurementModal=true;
      this.ngAfterViewInit();
  }
}
