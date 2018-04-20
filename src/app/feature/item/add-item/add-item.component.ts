import {AfterViewInit, Component, OnInit} from '@angular/core';
import {Item} from "../../../model/item/item";
import {Toolkit} from "../../../base/utility/toolkit";
import {SparePart} from "../../../model/management/storeManagement/sparePart";
import {EnumHandle} from "../../../base/utility/enum/enum-handle";
import {Priority} from "../../../base/helper/enum/priority";
import {EnumObject} from "../../../base/utility/enum/enum-object";
import swal from 'sweetalert2'
import {ItemService} from "../../../service/item/item.service";
import {PeriodType} from "../../../base/helper/enum/periodType";
import {ImageStatus} from "../../../base/helper/enum/ImageStatus";
import {CategoryService} from "../../../service/baseInformation/category.service";
import {Category} from "../../../model/baseInformation/category";
import {SparePartService} from "../../../service/management/storeManagement/spare-part.service";
import {MeasurementService} from "../../../service/baseInformation/measurement.service";
import {UnitOfMeasurement} from "../../../model/baseInformation/unitOfMeasurement";
import {Config} from "../../../configuration/config";
import {PropertyService} from "../../../service/item/property.service";
import {Router} from "@angular/router";
import {Validations} from "../../../base/utility/validations";
import {isUndefined} from "util";
import {ToastrService} from "ngx-toastr";

declare let $: any;

@Component({
  selector: 'add-item',
  templateUrl: './add-item.component.html',
  styleUrls: ['./add-item.component.scss']
})
export class AddItemComponent implements OnInit, AfterViewInit {
  mode: string = '';
  cId: number;
  item: Item = new Item();
  itemEdit: Item = new Item();
  priorityList = [] as EnumObject[];
  periodTypeList = [] as EnumObject[];
  setperiod: boolean = false;
  setperiodEdit: boolean = false;

  itemList: Array<Item> = [];
  parentItemList: Array<Item> = [];
  categoryList: Array<Category> = [];
  sparePartList: Array<SparePart> = [];
  measurementList: Array<UnitOfMeasurement> = [];


  typeList = [] as EnumObject[];
  addProp: boolean = false;
  myVal=Validations;
  public mask = [/\d/, /\d/, /\d/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/];
  constructor(private itemService: ItemService,
              private sparePartService: SparePartService,
              private measurementService: MeasurementService,
              private categoryService: CategoryService,
              private router:Router,
              private toastr: ToastrService,
              private propertyService: PropertyService) {
  }

  ngAfterViewInit() {


    $(document).ready(function() {
      $("div.bhoechie-tab-menu>div.list-group>a").click(function(e) {
        e.preventDefault();
        $(this).siblings('a.active').removeClass("active");
        $(this).addClass("active");
        var index = $(this).index();
        $("div.bhoechie-tab>div.bhoechie-tab-content").removeClass("active");
        $("div.bhoechie-tab>div.bhoechie-tab-content").eq(index).addClass("active");
      });
    });





    let self = this;
    $(document).ready(function () {
      $('.sparePartListAdd').select2({
        placeholder: 'قطعات یدکی'
      }).on('change', (e) => {
        // alert( $(e.currentTarget).val())
        self.item.spareParts =
          Toolkit.changeSelectedList(
            self.sparePartList,
            self.item.spareParts,
            $(e.currentTarget).val()
          );
      });
    });
    $(document).ready(function () {
      $('.sparePartListEdit').select2({
        placeholder: 'قطعات یدکی'
      }).on('change', (e) => {

        self.item.spareParts =
          Toolkit.changeSelectedList(
            self.sparePartList,
            self.itemEdit.spareParts,
            $(e.currentTarget).val()
          );
      });
    });


    // $(document).ready(function () {
    //   $('.property').select2({
    //     placeholder: 'ویژگی ها'
    //   }).on('change', (e) => {
    //     self.item.property =
    //       Toolkit.changeSelectedListProperty(
    //         self.propertyList,
    //         self.item.property,
    //         $(e.currentTarget).val()
    //       );
    //   });
    // });
    // $(document).ready(function () {
    //   $('.propertyEdit').select2({
    //     placeholder: 'ویژگی ها'
    //   }).on('change', (e) => {
    //     self.itemEdit.property =
    //       Toolkit.changeSelectedListProperty(
    //         self.propertyList,
    //         self.itemEdit.property,
    //         $(e.currentTarget).val()
    //       );
    //   });
    // });


    $(document).ready(function () {
      $('.js-example-basic-single-categoryList').select2({
        placeholder: 'دسته بندی'
      }).on('change', (e) => {
        self.setItemByCategoryId($(e.currentTarget).val())
      });
    });
    $(document).ready(function () {
      $('.js-example-basic-single-parentItemList').select2({
        placeholder: 'انتخاب کالای والد'
      }).on('change', (e) => {
        self.setItemByParentItemId($(e.currentTarget).val())
      });
    });


    $(document).ready(function () {
      $('.js-example-basic-single-categoryAdd').select2({
        placeholder: 'دسته بندی'
      }).on('change', (e) => {
        // alert($(e.currentTarget).val())
        self.item.itemCategory.id = ($(e.currentTarget).val());
        // alert(self.item.itemCategory.id)
      });
    });
    $(document).ready(function () {
      $('.js-example-basic-single-categoryEdit').select2({
        placeholder: 'دسته بندی'
      }).on('change', (e) => {
        self.itemEdit.itemCategory.id = ($(e.currentTarget).val());
      });
    });

    $(document).ready(function () {
      $('.js-example-basic-single-parentItemAdd').select2({
        placeholder: 'انتخاب کالای والد'
      }).on('change', (e) => {
        self.item.parentItem.id = ($(e.currentTarget).val());
      });
    });

    $(document).ready(function () {
      $('.js-example-basic-single-parentItemEdit').select2({
        placeholder: 'انتخاب کالای والد'
      }).on('change', (e) => {
        self.itemEdit.parentItem.id = ($(e.currentTarget).val());
      });
    });



    $(document).ready(function () {
      $('.js-example-basic-single-periodTypeEdit').select2({
        placeholder: 'انتخاب نوع دوره'
      }).on('change', (e) => {
        self.itemEdit.itemCheckingPeriod.periodType = ($(e.currentTarget).val());
      });
    });
    $(document).ready(function () {
      $('.js-example-basic-single-periodTypeAdd').select2({
        placeholder: 'انتخاب نوع دوره'
      }).on('change', (e) => {
        self.item.itemCheckingPeriod.periodType = ($(e.currentTarget).val());
      });
    });
  }

