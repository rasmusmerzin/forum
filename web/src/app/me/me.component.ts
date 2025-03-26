import { Component, inject, OnDestroy, OnInit } from "@angular/core";
import { NavigationComponent } from "../navigation/navigation.component";
import { HeaderComponent } from "./header/header.component";
import { AuthenticationService } from "../authentication/authentication.service";
import { Router, RouterOutlet } from "@angular/router";
import { Post } from "../post/post";
import { PostService } from "../post/post.service";
import { PostCardComponent } from "../post/post-card/post-card.component";
import { SpinnerComponent } from "../spinner/spinner.component";

@Component({
  selector: "app-me",
  imports: [
    RouterOutlet,
    NavigationComponent,
    HeaderComponent,
    PostCardComponent,
    SpinnerComponent,
  ],
  templateUrl: "./me.component.html",
  styleUrl: "./me.component.scss",
})
export class MeComponent implements OnInit, OnDestroy {
  router = inject(Router);
  authenticationService = inject(AuthenticationService);
  postService = inject(PostService);

  posts?: Post[];
  loading = true;
  before = "";

  ngOnInit() {
    setTimeout(() => this.authenticationService.checkLogin());
    this.loadMorePosts();
  }

  async loadMorePosts() {
    const username = this.authenticationService.getUsername();
    if (!username) return;
    try {
      this.loading = true;
      const posts = await this.postService.fetchUserPosts(
        username,
        this.before,
      );
      if (!this.posts) this.posts = posts;
      else this.posts.push(...posts);
      if (posts.length === 10) this.before = posts[posts.length - 1].created;
      else this.before = "";
    } catch (error) {
      console.error(error);
    } finally {
      this.loading = false;
    }
  }

  ngOnDestroy() {
    this.authenticationService.hideLogin();
  }

  onPostClick(post: Post) {
    this.router.navigate(["/post", post.id]);
  }
}
