import { Component } from "@angular/core";
import { NavigationComponent } from "../navigation/navigation.component";
import { HeaderComponent } from "./header/header.component";

@Component({
  selector: "app-home",
  imports: [NavigationComponent, HeaderComponent],
  templateUrl: "./home.component.html",
  styleUrl: "./home.component.scss",
})
export class HomeComponent {}