  ngOnInit() {
    if (Config.getLocalStorageToken() == null) {
      this.router.navigateByUrl('/authentication/signIn');
    }else{
    // *************************intialize*******************
    this.item.parentItem = new Item();
    this.itemEdit.parentItem = new Item();

    this.measurementService.getAllMeasurement().subscribe((res: UnitOfMeasurement[]) => {
      if(res){
      this.measurementList = res;
      }else{
        this.toastr.warning('واحد اندازه گیری وجود ندارد.ابتدا واحد اندازه گیری ثبت نمایید!','هشدار')
      }
    });
    this.sparePartService.getAllSparePart().subscribe((res: SparePart[]) => {
      this.sparePartList = res;
    });
    this.categoryService.getAllCategory().subscribe((res: Array<Category>) => {
      if(res){
        this.categoryList = res;
        console.log(this.categoryList[0].id);
        this.setItemByCategoryId(this.categoryList[0].id);
        $('.js-example-basic-single-categoryList').val(this.categoryList[0].id).trigger('change');
      }else{
        this.toastr.warning('دسته بندی وجود ندارد.ابتدا دسته بندی ثبت نمایید!','هشدار')
      }
    });
    this.itemService.getAllItem().subscribe((res: Array<Item>) => {
      if(res){
        this.parentItemList = res
      }
    });


    this.priorityList = EnumHandle.getEnumObjectList(EnumHandle.listEnums<Priority>(Priority));
    this.periodTypeList = EnumHandle.getEnumObjectList(EnumHandle.listEnums<PeriodType>(PeriodType));

    // this.propertyService.getAllProperty().subscribe((res: Property[]) => {
    //   this.propertyList = res;
    // })
    }
  }

  setItemByCategoryId(categoryId) {
    this.itemService.getItemByCategoryId(categoryId).subscribe((res: Array<Item>) => {
      // $('.js-example-basic-single-parentItemList').val(0).trigger('change');
      this.parentItemList = [];
      this.parentItemList = res;
      this.setItemByParentItemId(this.parentItemList[0].id);
      $('.js-example-basic-single-parentItemList').val(this.parentItemList[0].id).trigger('change');
    })
  }

  setItemByParentItemId(parentId) {
    this.itemService.getItemByParentId(parentId).subscribe((res: Array<Item>) => {
      // $('.js-example-basic-single-categoryList').val(0).trigger('change');
      this.itemList = [];
      this.itemList = res;
    })
  }
  setItemByCategoryIdAndParent(cId,pId){

  }
  fileChangeListener($event) {
    const image = new Image();
    const file = $event.target.files[0];
    const myReader: FileReader = new FileReader();
    const that = this;
    myReader.onloadend = function (loadEvent: any) {
      image.src = loadEvent.target.result;
      // that.cropper2.setImage(image);
      that.item.imageUrl = image.src;
      that.item.image.size = file.size;
      const n = that.item.imageUrl.search(';base64,');
      that.item.image.extension = '.' + file.type;
      that.item.image.extension = '.' + that.item.imageUrl.substring(11, n);
      that.item.image.imageData = that.item.imageUrl.substring(n + 8, that.item.imageUrl.length);
      that.item.image.imageStatus = ImageStatus.NEW_IMAGE;

    };
    myReader.readAsDataURL(file);


  }
  checkCurrent(){
    if(this.item.life.current>this.item.life.useful){
      this.toastr.error('کارکرد فعلی نمی تواند از عمر مفید بیشتر باشد','خطا')
      this.item.life.current=null;
    }
  }
  checkCurrentEdit(){
    if(this.itemEdit.life.current>this.itemEdit.life.useful){
      this.toastr.error('کارکرد فعلی نمی تواند از عمر مفید بیشتر باشد','خطا')
      this.itemEdit.life.current=null;
    }
  }

