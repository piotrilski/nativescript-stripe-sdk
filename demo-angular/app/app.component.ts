import { Component, ChangeDetectorRef } from "@angular/core";
import { StripeSdk } from 'nativescript-stripe-sdk';

@Component({
    selector: "ns-app",
    templateUrl: "app.component.html",
})
export class AppComponent {
  onPaymentCardTextFieldDidChange(payload) {
    const isValid = StripeSdk.validateCard(payload.cardParams);

    if (isValid) {
      StripeSdk
        .createToken(payload.cardParams)
        .then(token => {
          console.log('Created token: ', token.toString());
        })
        .catch((error: Error) => {
          console.error('Create token error: ', error);
        });
    }
  }
}
