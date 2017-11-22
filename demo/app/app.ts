import "./bundle-config";
import * as application from 'tns-core-modules/application';
import * as platform from 'tns-core-modules/platform';

import { StripeSdk } from 'nativescript-stripe-sdk';

application.on(application.launchEvent, () => {
  StripeSdk.setApiKey('yourApiKey');
});

application.start({ moduleName: "main-page" });
