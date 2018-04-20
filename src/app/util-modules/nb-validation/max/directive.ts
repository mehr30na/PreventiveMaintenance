/**
 * Edited by Jafar Amini in March 2018.
 */
import { Directive, Input, forwardRef, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { NG_VALIDATORS, Validator, ValidatorFn, AbstractControl } from '@angular/forms';

import { max } from './validator';
import {manageAddValidationAlert, manageDelValidationAlert} from '../util/lang';
import {ValidationMessage} from '../util/validation-message';
import {isNullOrUndefined} from "util";
import {ValidationConfig} from '../util/validation-config';

const MAX_VALIDATOR: any = {
  provide: NG_VALIDATORS,
  useExisting: forwardRef(() => MaxValidator),
  multi: true
};

@Directive({
  selector: '[max][formControlName],[max][formControl],[max][ngModel]',
  providers: [MAX_VALIDATOR]
})
export class MaxValidator implements Validator, OnInit, OnChanges {
  constructor(private ValidationConfig: ValidationConfig) {}
  @Input() max: number;
  @Input() dest: any;
  @Input() maxValTitle: any;
  @Input() maxMsgHtml: any;
  private validator: ValidatorFn;
  private onChange: () => void;

  ngOnInit() {
    this.validator = max(this.max);
  }

  ngOnChanges(changes: SimpleChanges) {
    for (const key in changes) {
      if (key === 'max') {
        this.validator = max(changes[key].currentValue);
        if (this.onChange) {
          this.onChange();
        }
      }
    }
  }

  validate(c: AbstractControl): {[key: string]: any} {
    // return this.validator(c);
    const vClassSuffix = '-max';
    const iValidated = this.validator(c);
    if (iValidated) {
      const innerHTML = getInnerHTML(this.max, this.maxValTitle, this.maxMsgHtml);
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
    const vMessage = new ValidationMessage().getMax(valueTitle);
    innerHTML = vMessage.title;
  } else {
    const vMessage = new ValidationMessage().getMax(value);
    innerHTML = vMessage.title;
  }
  return innerHTML;
}

