import { Component, HostBinding, inject, Input } from "@angular/core";
import { Comment } from "../comment";
import { CommentService } from "../comment.service";
import { AuthenticationService } from "../../authentication/authentication.service";
import { Router, RouterLink } from "@angular/router";
import { FavoriteService } from "../../favorite/favorite.service";
import { BlankService } from "../../blank/blank.service";
import { HintService } from "../../hint/hint.service";

@Component({
  selector: "app-comment-card",
  imports: [RouterLink],
  templateUrl: "./comment-card.component.html",
  styleUrl: "./comment-card.component.scss",
})
export class CommentCardComponent {
  router = inject(Router);
  commentService = inject(CommentService);
  authenticationService = inject(AuthenticationService);
  favoriteService = inject(FavoriteService);
  blankService = inject(BlankService);
  hintService = inject(HintService);

  userUsername = this.authenticationService.getUsername();
  @Input()
  comment: Partial<Comment> = {};
  @HostBinding("class.favorited")
  get favorited() {
    return this.comment.favorited;
  }

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
    await this.blankService.refresh();
    this.hintService.showHint("Comment deleted", 3000);
  }

  onFavoriteClick(event: MouseEvent) {
    event.stopPropagation();
    if (!this.comment.id || this.comment.favorited == null) return;
    if (!this.authenticationService.getUsername()) {
      this.router.navigate(["/me"]);
      return;
    }
    this.comment.favorited = !this.comment.favorited;
    this.comment.favorites = this.comment.favorites || 0;
    if (this.comment.favorited) {
      this.favoriteService.favoriteComment(this.comment.id);
      this.comment.favorites++;
    } else {
      this.favoriteService.unfavoriteComment(this.comment.id);
      this.comment.favorites--;
    }
  }
}
