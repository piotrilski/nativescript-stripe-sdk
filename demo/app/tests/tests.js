var StripeSdk = require("nativescript-stripe-sdk").StripeSdk;
var stripeSdk = new StripeSdk();

describe("greet function", function() {
    it("exists", function() {
        expect(stripeSdk.greet).toBeDefined();
    });

    it("returns a string", function() {
        expect(stripeSdk.greet()).toEqual("Hello, NS");
    });
});