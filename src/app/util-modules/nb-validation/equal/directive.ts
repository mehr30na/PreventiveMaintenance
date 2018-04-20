/**
 * Edited by Jafar Amini in March 2018.
 */
import { Directive, Input, forwardRef, OnInit, SimpleChanges, OnChanges } from '@angular/core';
import { NG_VALIDATORS, Validator, ValidatorFn, AbstractControl } from '@angular/forms';

import { equal } from './validator';
import {ValidationMessage} from '../util/validation-message';
import {isNullOrUndefined} from 'util';
import {manageAddValidationAlert, manageDelValidationAlert} from '../util/lang';
import {ValidationConfig} from '../util/validation-config';

const EQUAL_VALIDATOR: any = {
  provide: NG_VALIDATORS,
  useExisting: forwardRef(() => EqualValidator),
  multi: true
};

@Directive({
  selector: '[equal][formControlName],[equal][formControl],[equal][ngModel]',
  providers: [EQUAL_VALIDATOR]
})
export class EqualValidator implements Validator, OnInit, OnChanges {
  @Input() equal: any;
  @Input() dest: any;
  @Input() equalٰValueTitle: any;
  @Input() equalMsgHtml: any;
  constructor(private ValidationConfig: ValidationConfig) {}
  private validator: ValidatorFn;
  private onChange: () => void;

  ngOnInit() {
    this.validator = equal(this.equal);
  }

  ngOnChanges(changes: SimpleChanges) {
    for (const key in changes) {
      if (key === 'equal') {
        this.validator = equal(changes[key].currentValue);
        if (this.onChange) {
          this.onChange();
        }
      }
    }
  }

  validate(c: AbstractControl): {[key: string]: any} {
    // return this.validator(c);
    const vClassSuffix = '-equal';
    const iValidated = this.validator(c);
    if (iValidated) {
      const innerHTML = getInnerHTML(this.equal, this.equalٰValueTitle, this.equalMsgHtml);
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
    const vMessage = new ValidationMessage().getEqual(valueTitle);
    innerHTML = vMessage.title;
  } else {
    const vMessage = new ValidationMessage().getEqual(value);
    innerHTML = vMessage.title;
  }
  return innerHTML;
}
