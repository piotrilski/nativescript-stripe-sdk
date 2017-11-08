import { Observable } from 'tns-core-modules/data/observable';
import { StripeSdk } from 'nativescript-stripe-sdk';

export class HelloWorldModel extends Observable {
  date: Date;
  cardValid: boolean;

  tokenProcessing: boolean;
  token: string;

  constructor() {
    super();

    this.set('cardValid', false);
    this.set('date', new Date(2018, 11, 1));
  }

  callbackFn(card: any) {
    const isValid = StripeSdk.validateCard(card.cardParams);

    this.set('cardValid', isValid);

    if (isValid) {
      this.set('tokenProcessing', true);
      this.set('token', null);

      StripeSdk
        .createToken(card.cardParams)
        .then(token => {
          this.set('tokenProcessing', false);
          this.set('token', token.toString());
        })
        .catch((error: Error) => {
          this.set('tokenProcessing', false);
          this.set('token', error.message);
        });
    }
  }
}
