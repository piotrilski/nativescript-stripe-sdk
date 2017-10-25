import { Directive } from "@angular/core";

@Directive({
    selector: "StripePaymentCardTextField"
})
export class StripePaymentCardTextFieldDirective { }

export const DIRECTIVES = [StripePaymentCardTextFieldDirective];
