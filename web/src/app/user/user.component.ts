import { Component } from "@angular/core";
import { HeaderComponent } from "./header/header.component";
import { HeaderCardComponent } from "./header-card/header-card.component";
import { PostsComponent } from "./posts/posts.component";

@Component({
  selector: "app-user",
  imports: [HeaderComponent, HeaderCardComponent, PostsComponent],
  templateUrl: "./user.component.html",
  styleUrl: "./user.component.scss",
})
export class UserComponent {}
