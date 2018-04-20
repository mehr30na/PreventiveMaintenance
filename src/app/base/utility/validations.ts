import {isNull, isNullOrUndefined, isNumber, isString, isUndefined} from "util";
import {MyPattern} from "../helper/myPattern";

declare let $: any;

export class Validations {

  public static checkEmail(value: string) {
    let a: string;
    if (isUndefined(value)) {
      a = ' ';
    } else {
      if (value.match(MyPattern.email)) {
        a = '';
      } else if (value == '') {
        a = 'پر کردن این فیلد الزامی است'
      }
      else {
        a = 'مثال abcd@efg.hij';
      }
    }
    return a;
  }

  public static checkFa(value: string) {
    let a: string;
    if (isUndefined(value)) {
      a = ' ';
    } else {
      if (value.match('([آ-ی ]+)+([آ-ی])')) {
        a = '';
      } else if (value == '') {
        a = 'پر کردن این فیلد الزامی است'
      }
      else {
        a = 'فقط حروف فارسی';
      }
    }
    return a;
  }

  public static checkEn(value: string) {
    let a: string;
    if (isUndefined(value)) {
      a = ' ';
    } else {
      if (value.match('[A-Za-z]*')) {
        a = '';
      } else if (value == '') {
        a = 'پر کردن این فیلد الزامی است'
      }
      else {
        a = 'فقط حروف انگلیسی';
      }
    }
    return a;
  }

  public static checkFaNumber(value: string) {
    let a: string;
    if (isUndefined(value)) {
      a = ' ';
    } else {
      if (value.match('[۰-۹]')) {
        a = '';
      } else if (value == '') {
        a = 'پر کردن این فیلد الزامی است'
      }
      else {
        a = 'فقط اعداد فارسی';
      }
    }
    return a;
  }

  public static checkEnNumber(value: string) {
    let a: string;
    if (isUndefined(value)) {
      a = ' ';
    } else {
      if (value.match('[0-9]')) {
        a = '';
      } else if (value == '') {
        a = 'پر کردن این فیلد الزامی است'
      }
      else {
        a = 'فقط اعداد انگلیسی';
      }
    }
    return a;
  }

  public static checkPhone(value: string) {
    let a: string;
    if (isUndefined(value)) {
      a = ' ';
    } else {
      if (value.match('(([0]+[9])([0-9]{9})||([۰]+[۹])([۰-۹]{9}))$')) {
        a = '';
      } else if (value == '') {
        a = 'پر کردن این فیلد الزامی است'
      }
      else {
        a = 'فقط اعداد انگلیسی';
      }
    }
    return a;
  }

  public static checkDate(value: string) {
    let a: string;
    if (isUndefined(value)) {
      a = ' ';
    } else {
      if (value.match(MyPattern.date)) {
        a = '';
      } else if (value == '') {
        a = 'پر کردن این فیلد الزامی است'
      }
      else {
        a = 'فرمت اشتباه';
      }
    }
    return a;
  }

  public static checkNumber(value: string) {
    let a: string;
    if (isUndefined(value)) {
      a = ' ';
    } else {
      if (value.match('[0-9]|[۰-۹]')) {
        a = '';
      } else if (value == '') {
        a = 'پر کردن این فیلد الزامی است'
      }
      else {
        a = 'فقط اعداد انگلیسی';
      }
    }
    return a;
  }

  public static checkDontNull(value) {
    let a: string;
    if (isUndefined(value)) {
      a = ''
    } else {
      if (value == '' || value == 0) {
        a = 'پر کردن این فیلد الزامی است'
      }
    }
  }

  public static changeUndefinedString(value: string) {
    let a: string;
    if (isUndefined(value)) {
      value = ''
    } else {
      if (value == '') {
        // a = 'پر کردن این فیلد الزامی است'
      }
    }
  }

  public static changeUndefinedNumber(value: number) {
    let a: string;
    if (isUndefined(value)) {
      value = 0
    } else {
      if (value == 0) {
        // a = 'پر کردن این فیلد الزامی است'
      }
    }
  }

  public static checkNull(value) {
    if (isString(value)) {
      if (value == '') {

      }
    } else if (isNumber(value)) {

    }
  }

  public static checkDateTimeValid(value) {
    let a:string;
    if (isUndefined(value)) {
      a=''
    } else {
      let y: string = value.substring(0, 4);
      let m: string = value.substring(5, 7);
      let d: string = value.substring(8, 10);
      let h: string = value.substring(11, 13);
      let mm: string = value.substring(14, 16);
      if (parseInt(y.substring(0, 1)) < 2 && parseInt(y.substring(0, 1)) > 0 && parseInt(y.substring(1, 2)) ==3) {
        if (parseInt(m) <= 12 && parseInt(m) > 6) {
          if (parseInt(d) >= 0 && parseInt(d) < 31) {
            if (parseInt(h) <= 24 && parseInt(h) >= 0) {
              if (parseInt(mm) <= 59 && parseInt(mm) >= 0) {
                a=''
              } else {
                a='دقیقه اشتباه وارد شده است'
              }
            } else {
              a='ساعت اشتباه وارد شده است'
            }
          } else {
            a='روز اشتباه وارد شده است'
          }
        } else if (parseInt(m) <= 6 && parseInt(m) > 0) {
          if (parseInt(d) >= 0 && parseInt(d) <= 31) {
            if (parseInt(h) <= 24 && parseInt(h) >= 0) {
              if (parseInt(mm) <= 59 && parseInt(mm) >= 0) {
                a=''
              } else {
                a='دقیقه اشتباه وارد شده است'
              }
            } else {
              a='ساعت اشتباه وارد شده است'
            }
          } else {
            a='روز اشتباه وارد شده است'
          }
        } else {
          a='ماه اشتباه وارد شده است'
        }

      } else {
        a='سال اشتباه وارد شده است'
      }
    }
    return a;
  }
  public static checkDateValid(value) {
    let a:string;
    if (isUndefined(value)) {
      a=''
    } else {
      let y: string = value.substring(0, 4);
      let m: string = value.substring(5, 7);
      let d: string = value.substring(8, 10);

      if (parseInt(y.substring(0, 1)) < 2 && parseInt(y.substring(0, 1)) > 0 && parseInt(y.substring(1, 2)) ==3) {
        if (parseInt(m) <= 12 && parseInt(m) > 6) {
          if (parseInt(d) >= 0 && parseInt(d) < 31) {
            a=''
          } else {
            a='روز اشتباه وارد شده است'
          }
        } else if (parseInt(m) <= 6 && parseInt(m) > 0) {
          if (parseInt(d) > 0 && parseInt(d) <= 31) {
            a=''
          } else {
            a='روز اشتباه وارد شده است'
          }
        } else {
          a='ماه اشتباه وارد شده است'
        }

      } else {
        a='سال اشتباه وارد شده است'
      }
    }
    return a;
  }
  public static compareDate(date1,date2){

  }
  public static compareDateTime(date1,date2){
    let y: string = date1.substring(0, 4);
    let m: string = date1.substring(5, 7);
    let d: string = date1.substring(8, 10);
    let h: string = date1.substring(11, 13);
    let mm: string = date1.substring(14, 16);

    let y1: string = date2.substring(0, 4);
    let m1: string = date2.substring(5, 7);
    let d1: string = date2.substring(8, 10);
    let h1: string = date2.substring(11, 13);
    let mm1: string = date2.substring(14, 16);

    let start:string=y+m+d+h+mm;
    let end:string=y1+m1+d1+h1+mm1;
    if(parseInt(start) < parseInt(end)){
      return true;
    }else{
      return false;
    }
  }
}
