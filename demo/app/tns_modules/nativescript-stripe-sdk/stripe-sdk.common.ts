import { View, Style, Property, CssProperty, isIOS } from "tns-core-modules/ui/core/view";
import * as app from 'tns-core-modules/application';

export abstract class StripeSdkBase extends View {
  text: string;
}

export const textProperty = new Property<StripeSdkBase, string>({ name: "text", defaultValue: "", affectsLayout: isIOS });

textProperty.register(StripeSdkBase);
