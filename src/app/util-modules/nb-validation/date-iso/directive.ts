/**
 * Edited by Jafar Amini in March 2018.
 */
import {Directive, forwardRef, Input} from '@angular/core';
import { NG_VALIDATORS, Validator, AbstractControl } from '@angular/forms';

import { dateISO_8601 } from './validator';
import {isNullOrUndefined} from 'util';
import {ValidationMessage} from '../util/validation-message';
import {manageAddValidationAlert, manageDelValidationAlert} from '../util/lang';
import {ValidationConfig} from '../util/validation-config';

const DATE_ISO_VALIDATOR: any = {
  provide: NG_VALIDATORS,
  useExisting: forwardRef(() => DateISOValidator),
  multi: true
};

@Directive({
  selector: '[dateISO_8601][formControlName],[dateISO_8601][formControl],[dateISO_8601][ngModel]',
  providers: [DATE_ISO_VALIDATOR]
})
export class DateISOValidator implements Validator {
  @Input() dest: any;
  @Input() dateISO_8601MsgHtml: any;
  constructor(private ValidationConfig: ValidationConfig) {}
  validate(c: AbstractControl): {[key: string]: any} {
    const vClassSuffix = '-dateISO_8601';
    const iValidated = dateISO_8601(c);


    if (iValidated) {
      const innerHTML = getInnerHTML(this.dateISO_8601MsgHtml);
      manageAddValidationAlert(this.dest, vClassSuffix, innerHTML, this.ValidationConfig);
    } else {
      manageDelValidationAlert(this.dest, vClassSuffix)
    }


    return iValidated;
  }
}

export function getInnerHTML(msgHtml) {
  let innerHTML;
  if (!isNullOrUndefined(msgHtml)) {
    innerHTML = msgHtml;
  }  else {
    const vMessage = new ValidationMessage().getDateISO_8601();
    innerHTML = vMessage.title + '<br/>' + vMessage.description;
  }
  return innerHTML;
}
