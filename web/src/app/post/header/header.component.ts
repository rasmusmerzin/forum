import { Component, inject, Input } from "@angular/core";
import { PostService } from "../post.service";
import { Post } from "../post";
import { AuthenticationService } from "../../authentication/authentication.service";

@Component({
  selector: "app-post-header",
  imports: [],
  templateUrl: "./header.component.html",
  styleUrl: "./header.component.scss",
})
export class HeaderComponent {
  postService = inject(PostService);
  authenticationService = inject(AuthenticationService);

  username = this.authenticationService.getUsername();
  @Input()
  post?: Post;

  onBackClick() {
    history.back();
  }

  async onDeleteClick() {
    if (!this.post || this.post.username !== this.username) return;
    if (!confirm("Are you sure you want to delete this post?")) return;
    const { id } = this.post;
    await this.postService.deletePost(id);
    history.back();
  }
}
