/**
 * Edited by Jafar Amini in March 2018.
 */
import {Directive, forwardRef, Input} from '@angular/core';
import { NG_VALIDATORS, Validator, AbstractControl } from '@angular/forms';

import { number } from './validator';
import {manageAddValidationAlert, manageDelValidationAlert} from '../util/lang';
import {isNullOrUndefined} from "util";
import {ValidationMessage} from '../util/validation-message';
import {ValidationConfig} from '../util/validation-config';

const NUMBER_VALIDATOR: any = {
  provide: NG_VALIDATORS,
  useExisting: forwardRef(() => NumberValidator),
  multi: true
};

@Directive({
  selector: '[number][formControlName],[number][formControl],[number][ngModel]',
  providers: [NUMBER_VALIDATOR]
})
export class NumberValidator implements Validator {
  constructor(private ValidationConfig: ValidationConfig) {}
  @Input() dest: any;
  @Input() numberMsgHtml: any;
  validate(c: AbstractControl): {[key: string]: any} {
    // return number(c);
    const vClassSuffix = '-number';
    const iValidated = number(c);
    if (iValidated) {
      const innerHTML = getInnerHTML(this.numberMsgHtml);
      manageAddValidationAlert(this.dest, vClassSuffix, innerHTML, this.ValidationConfig);
    } else {
      manageDelValidationAlert(this.dest, vClassSuffix);
    }
    return iValidated;
  }
}


export function getInnerHTML(msgHtml) {
  let innerHTML;
  if (!isNullOrUndefined(msgHtml)) {
    innerHTML = msgHtml;
  }  else {
    const vMessage = new ValidationMessage().getNumber();
    innerHTML = vMessage.title;
  }
  return innerHTML;
}
