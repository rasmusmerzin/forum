import { Component, inject } from "@angular/core";
import { Comment } from "../../comment/comment";
import { AuthenticationService } from "../../authentication/authentication.service";
import { CommentService } from "../../comment/comment.service";
import { CommentCardComponent } from "../../comment/comment-card/comment-card.component";
import { SpinnerComponent } from "../../spinner/spinner.component";

@Component({
  selector: "app-me-comments",
  imports: [CommentCardComponent, SpinnerComponent],
  templateUrl: "./comments.component.html",
  styleUrl: "./comments.component.scss",
})
export class CommentsComponent {
  authenticationService = inject(AuthenticationService);
  commentService = inject(CommentService);

  comments?: Comment[];
  loading = true;
  before = "";

  ngOnInit() {
    this.loadMoreComments();
  }

  async loadMoreComments() {
    const username = this.authenticationService.getUsername();
    if (!username) return;
    try {
      this.loading = true;
      const comments = await this.commentService.fetchUserComments(
        username,
        this.before,
      );
      if (!this.comments) this.comments = comments;
      else this.comments.push(...comments);
      if (comments.length === 10)
        this.before = comments[comments.length - 1].created;
      else this.before = "";
    } catch (error) {
      console.error(error);
    } finally {
      this.loading = false;
    }
  }
}
