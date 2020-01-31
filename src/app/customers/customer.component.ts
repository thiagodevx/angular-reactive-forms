import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl, FormArray } from '@angular/forms';

import { Customer } from './customer';
import { ratingRangeFromXToY } from '../number-validator';
import { compareEmails } from '../email-validator';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {

  customerForm: FormGroup;
  customer = new Customer();
  emailMessage: string;
  validationMessages = {
    required: 'Please entenr your email address.',
    email: 'Please inform a valid email address.'
  };

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.initializeForm();
    this.addFormControlEvents();
  }

  initializeForm() {
    this.customerForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.minLength(3)]],
      lastName: ['', [Validators.required, Validators.maxLength(50)]],
      emailGroup: this.fb.group({
        email: ['', [Validators.required, Validators.email]],
        confirmEmail: ['', [Validators.required]]
      }, {validator: compareEmails}),
      phone: '',
      rating: [5, ratingRangeFromXToY(1, 5)],
      notification: 'email',
      sendCatalog: true,
      addresses: this.fb.array([this.buildAddressFormGroup()])
    });
  }

  buildAddressFormGroup(): FormGroup {
    return this.fb.group({
      addressType: 'home',
        street1: '',
        street2: '',
        city: '',
        state: '',
        zip: ''
    });
  }

  addFormControlEvents() {
    this.customerForm.get('notification').valueChanges.subscribe( value => {
      this.setNotification(value);
    });

    const emailControl = this.customerForm.get('emailGroup.email');
    emailControl.valueChanges.pipe(debounceTime(1000)).subscribe( value => this.setMessage(emailControl));
  }

  setMessage(control: AbstractControl): void {
    this.emailMessage = '';
    if ( (control.touched || control.dirty) && control.errors) {
      console.log(this.validationMessages);
      const errors = Object.keys(control.errors);
      this.emailMessage = errors.map(error => this.validationMessages[error]).join(' ');
    }
  }

  populateTestData(): void {
    this.customerForm.patchValue({
      firstName: 'Jack',
      lastName: 'Harkness',
      sendCatalog: false,
      email: 'jack@torchwood.com'
    });
  }

  setNotification(notifyVia: string) {
    const phoneControl = this.customerForm.get('phone');
    if (notifyVia === 'text') {
      phoneControl.setValidators(Validators.required);
    } else {
      phoneControl.clearValidators();
    }
    phoneControl.updateValueAndValidity();
  }

  save() {
    console.log(this.customerForm);
    console.log('Saved: ' + JSON.stringify(this.customerForm.value));
  }

  get addresses(): FormArray {
    return this.customerForm.get('addresses') as FormArray;
  }
}
