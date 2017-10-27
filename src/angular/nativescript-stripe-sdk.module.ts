import { NgModule } from "@angular/core";
import { registerElement, isKnownView } from "nativescript-angular/element-registry";

import { DIRECTIVES } from "./nativescript-stripe-sdk.directives";

@NgModule({
    declarations: [DIRECTIVES],
    exports: [DIRECTIVES],
})
export class NativeScriptStripeSdkModule { }

if (!isKnownView('StripePaymentCardTextField')) {
    registerElement("StripePaymentCardTextField", () => require("../").StripePaymentCardTextField);
}
