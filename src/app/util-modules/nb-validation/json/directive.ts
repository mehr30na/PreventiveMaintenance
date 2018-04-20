/**
 * Edited by Jafar Amini in March 2018.
 */
import {Directive, forwardRef, Input} from '@angular/core';
import { NG_VALIDATORS, Validator, AbstractControl } from '@angular/forms';

import { json } from './validator';
import {manageAddValidationAlert, manageDelValidationAlert} from '../util/lang';
import {ValidationMessage} from '../util/validation-message';
import {isNullOrUndefined} from "util";
import {ValidationConfig} from '../util/validation-config';

const JSON_VALIDATOR: any = {
  provide: NG_VALIDATORS,
  useExisting: forwardRef(() => JSONValidator),
  multi: true
};

@Directive({
  selector: '[json][formControlName],[json][formControl],[json][ngModel]',
  providers: [JSON_VALIDATOR]
})
export class JSONValidator implements Validator {
  constructor(private ValidationConfig: ValidationConfig) {}
  @Input() dest: any;
  @Input() jsonMsgHtml: any;
  validate(c: AbstractControl): {[key: string]: any} {
    // return json(c);
    const vClassSuffix = '-json';
    const iValidated = json(c);
    if (iValidated) {
      const innerHTML = getInnerHTML(this.jsonMsgHtml);
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
    const vMessage = new ValidationMessage().getJson();
    innerHTML = vMessage.title;
  }
  return innerHTML;
}
