/**
 * Edited by Jafar Amini in March 2018.
 */
import { Directive, Input, forwardRef, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { NG_VALIDATORS, Validator, ValidatorFn, AbstractControl } from '@angular/forms';

import { property } from './validator';
import {manageAddValidationAlert, manageDelValidationAlert} from '../util/lang';
import {isNullOrUndefined} from "util";
import {ValidationMessage} from '../util/validation-message';
import {ValidationConfig} from '../util/validation-config';

const PROPERTY_VALIDATOR: any = {
  provide: NG_VALIDATORS,
  useExisting: forwardRef(() => PropertyValidator),
  multi: true
};

@Directive({
  selector: '[property][formControlName],[property][formControl],[property][ngModel]',
  providers: [PROPERTY_VALIDATOR]
})
export class PropertyValidator implements Validator, OnInit, OnChanges {
  constructor(private ValidationConfig: ValidationConfig) {}
  @Input() property: string;
  @Input() dest: any;
  @Input() propertyMsgHtml: any;
  private validator: ValidatorFn;
  private onChange: () => void;

  ngOnInit() {
    this.validator = property(this.property);
  }

  ngOnChanges(changes: SimpleChanges) {
    for (const key in changes) {
      if (key === 'property') {
        this.validator = property(changes[key].currentValue);
        if (this.onChange) {
          this.onChange();
        }
      }
    }
  }

  validate(c: AbstractControl): {[key: string]: any} {
    // return this.validator(c);
    const vClassSuffix = '-property';
    const iValidated = this.validator(c);
    if (iValidated) {
      const innerHTML = getInnerHTML(this.propertyMsgHtml, iValidated);
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

export function getInnerHTML(msgHtml, iValidated) {
  let innerHTML;
  if (!isNullOrUndefined(msgHtml)) {
    innerHTML = msgHtml;
  }  else {
    const vMessage = new ValidationMessage().getProperty(iValidated);
    innerHTML = vMessage.title + '<br/>' + vMessage.description;
  }
  return innerHTML;
}
