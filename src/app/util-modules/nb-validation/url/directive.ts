/**
 * Edited by Jafar Amini in March 2018.
 */
import {Directive, forwardRef, Input} from '@angular/core';
import { NG_VALIDATORS, Validator, AbstractControl } from '@angular/forms';

import { url } from './validator';
import {ValidationMessage} from '../util/validation-message';
import {isNullOrUndefined} from "util";
import {manageAddValidationAlert, manageDelValidationAlert} from '../util/lang';
import {ValidationConfig} from '../util/validation-config';

const URL_VALIDATOR: any = {
  provide: NG_VALIDATORS,
  useExisting: forwardRef(() => UrlValidator),
  multi: true
};

@Directive({
  selector: '[url][formControlName],[url][formControl],[url][ngModel]',
  providers: [URL_VALIDATOR]
})
export class UrlValidator implements Validator {
  constructor(private ValidationConfig: ValidationConfig) {}
  @Input() dest: any;
  @Input() urlMsgHtml: any;
  validate(c: AbstractControl): {[key: string]: any} {
    // return url(c);
    const vClassSuffix = '-url';
    const iValidated = url(c);
    if (iValidated) {
      const innerHTML = getInnerHTML(this.urlMsgHtml);
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
    const vMessage = new ValidationMessage().getUrl()
    innerHTML = vMessage.title;
  }
  return innerHTML;
}
