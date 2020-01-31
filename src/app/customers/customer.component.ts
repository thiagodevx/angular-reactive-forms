import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { Customer } from './customer';
import { ratingRangeFromXToY } from '../number-validator';
import { compareEmails } from '../email-validator';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {

  customerForm: FormGroup;
  customer = new Customer();

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
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
      sendCatalog: true
    });
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
}
