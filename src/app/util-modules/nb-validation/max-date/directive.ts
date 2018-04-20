/**
 * Edited by Jafar Amini in March 2018.
 */
import { Directive, Input, forwardRef, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { NG_VALIDATORS, Validator, ValidatorFn, AbstractControl } from '@angular/forms';

import { maxDate } from './validator';
import {ValidationMessage} from '../util/validation-message';
import {isNullOrUndefined} from "util";
import {manageAddValidationAlert, manageDelValidationAlert} from '../util/lang';
import {ValidationConfig} from '../util/validation-config';

const MAX_DATE_VALIDATOR: any = {
  provide: NG_VALIDATORS,
  useExisting: forwardRef(() => MaxDateValidator),
  multi: true
};

@Directive({
  selector: '[maxDate][formControlName],[maxDate][formControl],[maxDate][ngModel]',
  providers: [MAX_DATE_VALIDATOR]
})
export class MaxDateValidator implements Validator, OnInit, OnChanges {
  constructor(private ValidationConfig: ValidationConfig) {}
  @Input() maxDate;
  @Input() dest: any;
  @Input() maxDateValTitle: any;
  @Input() maxDateMsgHtml: any;
  private validator: ValidatorFn;
  private onChange: () => void;

  ngOnInit() {
    this.validator = maxDate(this.maxDate);
  }

  ngOnChanges(changes: SimpleChanges) {
    for (const key in changes) {
      if (key === 'maxDate') {
        this.validator = maxDate(changes[key].currentValue);
        if (this.onChange) {
          this.onChange();
        }
      }
    }
  }

  validate(c: AbstractControl): {[key: string]: any} {
    // return this.validator(c);

    const vClassSuffix = '-maxDate';
    const iValidated = this.validator(c);
    if (iValidated) {
      console.log('this.maxDate --->', this.maxDate);
      const innerHTML = getInnerHTML(this.maxDate.value, this.maxDateValTitle, this.maxDateMsgHtml);
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
    const vMessage = new ValidationMessage().getMaxDate(valueTitle);
    innerHTML = vMessage.title;
  } else {
    const vMessage = new ValidationMessage().getMaxDate(value);
    innerHTML = vMessage.title;
  }
  return innerHTML;
}

