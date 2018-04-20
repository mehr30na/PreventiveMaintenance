import {MyDate} from "../../model/helper/MyDate";
import {isNullOrUndefined} from "util";

export class MyDateConverter {
    public static getMyDateFromString(strDate:string): MyDate {
        const dateStart: MyDate = new MyDate();
        const startDatesplti = strDate.split('-');
        const startDate = startDatesplti[0];
        const startDateSplit = startDate.split('/');
        dateStart.year = startDateSplit[0];
        dateStart.month = startDateSplit[1];
        dateStart.day = startDateSplit[2];
        const startTime = startDatesplti[1];
        const startTimeSplit = startTime.split(':');
        dateStart.hour = startTimeSplit[0];
        dateStart.minute = startTimeSplit[1];
        return dateStart;
    }
    public static getStringFromMyDate(mydate: MyDate): string {
        let mystrDate:string;
        if(!isNullOrUndefined(mydate)){
            mystrDate = mydate.year+ '/'+mydate.month + '/'+ mydate.day+'-'+mydate.hour+':'+mydate.minute;
        }
        return mystrDate;
    }
}