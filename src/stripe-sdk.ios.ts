import { StripeSdkBase } from './stripe-sdk.common';

export class StripeSdk extends StripeSdkBase {
  nativeView: STPPaymentCardTextField;

  /**
     * Creates new native button.
     */
    public createNativeView(): Object {
      console.error('Create new instance');

      const button = STPPaymentCardTextField.alloc()
        .initWithFrame(CGRectMake(10, 10, 300, 44));

      return button;
  }

  /**
   * Initializes properties/listeners of the native view.
   */
  initNativeView(): void {
      console.error('Attach the owner to nativeView.');
      // When nativeView is tapped we get the owning JS object through this field.
      (<any>this.nativeView).owner = this;
      super.initNativeView();
  }

  /**
   * Clean up references to the native view and resets nativeView to its original state.
   * If you have changed nativeView in some other way except through setNative callbacks
   * you have a chance here to revert it back to its original state
   * so that it could be reused later.
   */
  disposeNativeView(): void {
      // Remove reference from native listener to this instance.
      (<any>this.nativeView).owner = null;

      // If you want to recycle nativeView and have modified the nativeView
      // without using Property or CssProperty (e.g. outside our property system - 'setNative' callbacks)
      // you have to reset it to its initial state here.
      super.disposeNativeView();
  }
}
