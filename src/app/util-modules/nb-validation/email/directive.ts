/**
 * Edited by Jafar Amini in March 2018.
 */
import {Directive, forwardRef, Input} from '@angular/core';
import { NG_VALIDATORS, Validator, AbstractControl } from '@angular/forms';

import { email } from './validator';
import {ValidationMessage} from '../util/validation-message';
import {isNullOrUndefined} from 'util';
import {manageAddValidationAlert, manageDelValidationAlert} from '../util/lang';
import {ValidationConfig} from '../util/validation-config';

const EMAIL_VALIDATOR: any = {
  provide: NG_VALIDATORS,
  useExisting: forwardRef(() => EmailValidator),
  multi: true
};

@Directive({
  selector: '[ngvemail][formControlName],[ngvemail][formControl],[ngvemail][ngModel]',
  providers: [EMAIL_VALIDATOR]
})
export class EmailValidator implements Validator {
  @Input() dest: any;
  @Input() emailMsgHtml: any;
  constructor(private ValidationConfig: ValidationConfig) {}
  validate(c: AbstractControl): {[key: string]: any} {
    const vClassSuffix = '-email';
    const iValidated = email(c);
    if (iValidated) {
        const innerHTML = getInnerHTML(this.emailMsgHtml);
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
    const vMessage = new ValidationMessage().getEmail();
    innerHTML = vMessage.title;
  }
  return innerHTML;
}
