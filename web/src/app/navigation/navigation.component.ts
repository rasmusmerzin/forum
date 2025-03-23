import { Component } from "@angular/core";
import { RouterLink, RouterModule } from "@angular/router";

@Component({
  selector: "app-navigation",
  imports: [RouterLink, RouterModule],
  templateUrl: "./navigation.component.html",
  styleUrl: "./navigation.component.scss",
})
export class NavigationComponent {}
