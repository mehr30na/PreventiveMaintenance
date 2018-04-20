/**
 * Edited by Jafar Amini in March 2018.
 */
import { Directive, Input, forwardRef, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { NG_VALIDATORS, Validator, ValidatorFn, AbstractControl } from '@angular/forms';

import { lt } from './validator';
import {ValidationMessage} from '../util/validation-message';
import {isNullOrUndefined} from "util";
import {manageAddValidationAlert, manageDelValidationAlert} from '../util/lang';
import {ValidationConfig} from '../util/validation-config';

const LESS_THAN_VALIDATOR: any = {
  provide: NG_VALIDATORS,
  useExisting: forwardRef(() => LessThanValidator),
  multi: true
};

@Directive({
  selector: '[lt][formControlName],[lt][formControl],[lt][ngModel]',
  providers: [LESS_THAN_VALIDATOR]
})
export class LessThanValidator implements Validator, OnInit, OnChanges {
  constructor(private ValidationConfig: ValidationConfig) {}
  @Input() lt: number;
  @Input() dest: any;
  @Input() ltValTitle: any;
  @Input() ltMsgHtml: any;

  private validator: ValidatorFn;
  private onChange: () => void;

  ngOnInit() {
    this.validator = lt(this.lt);
  }

  ngOnChanges(changes: SimpleChanges) {
    for (const key in changes) {
      if (key === 'lt') {
        this.validator = lt(changes[key].currentValue);
        if (this.onChange) {
          this.onChange();
        }
      }
    }
  }

  validate(c: AbstractControl): {[key: string]: any} {
    // return this.validator(c);
    const vClassSuffix = '-lt';
    const iValidated = this.validator(c);
    if (iValidated) {
      const innerHTML = getInnerHTML(this.lt, this.ltValTitle, this.ltMsgHtml);
      manageAddValidationAlert(this.dest, vClassSuffix, innerHTML, this.ValidationConfig);
    } else {
      manageDelValidationAlert(this.dest, vClassSuffix);
    }
    return iValidated;
  }

  registerOnValidatorChange(fn: () => void): void {
    this.onChange = fn;
  }
}


export function getInnerHTML(value, valueTitle, msgHtml) {
  let innerHTML;
  // alert('msgHtml: ')
  if (!isNullOrUndefined(msgHtml)) {
    innerHTML = msgHtml;
  } else if (!isNullOrUndefined(valueTitle)) {
    const vMessage = new ValidationMessage().getLt(valueTitle);
    innerHTML = vMessage.title;
  } else {
    const vMessage = new ValidationMessage().getLt(value);
    innerHTML = vMessage.title;
  }
  return innerHTML;
}
