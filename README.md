# NativeScript Stripe-SDK
> This repo is based on [@Osei Fortune](https://github.com/triniwiz)'s [nativescript-stripe](https://github.com/triniwiz/nativescript-stripe). Perfect job, Sir!


IMPORTANT: Highly recomend using [@Osei Fortune](https://github.com/triniwiz)'s
[nativescript-stripe](https://github.com/triniwiz/nativescript-stripe)

The purpose of this plugin is to add some specific functionalities required by the app I work on. I have also wanted to use official [nativescript-plugin-seed](https://github.com/NativeScript/nativescript-plugin-seed)


Implemented for iOS only - this plugin uses 11.3 Stripe's SDK.

<img src="https://github.com/piotrilski/nativescript-stripe-sdk/blob/master/media/token_ios.gif" height="662px"/>


## Installation

```bash
tns plugin add nativescript-stripe-sdk
```

## Usage

### IMPORTANT: SDK API key needs to be set on app startup
	```javascript
    import { StripeSdk } from 'nativescript-stripe-sdk';

    application.on(application.launchEvent, () => {
        if (platform.isIOS) {
            StripeSdk.setApiKey('pk_test_u6EwgR7lHu8YKOqO5AOynNVj');
        }
    });
    ```)

### Usage in UI

    ```xml
    <!-- predefined/binded values -->
    <ui:StripePaymentCardTextField
      expDate="{{ date }}"
      number="{{ number }}"
      cvc="{{ cvc }}"/>

    <!-- callback -->
     <ui:StripePaymentCardTextField
      paymentCardTextFieldDidChange="{{ callbackFn }}"/>
    ```

### Check if given CC is valid (card of STPCardParams type)
    ```javascript
    import { StripeSdk } from 'nativescript-stripe-sdk';

    const isValid = StripeSdk.validateCard(card);
    ```

### Generate stripe token
IMPORTANT: valid stripe API key needs to be set on app startup

     ```javascript
    import { StripeSdk } from 'nativescript-stripe-sdk';

    StripeSdk
        .createToken(card.cardParams)
        .then(token => { console.log(token); })
        .catch(error => { console.error(error); });
    ```

## API

In XML:
| Property | Default | Description |
| --- | --- | --- |
| expDate | not set | CC expiration date - typeof Date |
| number | not set | CC number - typeof string |
| cvc | not set | CC expiration date - typeof string |

## Running the demo app
```
git clone git@github.com:piotrilski/nativescript-stripe-sdk.git
cd src/
npm run setup
npm run demo.ios
```

## License

Apache License Version 2.0, January 2004
