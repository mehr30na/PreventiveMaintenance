/**
 * Edited by Jafar Amini in March 2018.
 */
import { Directive, Input, forwardRef, OnInit, SimpleChanges, OnChanges } from '@angular/core';
import { NG_VALIDATORS, Validator, ValidatorFn, AbstractControl } from '@angular/forms';

import { notEqual } from './validator';
import {manageAddValidationAlert, manageDelValidationAlert} from '../util/lang';
import {ValidationMessage} from '../util/validation-message';
import {isNullOrUndefined} from "util";
import {ValidationConfig} from '../util/validation-config';

const NOT_EQUAL_VALIDATOR: any = {
  provide: NG_VALIDATORS,
  useExisting: forwardRef(() => NotEqualValidator),
  multi: true
};

@Directive({
  selector: '[notEqual][formControlName],[notEqual][formControl],[notEqual][ngModel]',
  providers: [NOT_EQUAL_VALIDATOR]
})
export class NotEqualValidator implements Validator, OnInit, OnChanges {
  constructor(private ValidationConfig: ValidationConfig) {}
  @Input() notEqual: any;
  @Input() dest: any;
  @Input() notEqualValueTitle: any;
  @Input() notEqualMsgHtml: any;
  private validator: ValidatorFn;
  private onChange: () => void;

  ngOnInit() {
    this.validator = notEqual(this.notEqual);
  }

  ngOnChanges(changes: SimpleChanges) {
    for (const key in changes) {
      if (key === 'notEqual') {
        this.validator = notEqual(changes[key].currentValue);
        if (this.onChange) {
          this.onChange();
        }
      }
    }
  }

  validate(c: AbstractControl): {[key: string]: any} {
    // return this.validator(c);
    const vClassSuffix = '-notEqual';
    const iValidated = this.validator(c);
    if (iValidated) {
      const innerHTML = getInnerHTML(this.notEqual, this.notEqualValueTitle, this.notEqualMsgHtml);
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
  if (!isNullOrUndefined(msgHtml)) {
    innerHTML = msgHtml;
  } else if (!isNullOrUndefined(valueTitle)) {
    const vMessage = new ValidationMessage().getNotEqual(valueTitle);
    innerHTML = vMessage.title;
  } else {
    const vMessage = new ValidationMessage().getNotEqual(value);
    innerHTML = vMessage.title;
  }
  return innerHTML;
}

