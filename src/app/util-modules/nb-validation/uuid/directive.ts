/**
 * Edited by Jafar Amini in March 2018.
 */
import { Directive, Input, forwardRef, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { NG_VALIDATORS, Validator, ValidatorFn, AbstractControl } from '@angular/forms';

import { uuid } from './validator';
import {manageAddValidationAlert, manageDelValidationAlert} from '../util/lang';
import {ValidationMessage} from '../util/validation-message';
import {isNullOrUndefined} from 'util';
import {ValidationConfig} from '../util/validation-config';

const UUID_VALIDATOR: any = {
  provide: NG_VALIDATORS,
  useExisting: forwardRef(() => UUIDValidator),
  multi: true
};

@Directive({
  selector: '[uuid][formControlName],[uuid][formControl],[uuid][ngModel]',
  providers: [UUID_VALIDATOR]
})
export class UUIDValidator implements Validator, OnInit, OnChanges {
  constructor(private ValidationConfig: ValidationConfig) {}
  @Input() uuid;
  @Input() dest: any;
  @Input() uuidMsgHtml: any;
  private validator: ValidatorFn;
  private onChange: () => void;

  ngOnInit() {
    this.validator = uuid(this.uuid);
  }

  ngOnChanges(changes: SimpleChanges) {
    for (const key in changes) {
      if (key === 'uuid') {
        this.validator = uuid(changes[key].currentValue);
        if (this.onChange) {
          this.onChange();
        }
      }
    }
  }

  validate(c: AbstractControl): {[key: string]: any} {
    // return this.validator(c);
    const vClassSuffix = '-uuid';
    const iValidated = this.validator(c);
    if (iValidated) {
      const innerHTML = getInnerHTML(this.uuidMsgHtml);
      manageAddValidationAlert(this.dest, vClassSuffix, innerHTML, this.ValidationConfig);
    } else {
      manageDelValidationAlert(this.dest, vClassSuffix)
    }
    return iValidated;
  }

  registerOnValidatorChange(fn: () => void): void {
    this.onChange = fn;
  }
}

export function getInnerHTML(msgHtml) {
  let innerHTML;
  if (!isNullOrUndefined(msgHtml)) {
    innerHTML = msgHtml;
  }  else {
    const vMessage = new ValidationMessage().getUuid();
    innerHTML = vMessage.title;
  }
  return innerHTML;
}
