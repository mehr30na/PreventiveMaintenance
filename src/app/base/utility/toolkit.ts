// import {GoogleMap} from '../model/personInformation/address/google-map';
import {MyDate} from "../../model/helper/MyDate";
import {isNullOrUndefined} from "util";
import {Convert} from "./convertDate/convert";
declare let $:any;

export class Toolkit {
    // ولیدیشن کد ملی
    public static checkCodeMeli(value) {
        const code = this.Fa2En(value);
        if (value.length >= 8) {
            const c = parseInt(code.substr(9, 1), 10);
            let s = 0;
            for (let i = 0; i < 9; i++) {
                s += parseInt(code.substr(i, 1), 10) * (10 - i);
            }
            s = s % 11;
            if ((s < 2 && c === s) || (s >= 2 && c === (11 - s))) {
                return true;
            }
        }
        return false;
    }

    // تبدیل اعداد فارسی به انگلیسی
    public static Fa2En(value: any): any {
        const englishNumbers = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'];
        const persianNumbers = ['۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹', '۰'];
        if(!isNullOrUndefined(value)) {
            for (let i = 0, numbersLen = persianNumbers.length; i < numbersLen; i++) {
                value = value.replace(new RegExp(persianNumbers[i], 'g'), englishNumbers[i]);
            }
        }
        return value;
    }

    // تبدیل اعداد انگلیسی به فارسی
    public static En2Fa(value: any): any {
        const englishNumbers = ['۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹', '۰'];
        const persianNumbers = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'];
        if(!isNullOrUndefined(value)){
            for (let i = 0, numbersLen = persianNumbers.length; i < numbersLen; i++) {
                value = value.replace(new RegExp(persianNumbers[i], 'g'), englishNumbers[i]);
            }
        }
        return value;
    }


// محاسبه نقطه مابین دو نقطه جغرافیایی
//   public static  calculateCenterOfTwoPoints(lat1, lon1, lat2, lon2) {
//     const dLon = Tools.toRadians(lon2 - lon1);
//     ;
//     // convert to radians
//     lat1 = Tools.toRadians(lat1);
//     lat2 = Tools.toRadians(lat2);
//     lon1 = Tools.toRadians(lon1);
//
//     const Bx = Math.cos(lat2) * Math.cos(dLon);
//     const By = Math.cos(lat2) * Math.sin(dLon);
//     const lat3 = Math.atan2(Math.sin(lat1) + Math.sin(lat2), Math.sqrt((Math.cos(lat1) + Bx) * (Math.cos(lat1) + Bx) + By * By));
//     const lon3 = lon1 + Math.atan2(By, Math.cos(lat1) + Bx);
//
//     const location: GoogleMap = {
//       latitude: Tools.toDegrees(lat3),
//       longitude: Tools.toDegrees(lon3)
//     }
//     return (location);
//   }

    public static toRadians(degree) {
        return degree * (Math.PI / 180);
    }

    public static toDegrees(radian) {
        return radian * (180 / Math.PI);
    }

    // پایان محاسبه نقطه مابین دو نقطه جغرافیایی

