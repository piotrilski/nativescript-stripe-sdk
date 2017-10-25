import { AppComponent } from './app.component';

export const routes = [
  {
      path: "welcome",
      component: AppComponent
  },
  {
      path: "",
      redirectTo: "welcome",
      pathMatch: "full"
  },
];
