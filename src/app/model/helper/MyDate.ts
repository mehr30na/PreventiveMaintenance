import {isString} from 'util';

export class MyDate {
  year: any;
  month: any;
  day: any;
  hour: any;
  minute: any;


  constructor(year?: any, month?: any, day?: any) {

    if (isString(year)) {
      if (month || day) {
        throw new Error('month and day should be empty when year in string format');
      }
      try {
        day = year.split('/')[2] as any as number;
        month = year.split('/')[1] as any as number;
        year = year.split('/')[0] as any as number;
      } catch (e) {
        throw new Error(e.message);
      }
    }
    this.year = year;
    this.month = month;
    this.day = day;
  }


  // toString2(): string {
  //   console.log('ttttttttttttttttttttttttttttttttttttttttt');
  //   return this.year.toString() + '/' + this.month.toString() + '/' + this.day.toString();
  // }
}
