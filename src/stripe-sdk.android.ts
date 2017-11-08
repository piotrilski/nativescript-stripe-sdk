import * as utils from "tns-core-modules/utils/utils";

declare const com;

export class StripeSdk {
  static apiKey: string;

  /**
   * Set the API key
   * @param key api key
   */
  static setApiKey(key: string): void {
    StripeSdk.apiKey = key;
  }

  /**
   * Create Stripe Token
   * @param card {com.stripe.android.model.Card} CC object
   */
  static createToken(card: any): Promise<any> {
    const that = new WeakRef(this);

    return new Promise((resolve, reject) => {
      if (!StripeSdk.apiKey) {
        reject(new Error('API Key needs to be set'));
      }

      try {
        const apiClient = new com.stripe.android.Stripe(
          utils.ad.getApplicationContext(),
          StripeSdk.apiKey);

        apiClient.createToken(
          card,
          new com.stripe.android.TokenCallback({
            owner: that.get(),
            onSuccess: token => {
              resolve(token);
            },
            onError: error => {
              reject(new Error(
                error.getLocalizedMessage(),
              ));
            },
          }),
        );
      } catch (error) {
        reject(new Error(error.getLocalizedMessage()));
      }
    });
  }

  static validateCard(card): boolean {
    /**
     * You can then directly access the widget and ask for a card object.
     * Note that if the data in the widget is either incomplete or fails
     * client-side validity checks, the Card object will be null.
     */
    return card && card.validateCard();
  }
}
