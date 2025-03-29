import { Component, inject, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Post } from "./post";
import { PostService } from "./post.service";
import { SpinnerComponent } from "../spinner/spinner.component";
import { HeaderComponent } from "./header/header.component";
import { PostCardComponent } from "./post-card/post-card.component";
import { CommentBarComponent } from "./comment-bar/comment-bar.component";
import { CommentService } from "../comment/comment.service";
import { Comment } from "../comment/comment";
import { CommentCardComponent } from "../comment/comment-card/comment-card.component";

@Component({
  selector: "app-post",
  imports: [
    SpinnerComponent,
    HeaderComponent,
    PostCardComponent,
    CommentBarComponent,
    CommentCardComponent,
  ],
  templateUrl: "./post.component.html",
  styleUrl: "./post.component.scss",
})
export class PostComponent implements OnInit {
  route = inject(ActivatedRoute);
  postService = inject(PostService);
  commentSerivce = inject(CommentService);

  loading = true;
  post?: Post;
  comments?: Comment[];
  after = "";

  async ngOnInit() {
    await this.loadPost();
    await this.loadMoreComments();
  }

  async loadPost() {
    const { id } = this.route.snapshot.params;
    try {
      this.loading = true;
      this.post = await this.postService.fetchPost(id);
    } catch (error) {
      console.error(error);
    } finally {
      this.loading = false;
    }
  }

  async loadMoreComments() {
    const { id } = this.route.snapshot.params;
    try {
      this.loading = true;
      const comments = await this.commentSerivce.fetchPostComments(
        id,
        this.after,
      );
      if (!this.comments) this.comments = comments;
      else this.comments.push(...comments);
      if (comments.length === 10)
        this.after = comments[comments.length - 1].created;
      else this.after = "";
    } catch (error) {
      console.error(error);
    } finally {
      this.loading = false;
    }
  }
}
