import { Component, inject, OnDestroy, OnInit } from "@angular/core";
import { NavigationComponent } from "../navigation/navigation.component";
import { HeaderComponent } from "./header/header.component";
import { AuthenticationService } from "../authentication/authentication.service";
import { PostsComponent } from "./posts/posts.component";
import { TabsComponent } from "../tabs/tabs.component";
import { CommentsComponent } from "./comments/comments.component";

let storedTab = "posts";

@Component({
  selector: "app-me",
  imports: [
    NavigationComponent,
    HeaderComponent,
    TabsComponent,
    PostsComponent,
    CommentsComponent,
  ],
  templateUrl: "./me.component.html",
  styleUrl: "./me.component.scss",
})
export class MeComponent implements OnInit, OnDestroy {
  authenticationService = inject(AuthenticationService);

  tabs = ["posts", "comments"];
  selectedTab = storedTab;

  ngOnInit() {
    setTimeout(() => this.authenticationService.checkLogin());
  }

  ngOnDestroy() {
    this.authenticationService.hideLogin();
    storedTab = this.selectedTab;
  }
}
