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
import { Router } from "@angular/router";

@Component({
  selector: "app-post-card",
  imports: [],
  templateUrl: "./post-card.component.html",
  styleUrl: "./post-card.component.scss",
})
export class PostCardComponent implements OnChanges {
  router = inject(Router);

  @Input()
  post: DeepPartial<Post> = {};
  @Input()
  @HostBinding("style.--lines")
  maxLines = 0;

  @HostBinding("style.cursor")
  cursor = "none";

  @HostListener("click")
  onHostClick() {
    if (this.post.id) this.router.navigate(["/post", this.post.id]);
  }

  ngOnChanges(changes: SimpleChanges) {
    if ("post" in changes) this.cursor = this.post.id ? "pointer" : "none";
  }

  get username(): string {
    return this.post.author?.username || "";
  }

  get content(): string {
    return this.post.content || "";
  }
}
