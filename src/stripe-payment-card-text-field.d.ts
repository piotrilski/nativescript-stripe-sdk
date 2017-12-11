import {
  StripePaymentCardTextFieldBase,
} from './stripe-payment-card-text-field.common';

export class StripePaymentCardTextField extends StripePaymentCardTextFieldBase {
  nativeView: any;

  initNativeView(): void;
  disposeNativeView(): void;
}
