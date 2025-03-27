import { Component, inject, OnDestroy, OnInit } from "@angular/core";
import { NavigationComponent } from "../navigation/navigation.component";
import { HeaderComponent } from "./header/header.component";
import { AuthenticationService } from "../authentication/authentication.service";
import { PostsComponent } from "./posts/posts.component";

@Component({
  selector: "app-me",
  imports: [NavigationComponent, HeaderComponent, PostsComponent],
  templateUrl: "./me.component.html",
  styleUrl: "./me.component.scss",
})
export class MeComponent implements OnInit, OnDestroy {
  authenticationService = inject(AuthenticationService);

  ngOnInit() {
    setTimeout(() => this.authenticationService.checkLogin());
  }

  ngOnDestroy() {
    this.authenticationService.hideLogin();
  }
}
