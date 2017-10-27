import { View, Property } from "tns-core-modules/ui/core/view";
import { EventData } from "tns-core-modules/data/observable";

import { StripePaymentEventData } from './stripe-payment-event-data';
import { StripeCardParams } from "./stripe-models";

export class StripePaymentCardTextFieldBase extends View {
  /**
   * The name of the property is important it should be eventname+ Event
   */
  static paymentCardTextFieldDidChangeEvent: string = 'paymentCardTextFieldDidChange';
  static paymentCardTextFieldDidEndEditingEvent: string = 'paymentCardTextFieldDidEndEditing';
  static paymentCardTextFieldDidEndEditingCVCEvent: string = 'paymentCardTextFieldDidEndEditingCVC';
  static paymentCardTextFieldDidEndEditingExpirationEvent: string = 'paymentCardTextFieldDidEndEditingExpiration';
  static paymentCardTextFieldDidEndEditingNumberEvent: string = 'paymentCardTextFieldDidEndEditingNumber';

  static STPCardParamsProperties: string[] = [
    'number',
    'cvc',
    'expYear',
    'expMonth',
  ];

  makeNotification(payload: {
    eventName: string,
    cardParams: StripeCardParams,
  }) {
    const {
      eventName,
      cardParams
    } = payload;

    switch (eventName) {
      /**
       * Lets not distinguish the type for the time being.
       */
      case StripePaymentCardTextFieldBase.paymentCardTextFieldDidEndEditingEvent:
      case StripePaymentCardTextFieldBase.paymentCardTextFieldDidEndEditingCVCEvent:
      case StripePaymentCardTextFieldBase.paymentCardTextFieldDidEndEditingExpirationEvent:
      case StripePaymentCardTextFieldBase.paymentCardTextFieldDidEndEditingNumberEvent:
      case StripePaymentCardTextFieldBase.paymentCardTextFieldDidChangeEvent: {
        super.notify(<StripePaymentEventData>{
          eventName,
          object: this,
          cardParams,
        });
      } break;

      default:
        return;
    }
  }
  /**
   * Initializes properties/listeners of the native view.
   */
  initNativeView(): void {
    super.initNativeView();
  }

  /**
   * Clean up references to the native view and resets nativeView to its original state.
   * If you have changed nativeView in some other way except through setNative callbacks
   * you have a chance here to revert it back to its original state
   * so that it could be reused later.
   */
  disposeNativeView(): void {

    // If you want to recycle nativeView and have modified the nativeView
    // without using Property or CssProperty (e.g. outside our property system - 'setNative' callbacks)
    // you have to reset it to its initial state here.
    super.disposeNativeView();
  }
}

export const cardNumberProperty =
  new Property<StripePaymentCardTextFieldBase, string>({ name: 'number' });

export const cardCvcProperty =
  new Property<StripePaymentCardTextFieldBase, string>({ name: 'cvc' });

export const cardExpDateProperty =
  new Property<StripePaymentCardTextFieldBase, string>({ name: 'expDate' });

export const cardNumberPlaceholder =
  new Property<StripePaymentCardTextFieldBase, string>({ name: 'cardNumberPlaceholder' });

export const cardCvcPlaceholder =
  new Property<StripePaymentCardTextFieldBase, string>({ name: 'cardCvcPlaceholder' });

export const cardExpirationPlaceholder =
  new Property<StripePaymentCardTextFieldBase, string>({ name: 'cardExpirationPlaceholder' });

cardNumberProperty.register(StripePaymentCardTextFieldBase);
cardCvcProperty.register(StripePaymentCardTextFieldBase);
cardExpDateProperty.register(StripePaymentCardTextFieldBase);
cardNumberPlaceholder.register(StripePaymentCardTextFieldBase);
cardCvcPlaceholder.register(StripePaymentCardTextFieldBase);
cardExpirationPlaceholder.register(StripePaymentCardTextFieldBase);
