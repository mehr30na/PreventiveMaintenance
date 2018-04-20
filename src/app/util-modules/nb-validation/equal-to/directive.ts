/**
 * Edited by Jafar Amini in March 2018.
 */
import { Directive, Input, forwardRef, OnInit } from '@angular/core';
import { NG_VALIDATORS, Validator, FormControl, ValidatorFn, AbstractControl } from '@angular/forms';

import { equalTo } from './validator';
import {ValidationMessage} from '../util/validation-message';
import {isNullOrUndefined} from "util";
import {manageAddValidationAlert, manageDelValidationAlert} from '../util/lang';
import {ValidationConfig} from '../util/validation-config';

const EQUAL_TO_VALIDATOR: any = {
  provide: NG_VALIDATORS,
  useExisting: forwardRef(() => EqualToValidator),
  multi: true
};

@Directive({
  selector: '[equalTo][formControlName],[equalTo][formControl],[equalTo][ngModel]',
  providers: [EQUAL_TO_VALIDATOR]
})
export class EqualToValidator implements Validator, OnInit {
  constructor(private ValidationConfig: ValidationConfig) {}
  @Input() equalTo: FormControl;
  @Input() dest: any;
  @Input() equalToValTitle: any;
  @Input() equalToMsgHtml: any;

  private validator: ValidatorFn;

  ngOnInit() {
    this.validator = equalTo(this.equalTo);
  }

  validate(c: AbstractControl): {[key: string]: any} {
    // return this.validator(c);
    const vClassSuffix = '-equalTo';
    const iValidated = this.validator(c);
    if (iValidated) {
      const innerHTML = getInnerHTML(this.equalTo, this.equalToValTitle, this.equalToMsgHtml);
      manageAddValidationAlert(this.dest, vClassSuffix, innerHTML, this.ValidationConfig);
    } else {
      manageDelValidationAlert(this.dest, vClassSuffix);
    }
    return iValidated;
  }
}

export function getInnerHTML(value, valueTitle, msgHtml) {
  let innerHTML;
  if (!isNullOrUndefined(msgHtml)) {
    innerHTML = msgHtml;
  } else if (!isNullOrUndefined(valueTitle)) {
    const vMessage = new ValidationMessage().getEqualTo(valueTitle);
    innerHTML = vMessage.title;
  } else {
    const vMessage = new ValidationMessage().getEqualTo(value);
    innerHTML = vMessage.title;
  }
  return innerHTML;
}
