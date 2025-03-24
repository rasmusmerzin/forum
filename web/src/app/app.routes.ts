import { Routes } from "@angular/router";
import { HomeComponent } from "./home/home.component";
import { NewComponent } from "./new/new.component";
import { MeComponent } from "./me/me.component";

export const routes: Routes = [
  {
    path: "",
    redirectTo: "home",
    pathMatch: "full",
  },
  {
    path: "home",
    children: [
      {
        path: "",
        redirectTo: "new",
        pathMatch: "full",
      },
      {
        path: "new",
        component: HomeComponent,
      },
      {
        path: "hot",
        component: HomeComponent,
      },
    ],
  },
  {
    path: "new",
    component: NewComponent,
  },
  {
    path: "me",
    component: MeComponent,
  },
];
