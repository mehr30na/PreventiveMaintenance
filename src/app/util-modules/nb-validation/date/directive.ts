/**
 * Edited by Jafar Amini in March 2018.
 */
import {Directive, forwardRef, Input} from '@angular/core';
import { NG_VALIDATORS, Validator, AbstractControl } from '@angular/forms';

import { date } from './validator';
import {manageAddValidationAlert, manageDelValidationAlert} from '../util/lang';
import {email} from '../email/validator';
import {ValidationMessage} from '../util/validation-message';
import {isNullOrUndefined} from "util";
import {ValidationConfig} from '../util/validation-config';

const DATE_VALIDATOR: any = {
  provide: NG_VALIDATORS,
  useExisting: forwardRef(() => DateValidator),
  multi: true
};

@Directive({
  selector: '[date][formControlName],[date][formControl],[date][ngModel]',
  providers: [DATE_VALIDATOR]
})
export class DateValidator implements Validator {
  @Input() dest: any;
  @Input() dateMsgHtml: any;
  constructor(private ValidationConfig: ValidationConfig) {}
  validate(c: AbstractControl): {[key: string]: any} {
    // return date(c);
    const vClassSuffix = '-date';
    const iValidated = date(c);
    if (iValidated) {
      const innerHTML = getInnerHTML(this.dateMsgHtml);
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
    const vMessage = new ValidationMessage().getDate();
    innerHTML = vMessage.title;
  }
  return innerHTML;
}
