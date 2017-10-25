import { NgModule } from "@angular/core";
import { registerElement } from "nativescript-angular/element-registry";

import { DIRECTIVES } from "./nativescript-stripe-sdk.directives";

@NgModule({
    declarations: [DIRECTIVES],
    exports: [DIRECTIVES],
})
export class NativeScriptStripeSdkModule { }

registerElement("StripePaymentCardTextField", () => require("../").StripePaymentCardTextField);
