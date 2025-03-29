import {
  Component,
  HostBinding,
  HostListener,
  inject,
  Input,
  OnChanges,
  SimpleChanges,
} from "@angular/core";
import { Post } from "../post";
import { Router, RouterLink } from "@angular/router";
import { FavoriteService } from "../../favorite/favorite.service";
import { AuthenticationService } from "../../authentication/authentication.service";

@Component({
  selector: "app-post-card",
  imports: [RouterLink],
  templateUrl: "./post-card.component.html",
  styleUrl: "./post-card.component.scss",
})
export class PostCardComponent implements OnChanges {
  favoriteService = inject(FavoriteService);
  authenticationService = inject(AuthenticationService);
  router = inject(Router);

  @Input()
  post: Partial<Post> = {};
  @Input()
  @HostBinding("style.--lines")
  maxLines = 0;
  @HostBinding("style.cursor")
  cursor = "auto";
  @HostBinding("class.favorited")
  get favorited() {
    return this.post.favorited;
  }

  @HostListener("click")
  onHostClick() {
    if (this.post.id) this.router.navigate(["/post", this.post.id]);
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

  ngOnChanges(changes: SimpleChanges) {
    if ("post" in changes) {
      const pointer =
        this.post.id && location.pathname !== `/post/${this.post.id}`;
      this.cursor = pointer ? "pointer" : "auto";
    }
  }

  get username(): string {
    return this.post.username || "";
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
}
