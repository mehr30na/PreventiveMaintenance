/**
 * Edited by Jafar Amini in March 2018.
 */
import {Directive, forwardRef, Input} from '@angular/core';
import { NG_VALIDATORS, Validator, AbstractControl } from '@angular/forms';

import { base64 } from './validator';
import {creditCard} from '../credit-card/validator';
import {manageAddValidationAlert, manageDelValidationAlert} from '../util/lang';
import {ValidationMessage} from '../util/validation-message';
import {isNullOrUndefined} from "util";
import {ValidationConfig} from '../util/validation-config';

const BASE64_VALIDATOR: any = {
  provide: NG_VALIDATORS,
  useExisting: forwardRef(() => Base64Validator),
  multi: true
};

@Directive({
  selector: '[base64][formControlName],[base64][formControl],[base64][ngModel]',
  providers: [BASE64_VALIDATOR]
})
export class Base64Validator implements Validator {
  @Input() dest: any;
  @Input() base64MsgHtml: any;
  constructor(private ValidationConfig: ValidationConfig) {}
  validate(c: AbstractControl): {[key: string]: any} {
    // return base64(c);
    const vClassSuffix = '-base64';
    const iValidated = base64(c);
    if (iValidated) {
      const innerHTML = getInnerHTML(this.base64MsgHtml);
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
    const vMessage = new ValidationMessage().getBase64();
    innerHTML = vMessage.title;
  }
  return innerHTML;
}
