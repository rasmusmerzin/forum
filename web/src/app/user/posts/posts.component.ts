import { Component, inject } from "@angular/core";
import { PostService } from "../../post/post.service";
import { ActivatedRoute } from "@angular/router";
import { Post } from "../../post/post";
import { PostCardComponent } from "../../post/post-card/post-card.component";
import { SpinnerComponent } from "../../spinner/spinner.component";

@Component({
  selector: "app-user-posts",
  imports: [PostCardComponent, SpinnerComponent],
  templateUrl: "./posts.component.html",
  styleUrl: "./posts.component.scss",
})
export class PostsComponent {
  route = inject(ActivatedRoute);
  postService = inject(PostService);
  username = this.route.snapshot.params["username"];

  posts?: Post[];
  loading = true;
  before = "";

  ngOnInit() {
    this.loadMorePosts();
  }

  async loadMorePosts() {
    try {
      this.loading = true;
      const posts = await this.postService.fetchUserPosts(
        this.username,
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
