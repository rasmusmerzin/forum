import { Component } from "@angular/core";
import { NavigationComponent } from "../navigation/navigation.component";
import { HeaderComponent } from "./header/header.component";

@Component({
  selector: "app-me",
  imports: [NavigationComponent, HeaderComponent],
  templateUrl: "./me.component.html",
  styleUrl: "./me.component.scss",
})
export class MeComponent {}
