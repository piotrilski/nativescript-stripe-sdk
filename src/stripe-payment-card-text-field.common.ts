import { View, Property } from "tns-core-modules/ui/core/view";
import { StripePaymentEventData } from './stripe-payment-event-data';

export class StripePaymentCardTextFieldBase extends View {

  static paymentCardTextFieldDidChange: string = 'paymentCardTextFieldDidChange';
  static paymentCardTextFieldDidEndEditing: string = 'paymentCardTextFieldDidEndEditing';
  static paymentCardTextFieldDidEndEditingCVC: string = 'paymentCardTextFieldDidEndEditingCVC';
  static paymentCardTextFieldDidEndEditingExpiration: string = 'paymentCardTextFieldDidEndEditingExpiration';
  static paymentCardTextFieldDidEndEditingNumber: string = 'paymentCardTextFieldDidEndEditingNumber';

  static STPCardParamsProperties: string[] = ['number', 'cvc', 'expYear', 'expMonth'];


  // notify(args: any) {
  //   console.error(args.eventName);
  // }

  makeNotification(
    eventName: string,
    ccTextField: STPPaymentCardTextField,
  ) {
    switch (eventName) {
      /**
       * Lets not distinguish the type for the time being.
       */
      // case StripePaymentCardTextFieldBase.paymentCardTextFieldDidEndEditing:
      // case StripePaymentCardTextFieldBase.paymentCardTextFieldDidEndEditingCVC:
      // case StripePaymentCardTextFieldBase.paymentCardTextFieldDidEndEditingExpiration:
      // case StripePaymentCardTextFieldBase.paymentCardTextFieldDidEndEditingNumber:
      case StripePaymentCardTextFieldBase.paymentCardTextFieldDidChange: {
        this.notify(<StripePaymentEventData>{
          eventName,
          object: this,
          cardParams: ccTextField.cardParams,
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

cardNumberProperty.register(StripePaymentCardTextFieldBase);
cardCvcProperty.register(StripePaymentCardTextFieldBase);
cardExpDateProperty.register(StripePaymentCardTextFieldBase);
