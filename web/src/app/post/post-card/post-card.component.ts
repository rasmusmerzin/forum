import {
  Component,
  HostBinding,
  HostListener,
  inject,
  Input,
} from "@angular/core";
import { Post } from "../post";
import { Router, RouterLink } from "@angular/router";
import { FavoriteService } from "../../favorite/favorite.service";
import { AuthenticationService } from "../../authentication/authentication.service";
import { formatDateAgo } from "../../date";
import { PostService } from "../post.service";
import { HintService } from "../../hint/hint.service";
import { BlankService } from "../../blank/blank.service";

@Component({
  selector: "app-post-card",
  imports: [RouterLink],
  templateUrl: "./post-card.component.html",
  styleUrl: "./post-card.component.scss",
})
export class PostCardComponent {
  favoriteService = inject(FavoriteService);
  authenticationService = inject(AuthenticationService);
  postService = inject(PostService);
  hintService = inject(HintService);
  blankService = inject(BlankService);
  router = inject(Router);

  userUsername = this.authenticationService.getUsername();
  @Input()
  post: Partial<Post> = {};
  @Input()
  @HostBinding("style.--lines")
  maxLines = 0;

  @HostBinding("style.cursor")
  get cursor() {
    const pointer =
      this.post.id && location.pathname !== `/post/${this.post.id}`;
    return pointer ? "pointer" : "auto";
  }
  @HostBinding("class.favorited")
  get favorited() {
    return this.post.favorited;
  }
  get username(): string {
    return this.post.username || "";
  }
  get verified(): boolean {
    return this.post.verified || false;
  }
  get content(): string {
    return this.post.content || "";
  }
  get favorites(): number {
    return this.post.favorites || 0;
  }
  get comments(): number {
    return this.post.comments || 0;
  }
  get createdAgo(): string {
    return this.post.created ? formatDateAgo(this.post.created) : "";
  }
  get created(): string {
    return this.post.created
      ? new Date(this.post.created).toLocaleString()
      : "";
  }

  @HostListener("click")
  onHostClick() {
    if (this.post.id) this.router.navigate(["/post", this.post.id]);
  }

  async onDeleteClick(event: MouseEvent) {
    event.stopPropagation();
    if (!this.post?.id || this.post.username !== this.username) return;
    if (!confirm("Are you sure you want to delete this post?")) return;
    await this.postService.deletePost(this.post.id);
    await this.blankService.refresh();
    this.hintService.showHint("Post deleted", 3000);
  }

  onFavoriteClick(event: MouseEvent) {
    event.stopPropagation();
    if (!this.post.id || this.post.favorited == null) return;
    if (!this.authenticationService.getUsername()) {
      this.router.navigate(["/me"]);
      return;
    }
    this.post.favorited = !this.post.favorited;
    this.post.favorites = this.post.favorites || 0;
    if (this.post.favorited) {
      this.favoriteService.favoritePost(this.post.id);
      this.post.favorites++;
    } else {
      this.favoriteService.unfavoritePost(this.post.id);
      this.post.favorites--;
    }
  }
}
