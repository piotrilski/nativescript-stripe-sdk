import {
  StripePaymentCardTextFieldBase,
  cardCvcProperty,
  cardExpDateProperty,
  cardNumberProperty,
  cardCvcPlaceholder,
  cardExpirationPlaceholder,
  cardNumberPlaceholder,
} from './stripe-payment-card-text-field.common';

export class StripePaymentCardTextField extends StripePaymentCardTextFieldBase {
  private localDelegate: StripePaymentCardTextFieldDelegate;

  nativeView: STPPaymentCardTextField;

  constructor() {
    super();

    this.localDelegate = StripePaymentCardTextFieldDelegate
      .new()
      .initWithCallback((eventName, ccTextField) => {
        this.eventsHandler(eventName, ccTextField);
      });
  }

  private overrideSTPCardParams(
    currentParams: STPCardParams,
    toOverride: Map<string, string|number>
  ): STPCardParams {
    const cc = STPCardParams.new();

    StripePaymentCardTextFieldBase.STPCardParamsProperties
      .forEach(property => {
        cc[property] = toOverride.get(property) ?
          toOverride.get(property) :
          currentParams[property];
      });

    return cc;
  }

  private eventsHandler(
    eventName: string,
    ccTextField: STPPaymentCardTextField,
  ) {
   this.makeNotification({
     eventName,
     cardParams: ccTextField.cardParams,
    });
  }

  /**
   * Creates new native button.
   */
  createNativeView(): Object {
    const ccTextField = STPPaymentCardTextField
      .alloc()
      .initWithFrame(CGRectMake(10, 10, 300, 44));

    return ccTextField;
  }

  initNativeView(): void {
    /**
     * When nativeView is tapped we get the owning JS object
     * through this field.
     */
    (<any>this.nativeView).owner = this;
    (<any>this.nativeView).delegate = this.localDelegate;

    super.initNativeView();
  }

  disposeNativeView(): void {
    /**
     *  Remove reference from native listener to this instance.
     */
    (<any>this.nativeView).owner = null;
    (<any>this.nativeView).delegate = null;

    super.disposeNativeView();
  }

  /**
   * Set credit card number
   * @param value CC number as string
   */
  [cardNumberProperty.setNative](value: string) {
    const map = new Map<string, string>();

    map.set('number', value);

    this.nativeView.cardParams = this
      .overrideSTPCardParams(this.nativeView.cardParams, map);
  }

  /**
   * Set CVC
   * @param value CVC string
   */
  [cardCvcProperty.setNative](value: string) {
    const map = new Map<string, string>();

    map.set('cvc', value);

    this.nativeView.cardParams = this
      .overrideSTPCardParams(this.nativeView.cardParams, map);
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

    const map = new Map<string, number>();

    map.set('expYear', value.getFullYear());
    map.set('expMonth', value.getMonth());

    this.nativeView.cardParams = this
      .overrideSTPCardParams(this.nativeView.cardParams, map);
  }

  /**
   * Set CC's number placeholder
   * @param value number placeholder
   */
  [cardNumberPlaceholder.setNative](value: string) {
    this.nativeView.numberPlaceholder = value;
  }

  /**
   * Set CC's CVC placeholder
   * @param value CVC placeholder
   */
  [cardCvcPlaceholder.setNative](value: string) {
    this.nativeView.cvcPlaceholder = value;
  }

  /**
   * Set CC's expiration placeholder
   * @param value expiration placeholder
   */
  [cardExpirationPlaceholder.setNative](value: string) {
    this.nativeView.expirationPlaceholder = value;
  }
}

class StripePaymentCardTextFieldDelegate extends NSObject
  implements STPPaymentCardTextFieldDelegate {

  static ObjCProtocols = [STPPaymentCardTextFieldDelegate];

  static new(): StripePaymentCardTextFieldDelegate {
    return <StripePaymentCardTextFieldDelegate>super.new();
  }

  private ccTextFieldCallback: (eventName: string, ccTextField: STPPaymentCardTextField) => void;

  private callHandler(
    eventName: string,
    textField: STPPaymentCardTextField,
  ) {
    if (this.ccTextFieldCallback) {
      this.ccTextFieldCallback(eventName, textField);
    }
  }

  initWithCallback(callback: (eventName: string, ccTextField: STPPaymentCardTextField) => void) {
    this.ccTextFieldCallback = callback;

    return this;
  }

  paymentCardTextFieldDidChange?(textField: STPPaymentCardTextField): void {
    this.callHandler(
      StripePaymentCardTextFieldBase.paymentCardTextFieldDidChangeEvent,
      textField,
    );
  }

  paymentCardTextFieldDidEndEditing?(textField: STPPaymentCardTextField): void {
    this.callHandler(
      StripePaymentCardTextFieldBase.paymentCardTextFieldDidEndEditingEvent,
      textField,
    );
  }

  paymentCardTextFieldDidEndEditingCVC?(textField: STPPaymentCardTextField): void {
    this.callHandler(
      StripePaymentCardTextFieldBase.paymentCardTextFieldDidEndEditingCVCEvent,
      textField,
    );
  }

  paymentCardTextFieldDidEndEditingExpiration?(textField: STPPaymentCardTextField): void {
    this.callHandler(
      StripePaymentCardTextFieldBase.paymentCardTextFieldDidEndEditingExpirationEvent,
      textField,
    );
  }

  paymentCardTextFieldDidEndEditingNumber?(textField: STPPaymentCardTextField): void {
    this.callHandler(
      StripePaymentCardTextFieldBase.paymentCardTextFieldDidEndEditingNumberEvent,
      textField,
    );
  }
}
