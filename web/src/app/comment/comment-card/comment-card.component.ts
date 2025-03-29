import { Component, Input } from "@angular/core";
import { Comment } from "../comment";

@Component({
  selector: "app-comment-card",
  imports: [],
  templateUrl: "./comment-card.component.html",
  styleUrl: "./comment-card.component.scss",
})
export class CommentCardComponent {
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
}
