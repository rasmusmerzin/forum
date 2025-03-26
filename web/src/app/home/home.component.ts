import { Component } from "@angular/core";
import { NavigationComponent } from "../navigation/navigation.component";
import { HeaderComponent } from "./header/header.component";
import { LatestPostsComponent } from "./latest-posts/latest-posts.component";

@Component({
  selector: "app-home",
  imports: [NavigationComponent, HeaderComponent, LatestPostsComponent],
  templateUrl: "./home.component.html",
  styleUrl: "./home.component.scss",
})
export class HomeComponent {}
