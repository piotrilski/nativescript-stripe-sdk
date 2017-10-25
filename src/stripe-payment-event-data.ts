import { EventData } from "tns-core-modules/data/observable";

export interface StripePaymentEventData extends EventData {
  cardParams: any;
}
