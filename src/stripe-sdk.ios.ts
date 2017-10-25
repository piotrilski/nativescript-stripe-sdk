import { ios } from "tns-core-modules/utils/utils";
import {
  StripeCardParams,
  StripeToken,
} from "./stripe-models.ios";

export class StripeSdk {
  static setApiKey(key): void {
    STPPaymentConfiguration.sharedConfiguration().publishableKey = key;
  }

  static createToken(card: StripeCardParams): Promise<StripeToken> {
    const apiClient = ios.getter(
      STPAPIClient,
      STPAPIClient.sharedClient,
    );

    return new Promise<STPToken>((resolve, reject) => {
      apiClient.createTokenWithCardCompletion(card,
        (token: STPToken, error: NSError) => {
          if (error) {
            reject(new Error(error.localizedDescription));

            return;
          }

          resolve(token);
        });
    });
  }

  static validateCard(card: StripeCardParams): boolean {
    return STPCardValidator
      .validationStateForCard(card) === STPCardValidationState.Valid;
  }
}
