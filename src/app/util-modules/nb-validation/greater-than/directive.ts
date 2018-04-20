/**
 * Edited by Jafar Amini in March 2018.
 */
import { Directive, Input, forwardRef, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { NG_VALIDATORS, Validator, ValidatorFn, AbstractControl } from '@angular/forms';

import { gt } from './validator';
import {ValidationMessage} from '../util/validation-message';
import {isNullOrUndefined} from 'util';
import {manageAddValidationAlert, manageDelValidationAlert} from '../util/lang';
import {ValidationConfig} from '../util/validation-config';

const GREATER_THAN_VALIDATOR: any = {
  provide: NG_VALIDATORS,
  useExisting: forwardRef(() => GreaterThanValidator),
  multi: true
};

@Directive({
  selector: '[gt][formControlName],[gt][formControl],[gt][ngModel]',
  providers: [GREATER_THAN_VALIDATOR]
})
export class GreaterThanValidator implements Validator, OnInit, OnChanges {
  constructor(private ValidationConfig: ValidationConfig) {}
  @Input() gt: number;
  @Input() dest: any;
  @Input() gtٰValTitle: any;
  @Input() gtMsgHtml: any;

  private validator: ValidatorFn;
  private onChange: () => void;

  ngOnInit() {

    this.validator = gt(this.gt);
  }

  ngOnChanges(changes: SimpleChanges) {
    for (const key in changes) {
      if (key === 'gt') {
        this.validator = gt(changes[key].currentValue);
        if (this.onChange) {
          this.onChange();
        }
      }
      // if (key === 'des') {
      //   alert(this.des);
      // }
    }
  }

  validate(c: AbstractControl): {[key: string]: any} {
    // return this.validator(c);
    const vClassSuffix = '-gt';
    const iValidated = this.validator(c);
    if (iValidated) {
      const innerHTML = getInnerHTML(this.gt, this.gtٰValTitle, this.gtMsgHtml);
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
    const vMessage = new ValidationMessage().getGt(valueTitle);
    innerHTML = vMessage.title;
  } else {
    const vMessage = new ValidationMessage().getGt(value);
    innerHTML = vMessage.title;
  }
  return innerHTML;
}
