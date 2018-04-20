/*


 */
declare var JalaliDate: any;
export class Convert {

  public static seperateDate(dayDate) {
    let newDayDate;
    newDayDate = {
      year: dayDate.substr(0, 4),
      month: dayDate.substr(5, 2),
      day: dayDate.substr(8, 2),
    }
    return newDayDate;
  }

  public static gregorianToJalali(year, month, day) {
    var jalaliDate = new JalaliDate();
    return jalaliDate.gregorianToJalali(year, month, day);
  }

  public static jalaliToGregorian(year, month, day) {
    var jalaliDate = new JalaliDate();
    return jalaliDate.jalaliToGregorian(year, month, day);
  }

}