    // باکس برای گزارشگیری
    public static showBox(color, iconClass, title, icon, firstLink, firstLinkTitle,
                          firstAmount, secondLink, secondLinkTitle, secondAmount) {
        // return '<div class="col-lg-3 col-xs-12">' +
        //   '<div class="small-box ' + color + '">' +
        //   '<div class="inner">' +
        //   '<p> ' + name + '</p>' +
        //   '<h4 class="text-center">' +
        //   amountForActive +
        //   '</h4>' +
        //   '</div>' +
        //   '<div class="">' +
        //   '<i class="ion  ' + icon + ' "></i>' +
        //   '</div>' +
        //   '<a [routerLink]="[' + LinkAddress + ']" class="small-box-footer">' +
        //   footerText + '</a>' +
        //   '</div>' +
        //   '</div>';

        return '<div class="col-md-3 col-sm-6">' +
            '<div class="' + color + '">' +
            '<div class="boxheader">' +
            '<div class="row">' +
            '<div class="col-md-8 col-sm-8 col-xs-8">' +
            '<div class="boxtitle">' +
            '<label>' + title + '</label>' +
            '</div>' +
            '</div>' +
            '<div class="col-md-4 col-sm-4 col-xs-4">' +
            '<div class="' + iconClass + ' ">' +
            '<i class="' + icon + '" aria-hidden="true"></i>' +
            '</div>' +
            '</div>' +
            '</div>' +
            '</div>' +
            '<div class="value">' +
            '<p><a [routerLink]="[' + firstLink + ']">' + firstLinkTitle + ':</a>' + firstAmount + '</p>' +
            '<p><a [routerLink]="[' + secondLink + ']">' + secondLinkTitle + ':</a>' + secondAmount + '</p>' +
            '</div>' +
            '</div>' +
            '</div>';
    }


//  مقایسه تاریخ
    /**
     * myDate1 is bigger than myDate2 return 1
     * myDate2 is bigger than myDate1 return 2
     * myDate1 and myDate2 are same  return 0
     *
     * @param myDate1
     * @param myDate2
     * @return
     */
    public static CompareDate(myDate1: MyDate, myDate2: MyDate) {


        // console.log("myDate1",myDate1);
        // console.log("myDate2",myDate2);
        if (+ myDate1.year > + myDate2.year) return 1;
        if (+ myDate1.year < + myDate2.year) return 2;

        if (+ myDate1.month > + myDate2.month) return 1;
        if (+ myDate1.month < + myDate2.month) return 2;

        if (+ myDate1.day > + myDate2.day) return 1;
        if (+ myDate1.day < + myDate2.day) return 2;

        if (+ myDate1.hour > + myDate2.hour) return 1;
        if (+ myDate1.hour < + myDate2.hour) return 2;

        if (+ myDate1.minute > + myDate2.minute) return 1;
        if (+ myDate1.minute < + myDate2.minute) return 2;

        // return 0;

    }

//  مقایسه تاریخ




  public static changeSelectedList(referenceList, selectedList,value: string[]) {
    selectedList = [];
    if(value!== null) {
      for (const item of value) {
        for (const refItem of referenceList) {
          if (refItem.id == item) {
            selectedList.push(refItem);
          }
        }
      }
    }
    return selectedList;
  }

  public static changeSelectedListExpert(referenceList, selectedList,value: string[]) {
    selectedList = [];
    if(value!== null) {
      for (const item of value) {
        let n=item.indexOf(' ');
        for (const refItem of referenceList) {
          if (refItem.id == item.substring(n)) {
            selectedList.push(refItem.id);
          }
        }
      }
    }
    return selectedList;
  }
  public static changeSelectedListCat(referenceList, selectedList,value: string[]) {
    selectedList = [];
    if(value!== null) {
      for (const item of value) {
        let n=item.indexOf(' ');
        for (const refItem of referenceList) {
          if (refItem.id == item.substring(n)) {
            selectedList.push(refItem);
          }
        }
      }
    }
    return selectedList;
  }
  public static changeSelectedListProperty(referenceList, selectedList,value: string[]) {
    selectedList = [];
    if(value!== null) {
      for (const item of value) {
        for (const refItem of referenceList) {
          if (refItem.name == item) {
            selectedList.push(refItem);
          }
        }
      }
    }
    return selectedList;
  }




  public static resetSelectedList(selector){
    $(selector).val([]);
    $(selector).trigger('change');
  }
  public static checkIsNullOrUndefined(value) {
    return isNullOrUndefined(value);
  }
  public static dateToString(date:Array<any>){
    return date[0]+'/'+date[1]+'/'+date[2];
  }
  public static changeJalaliToGregorian(datePicker:string): string {
    return Toolkit.dateToString(Convert.jalaliToGregorian(Toolkit.Fa2En(datePicker.substring(0,4)),
      Toolkit.Fa2En(datePicker.substring(5,7)),
      Toolkit.Fa2En(datePicker.substring(8,10))));
  }

  public static changeGregorianToJalali(dataPicker: string): string {
    return Convert.gregorianToJalali(dataPicker.substring(0,4),
      dataPicker.substring(5,7),
      dataPicker.substring(8,10));
  }


}
