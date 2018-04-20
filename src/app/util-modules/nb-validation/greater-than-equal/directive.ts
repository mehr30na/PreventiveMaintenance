/**
 * Edited by Jafar Amini in March 2018.
 */
import { Directive, Input, forwardRef, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { NG_VALIDATORS, Validator, ValidatorFn, AbstractControl } from '@angular/forms';

import { gte } from './validator';
import {manageAddValidationAlert, manageDelValidationAlert} from '../util/lang';
import {ValidationMessage} from '../util/validation-message';
import {isNullOrUndefined} from "util";
import {ValidationConfig} from '../util/validation-config';

const GREATER_THAN_EQUAL_VALIDATOR: any = {
  provide: NG_VALIDATORS,
  useExisting: forwardRef(() => GreaterThanEqualValidator),
  multi: true
};

@Directive({
  selector: '[gte][formControlName],[gte][formControl],[gte][ngModel]',
  providers: [GREATER_THAN_EQUAL_VALIDATOR]
})
export class GreaterThanEqualValidator implements Validator, OnInit, OnChanges {
  constructor(private ValidationConfig: ValidationConfig) {}
  @Input() gte: number;
  @Input() dest: any;
  @Input() gteٰValTitle: any;
  @Input() gteMsgHtml: any;
  private validator: ValidatorFn;
  private onChange: () => void;

  ngOnInit() {
    this.validator = gte(this.gte);
  }

  ngOnChanges(changes: SimpleChanges) {
    for (const key in changes) {
      if (key === 'gte') {
        this.validator = gte(changes[key].currentValue);
        if (this.onChange) {
          this.onChange();
        }
      }
    }
  }

  validate(c: AbstractControl): {[key: string]: any} {
    // return this.validator(c);
    const vClassSuffix = '-gte';
    const iValidated = this.validator(c);
    if (iValidated) {
      const innerHTML = getInnerHTML(this.gte, this.gteٰValTitle, this.gteMsgHtml);
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
    const vMessage = new ValidationMessage().getGte(valueTitle);
    innerHTML = vMessage.title;
  } else {
    const vMessage = new ValidationMessage().getGte(value);
    innerHTML = vMessage.title;
  }
  return innerHTML;
}
