import { StripeSdkBase } from './stripe-sdk.common';
export declare class StripeSdk extends StripeSdkBase {
    nativeView: STPPaymentCardTextField;
    createNativeView(): Object;
    initNativeView(): void;
    disposeNativeView(): void;
}
