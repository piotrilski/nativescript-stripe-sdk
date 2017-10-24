import { EventData, Observable } from "tns-core-modules/data/observable";

export interface StripePaymentEventData extends EventData {
  cardParams: STPCardParams;
  eventName: string;
  object: Observable;
}
