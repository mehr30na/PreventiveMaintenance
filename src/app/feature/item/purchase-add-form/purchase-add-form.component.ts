import {AfterViewInit, Component, OnInit} from '@angular/core';
import {Purchase} from "../../../model/asset/purchase";
import {PurchaseService} from "../../../service/asset/purchase.service";
import {PurchaseDataService} from "../../../service/asset/dataService/purchase-data.service";
import {Currency} from "../../../model/asset/currency";
import {CurrencyService} from "../../../service/asset/currency.service";
import {BusinessService} from "../../../service/asset/business.service";
import {Business} from "../../../model/asset/business";
import moment = require("jalali-moment");
import {Toolkit} from "../../../base/utility/toolkit";
declare let $:any;
@Component({
  selector: 'purchase-add-form',
  templateUrl: './purchase-add-form.component.html',
  styleUrls: ['./purchase-add-form.component.scss']
})
export class PurchaseAddFormComponent implements OnInit,AfterViewInit {

  purchaseBusinessAddModal:boolean=false;
  purchaseCurrencyAddModal:boolean=false;

  purchase:Purchase=new Purchase();

  date1:any;
  date2:any;

  currency:Currency=new Currency();
  currencyList:Array<Currency>=[];
  purchaseBusinessList:Array<Business>=[];
  constructor(private purchaseService:PurchaseService,
              private currencyService:CurrencyService,
              private businessService:BusinessService,
              private purchaseData:PurchaseDataService) { }

  ngOnInit() {
    this.date1= moment('1397-02-01','jYYYY,jMM,jDD');
    this.date2= moment('1397-02-01','jYYYY,jMM,jDD');
    this.currencyService.getAllCurrency().subscribe((res:Currency[])=>{
      if(res){
        this.currencyList=res;
      }
    });
    this.businessService.getAllBusiness().subscribe((res:Business[])=>{
      if(res){
        this.purchaseBusinessList=res;
      }
    })
  }


  createPurchase(){
    this.purchase.purchaseDate=Toolkit.changeJalaliToGregorian(this.date1.format('jYYYY/jMM/jDD'));
    this.purchase.deliverDate=Toolkit.changeJalaliToGregorian(this.date2.format('jYYYY/jMM/jDD'));
    this.purchaseService.create(this.purchase).subscribe((res:Purchase)=>{
      if(res){
        this.purchaseData.setPurchaseOne(res);
      }
    })
  }
  createCurrency(){
    this.currencyService.create(this.currency).subscribe((res:Currency)=>{
      if(res){
        this.currencyList.push(res);
        this.purchase.currency.id=res.id;
      }
    })
  }

  ngAfterViewInit(){
    let self=this;
    $(document).ready(function () {
      $('.purchaseBusinessList').select2({
        placeholder: 'شرکت'
      }).on('change', (e) => {
        self.purchase.business.id=$(e.currentTarget).val()
      });
    });
    $(document).ready(function () {
      $('.purchaseCurrencyList').select2({
        placeholder: 'واحد پول'
      }).on('change', (e) => {
        self.purchase.currency.id=$(e.currentTarget).val()
      });
    });
  }
  showBusinessAddForm(){
    this.purchaseBusinessAddModal=true;
  }
  showCurrencyAddForm(){
    this.purchaseCurrencyAddModal=true;
  }

}
