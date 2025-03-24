import { Routes } from "@angular/router";
import { HomeComponent } from "./home/home.component";
import { NewComponent } from "./new/new.component";
import { MeComponent } from "./me/me.component";
import { SettingsComponent } from "./me/settings/settings.component";
import { LogoutComponent } from "./me/logout/logout.component";

export const routes: Routes = [
  {
    path: "",
    redirectTo: "home",
    pathMatch: "full",
  },
  {
    path: "home",
    component: HomeComponent,
  },
  {
    path: "new",
    component: NewComponent,
  },
  {
    path: "me",
    component: MeComponent,
    children: [
      {
        path: "logout",
        component: LogoutComponent,
      },
    ],
  },
  {
    path: "me/settings",
    component: SettingsComponent,
  },
];
