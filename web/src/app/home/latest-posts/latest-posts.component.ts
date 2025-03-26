import { Component, inject } from "@angular/core";
import { PostCardComponent } from "../../post/post-card/post-card.component";
import { SpinnerComponent } from "../../spinner/spinner.component";
import { AuthenticationService } from "../../authentication/authentication.service";
import { PostService } from "../../post/post.service";
import { Post } from "../../post/post";

@Component({
  selector: "app-home-latest-posts",
  imports: [PostCardComponent, SpinnerComponent],
  templateUrl: "./latest-posts.component.html",
  styleUrl: "./latest-posts.component.scss",
})
export class LatestPostsComponent {
  authenticationService = inject(AuthenticationService);
  postService = inject(PostService);

  posts?: Post[];
  loading = true;
  before = "";

  ngOnInit() {
    this.loadMorePosts();
  }

  async loadMorePosts() {
    try {
      this.loading = true;
      const posts = await this.postService.fetchNewPosts(this.before);
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
