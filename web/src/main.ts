import { bootstrapApplication } from "@angular/platform-browser";
import { appConfig } from "./app/app.config";
import { AppComponent } from "./app/app.component";

new Image().src = "/auth-wall.webp";

bootstrapApplication(AppComponent, appConfig).catch((err) =>
  console.error(err),
);
