import {
  StripePaymentCardTextFieldBase,
  cardCvcProperty,
  cardExpDateProperty,
  cardNumberProperty,
  cardCvcPlaceholder,
  cardExpirationPlaceholder,
  cardNumberPlaceholder,
} from './stripe-payment-card-text-field.common';
import * as utils from "tns-core-modules/utils/utils";

declare const com;

export class StripePaymentCardTextField extends StripePaymentCardTextFieldBase {
  private context: any;
  private cardInputListener: any; // com.stripe.android.view.CardInputListener

  nativeView: any; // com.stripe.android.view.CardInputWidget;

  constructor() {
    super();

    this.context = utils.ad.getApplicationContext();
    this.cardInputListener = new com.stripe.android.view.CardInputListener({
      onFocusChange: focusField => {
        this.eventsHandler(
          // `onFocusChange: ${focusField}`,
          StripePaymentCardTextFieldBase
            .paymentCardTextFieldDidChangeEvent,
          this.nativeView.getCard(),
        );
      },
      onCardComplete: () => {
        this.eventsHandler(
          StripePaymentCardTextFieldBase
            .paymentCardTextFieldDidEndEditingNumberEvent,
          this.nativeView.getCard(),
        );
        this.eventsHandler(
          StripePaymentCardTextFieldBase
            .paymentCardTextFieldDidChangeEvent,
          this.nativeView.getCard(),
        );
      },
      onExpirationComplete: () => {
        this.eventsHandler(
          StripePaymentCardTextFieldBase
            .paymentCardTextFieldDidEndEditingExpirationEvent,
          this.nativeView.getCard(),
        );
        this.eventsHandler(
          StripePaymentCardTextFieldBase
            .paymentCardTextFieldDidChangeEvent,
          this.nativeView.getCard(),
        );
      },
      onCvcComplete: () => {
        this.eventsHandler(
          StripePaymentCardTextFieldBase.
            paymentCardTextFieldDidEndEditingCVCEvent,
          this.nativeView.getCard(),
        );
        this.eventsHandler(
          StripePaymentCardTextFieldBase
            .paymentCardTextFieldDidChangeEvent,
          this.nativeView.getCard(),
        );
      },
    });
  }

  private eventsHandler(
    eventName: string,
    ccTextField: any,
  ) {
   this.makeNotification({
     eventName,
     cardParams: ccTextField,
    });
  }

  createNativeView(): Object {
    return new com.stripe.android.view.CardInputWidget(
      this.context);
  }

  initNativeView(): void {
    this.nativeView.setCardInputListener(this.cardInputListener);

    super.initNativeView();
  }

  /**
   * Set credit card number
   * @param value CC number as string
   */
  [cardNumberProperty.setNative](value: string) {
    this.nativeView.setCardNumber(value);
  }

  /**
   * Set CVC
   * @param value CVC string
   */
  [cardCvcProperty.setNative](value: string) {
    this.nativeView.setCvcCode(value);
  }

  /**
   * Both expYear and expMonth are needed to be set at once.
   * Currently there's no option to programatically set only
   * one of them. It is not going to be shown on UI in such case.
   * @param value date
   */
  [cardExpDateProperty.setNative](value: Date) {
    if (!value) {
      return;
    }

    this.nativeView.setExpiryDate(
      value.getMonth(),
      value.getFullYear(),
    );
  }
}
