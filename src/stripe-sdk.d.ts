import { ios } from "tns-core-modules/utils/utils";
import {
  StripeCardParams,
  StripeToken,
} from "./stripe-models";

export class StripeSdk {
  static setApiKey(key: string): void ;
  static createToken(card: StripeCardParams): Promise<StripeToken>;
  static validateCard(card: StripeCardParams): boolean;
}
