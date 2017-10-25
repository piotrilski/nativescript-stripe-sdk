import { CommonModule } from '@angular/common';
import {
  NgModule,
  NO_ERRORS_SCHEMA,
} from '@angular/core';
import { NativeScriptModule } from 'nativescript-angular/nativescript.module';
import { NativeScriptRouterModule, NSModuleFactoryLoader } from 'nativescript-angular/router';
import { NativeScriptStripeSdkModule } from 'nativescript-stripe-sdk/angular';

import * as application from 'tns-core-modules/application';
import * as platform from 'tns-core-modules/platform';

import { AppComponent } from './app.component';
import { routes } from './app.routing';

const stripeSdk = require('nativescript-stripe-sdk');

application.on(application.launchEvent, () => {
  if (platform.isIOS) {
    stripeSdk.StripeSdk.setApiKey('yourApiKey');
  }
});

@NgModule({
    bootstrap: [AppComponent],
    imports: [
        CommonModule,
        NativeScriptModule,
        NativeScriptStripeSdkModule,
        NativeScriptRouterModule,
        NativeScriptRouterModule.forRoot(routes)
    ],
    declarations: [AppComponent],
    schemas: [NO_ERRORS_SCHEMA]
})
export class AppModule { }
