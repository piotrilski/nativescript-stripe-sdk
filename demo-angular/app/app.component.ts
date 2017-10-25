import {
  Component,
  ChangeDetectorRef,
  OnInit,
} from '@angular/core';
import { StripeSdk } from 'nativescript-stripe-sdk';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/observable/fromPromise';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';

@Component({
    selector: 'ns-app',
    templateUrl: 'app.component.html',
})
export class AppComponent implements OnInit {
  isValid: BehaviorSubject<boolean>;
  token: BehaviorSubject<string>;

  ngOnInit() {
    this.isValid = new BehaviorSubject<boolean>(false);
    this.token = new BehaviorSubject<string>(null);
  }

  onPaymentCardTextFieldDidChange(payload) {
    const isValid = StripeSdk.validateCard(payload.cardParams);

    this.isValid.next(isValid);
    this.token.next(null);

    if (isValid) {
      Observable
        .fromPromise(StripeSdk.createToken(payload.cardParams))
        .map(token => token.toString())
        .catch(error => error.message)
        .subscribe((tokenMessage: string) => {
          this.token.next(tokenMessage);
        });
    }
  }
}