  fileChangeListener1($event) {
    const image = new Image();
    const file = $event.target.files[0];
    const myReader: FileReader = new FileReader();
    const that = this;
    myReader.onloadend = function (loadEvent: any) {
      image.src = loadEvent.target.result;
      // that.cropper2.setImage(image);
      that.itemEdit.imageUrl = image.src;
      that.itemEdit.image.size = file.size;
      that.itemEdit.image.extension = '.' + file.type;
      const n = that.itemEdit.imageUrl.search(';base64,');
      that.itemEdit.image.imageData = that.itemEdit.imageUrl.substring(n + 8, that.itemEdit.imageUrl.length);
      that.itemEdit.image.imageStatus = ImageStatus.NEW_IMAGE;

    };
    myReader.readAsDataURL(file);


  }

  add() {
    this.mode = 'add';
    this.ngAfterViewInit();
  }

  cancel() {
    this.mode = '';
    this.ngAfterViewInit();
  }

  setPeriod() {
    this.setperiod = true;
    this.ngAfterViewInit();
  }

  setPeriodEdit() {
    this.setperiodEdit = true;
    this.ngAfterViewInit();
  }

  deleteItem(id, i) {
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
        self.itemService.deleteItem(id).subscribe(res => {
          if (res) {
            self.itemList.splice(i, 1);
            self.toastr.success('کالا با موفقیت حذف شد','موفق')
          } else {
            self.toastr.error('هنگام حذف مشکلی رخ داده است','خطا')
          }
        });

      }
    })
  }

  editItem(id) {
    this.mode = 'edit';
    // this.userId = id;
    this.itemService.getItemById(id).subscribe((res: Item) => {
      // alert(JSON.stringify(res));
      if (res != null) {
        if (this.itemEdit.image == null) {
          // this.userEdit.image = new Image();
        }else{
          this.itemEdit.imageUrl=Config.getUrl()+this.itemEdit.image.imageData;
        }
        this.itemEdit = res;

      }
    })
  }

  addItem() {
    if(!isUndefined(this.item.imageUrl)&&
      !isUndefined(this.item.life.unitOfMeasurement.id)&&
      !isUndefined(this.item.life.current)&&
      !isUndefined(this.item.name)&&
      !isUndefined(this.item.priority)&&
      !isUndefined(this.item.life.useful)){
      // this.item.organization.id = Config.getLocalStorageUser().organization.id;
      this.itemService.create(this.item).subscribe((res: Item) => {
        if (res) {
          console.log(res);
          if(!res.parentItem){
            res.parentItem=new Item();
          }
          if(!res.itemCategory){
            res.itemCategory=new Category();
          }

          // res.itemCategory.id=1;
          this.toastr.success('کالا با موفقیت افزوده شد','موفق')
          this.itemList.push(res);
          this.mode = '';
          this.ngAfterViewInit();
          this.item = new Item();
          this.item.parentItem=new Item();

        }
      });
    }else{
      // alert(1)
      this.toastr.error('اطلاعات به صورت کامل وارد نشده','خطا')
    }

  }

  updateItem() {
    this.itemService.editItem(this.itemEdit).subscribe(res => {
      if (res) {
        this.toastr.success('اطلاعات کالا با موفقیت ویرایش شد','موفق')
        this.mode = 'add';
        let i = 0;
        for (let item of this.itemList) {
          if (item.id == this.itemEdit.id) {
            this.cId = i;
          } else {
            i++;
          }
        }
        this.itemList.splice(this.cId, 1);
        this.itemList.push(this.itemEdit);
        this.itemEdit = new Item();
        // Toolkit.resetSelectedList('.expert-list');
      }
    });
  }


  // deleteProperty(i) {
  //   this.item.property.splice(i, 1);
  //   $('.property').val(this.item.property);
  //   $('.property').trigger('change');
  // }

  addNewProperty() {
    this.addProp = true;
  }

  // addProperty() {
  //   this.propertyService.create(this.prop).subscribe((res: Property) => {
  //     if (res) {
  //       this.propertyList.push(res);
  //       this.item.property.push(res);
  //       this.toastr.success('ویژگی با موفقیت افزوده شد','موفق')
  //       this.prop = new Property();
  //     }
  //   });
  // }
  // addPropertyEdit() {
  //   this.propertyService.create(this.prop).subscribe((res: Property) => {
  //     if (res) {
  //       this.propertyList.push(res);
  //       this.itemEdit.property.push(res);
  //       this.toastr.success('ویژگی با موفقیت افزوده شد','موفق')
  //       this.prop = new Property();
  //     }
  //   });
  // }

  // cancelProperty() {
  //   this.prop = new Property();
  //   this.addProp = false;
  // }

}
