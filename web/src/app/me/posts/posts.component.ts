import { Component, inject, OnInit } from "@angular/core";
import { PostCardComponent } from "../../post/post-card/post-card.component";
import { SpinnerComponent } from "../../spinner/spinner.component";
import { Router } from "@angular/router";
import { AuthenticationService } from "../../authentication/authentication.service";
import { PostService } from "../../post/post.service";
import { Post } from "../../post/post";

@Component({
  selector: "app-me-posts",
  imports: [PostCardComponent, SpinnerComponent],
  templateUrl: "./posts.component.html",
  styleUrl: "./posts.component.scss",
})
export class PostsComponent implements OnInit {
  router = inject(Router);
  authenticationService = inject(AuthenticationService);
  postService = inject(PostService);

  posts?: Post[];
  loading = true;
  before = "";

  ngOnInit() {
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
}
