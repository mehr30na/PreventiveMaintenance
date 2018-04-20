/**
 * Edited by Jafar Amini in March 2018.
 */
import { Directive, Input, forwardRef, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { NG_VALIDATORS, Validator, ValidatorFn, AbstractControl } from '@angular/forms';

import { lte } from './validator';
import {manageAddValidationAlert, manageDelValidationAlert} from '../util/lang';
import {ValidationMessage} from '../util/validation-message';
import {isNullOrUndefined} from "util";
import {ValidationConfig} from '../util/validation-config';

const LESS_THAN_EQUAL_VALIDATOR: any = {
  provide: NG_VALIDATORS,
  useExisting: forwardRef(() => LessThanEqualValidator),
  multi: true
};

@Directive({
  selector: '[lte][formControlName],[lte][formControl],[lte][ngModel]',
  providers: [LESS_THAN_EQUAL_VALIDATOR]
})
export class LessThanEqualValidator implements Validator, OnInit, OnChanges {
  constructor(private ValidationConfig: ValidationConfig) {}
  @Input() lte: number;
  @Input() dest: any;
  @Input() lteٰValTitle: any;
  @Input() lteMsgHtml: any;

  private validator: ValidatorFn;
  private onChange: () => void;

  ngOnInit() {
    this.validator = lte(this.lte);
  }

  ngOnChanges(changes: SimpleChanges) {
    for (const key in changes) {
      if (key === 'lte') {
        this.validator = lte(changes[key].currentValue);
        if (this.onChange) {
          this.onChange();
        }
      }
    }
  }

  validate(c: AbstractControl): {[key: string]: any} {
    // return this.validator(c);
    const vClassSuffix = '-lte';
    const iValidated = this.validator(c);
    if (iValidated) {
      const innerHTML = getInnerHTML(this.lte, this.lteٰValTitle, this.lteMsgHtml);
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
    const vMessage = new ValidationMessage().getLte(valueTitle);
    innerHTML = vMessage.title;
  } else {
    const vMessage = new ValidationMessage().getLte(value);
    innerHTML = vMessage.title;
  }
  return innerHTML;
}

