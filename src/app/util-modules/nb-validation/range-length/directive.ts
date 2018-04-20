/**
 * Edited by Jafar Amini in March 2018.
 */
import { Directive, Input, forwardRef, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { NG_VALIDATORS, Validator, ValidatorFn, AbstractControl } from '@angular/forms';

import { rangeLength } from './validator';
import {manageAddValidationAlert, manageDelValidationAlert} from '../util/lang';
import {ValidationMessage} from '../util/validation-message';
import {isNullOrUndefined} from "util";
import {ValidationConfig} from '../util/validation-config';

const RANGE_LENGTH_VALIDATOR: any = {
  provide: NG_VALIDATORS,
  useExisting: forwardRef(() => RangeLengthValidator),
  multi: true
};

@Directive({
  selector: '[rangeLength][formControlName],[rangeLength][formControl],[rangeLength][ngModel]',
  providers: [RANGE_LENGTH_VALIDATOR]
})
export class RangeLengthValidator implements Validator, OnInit, OnChanges {
  constructor(private ValidationConfig: ValidationConfig) {}
  @Input() rangeLength: [number];
  @Input() dest: any;
  @Input() rangeLengthValTitle: [string];
  @Input() rangeLengthMsgHtml: any;
  private validator: ValidatorFn;
  private onChange: () => void;

  ngOnInit() {
    this.validator = rangeLength(this.rangeLength);
  }

  ngOnChanges(changes: SimpleChanges) {
    for (const key in changes) {
      if (key === 'rangeLength') {
        this.validator = rangeLength(changes[key].currentValue);
        if (this.onChange) {
          this.onChange();
        }
      }
    }
  }

  validate(c: AbstractControl): {[key: string]: any} {
    // return this.validator(c);
    const vClassSuffix = '-rangeLength';
    const iValidated = this.validator(c);
    if (iValidated) {
      const innerHTML = getInnerHTML(this.rangeLength, this.rangeLengthValTitle, this.rangeLengthMsgHtml);
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
    const vMessage = new ValidationMessage().getRangeLength(valueTitle);
    innerHTML = vMessage.title;
  } else {
    const vMessage = new ValidationMessage().getRangeLength(value);
    innerHTML = vMessage.title;
  }
  return innerHTML;
}
