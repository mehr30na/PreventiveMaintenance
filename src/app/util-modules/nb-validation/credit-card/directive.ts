/**
 * Edited by Jafar Amini in March 2018.
 */
import {Directive, forwardRef, Input} from '@angular/core';
import { NG_VALIDATORS, Validator, AbstractControl } from '@angular/forms';

import { creditCard } from './validator';
import {ValidationMessage} from '../util/validation-message';
import {isNullOrUndefined} from 'util';
import {manageAddValidationAlert, manageDelValidationAlert} from '../util/lang';
import {email} from '../email/validator';
import {ValidationConfig} from '../util/validation-config';

const CREDIT_CARD_VALIDATOR: any = {
  provide: NG_VALIDATORS,
  useExisting: forwardRef(() => CreditCardValidator),
  multi: true
};

@Directive({
  selector: '[creditCard][formControlName],[creditCard][formControl],[creditCard][ngModel]',
  providers: [CREDIT_CARD_VALIDATOR]
})
export class CreditCardValidator implements Validator {
  @Input() dest: any;
  @Input() creditCardMsgHtml: any;
  constructor(private ValidationConfig: ValidationConfig) {}
  validate(c: AbstractControl): {[key: string]: any} {
    // return creditCard(c);
    const vClassSuffix = '-creditCard';
    const iValidated = creditCard(c);
    if (iValidated) {
      const innerHTML = getInnerHTML(this.creditCardMsgHtml);
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
    const vMessage = new ValidationMessage().getCreditCard();
    innerHTML = vMessage.title;
  }
  return innerHTML;
}
