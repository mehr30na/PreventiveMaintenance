import {EnumObject} from "./enum-object";

export class EnumHandle<T> {
    static listEnums = <T> (enumClass: any): T[] => {
        var values: T[] = [];
        for (var key in enumClass) {
            values.push(enumClass[key]);
        }
        // console.log('$$$$$$$$$$$$$$$$$$', values);
        // values.length = values.length / 2;
        return values;
    };
    static getEnumObjectList(myEnum){
        let enumObjectList=[] as EnumObject[];
        for(let i = 0 ; i < myEnum.length-1 ; i += 2) {
            enumObjectList.push(
                JSON.parse('{"_title":"' + myEnum[i] + '","_value":"' + myEnum[i + 1] + '"}'));
        }
        return enumObjectList;
    }
}
