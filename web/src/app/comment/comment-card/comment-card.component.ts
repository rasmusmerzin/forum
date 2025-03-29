import { Component, inject, Input } from "@angular/core";
import { Comment } from "../comment";
import { CommentService } from "../comment.service";
import { AuthenticationService } from "../../authentication/authentication.service";

@Component({
  selector: "app-comment-card",
  imports: [],
  templateUrl: "./comment-card.component.html",
  styleUrl: "./comment-card.component.scss",
})
export class CommentCardComponent {
  commentService = inject(CommentService);
  authorizationService = inject(AuthenticationService);

  userUsername = this.authorizationService.getUsername();
  @Input()
  comment: Partial<Comment> = {};

  get username(): string {
    return this.comment.username || "";
  }

  get content(): string {
    return this.comment.content || "";
  }

  get favorites(): number {
    return this.comment.favorites || 0;
  }

  async deleteComment(): Promise<void> {
    if (!this.comment.id || this.userUsername !== this.username) return;
    if (!confirm("Are you sure you want to delete this comment?")) return;
    await this.commentService.deleteComment(this.comment.id);
    location.reload();
  }
}
