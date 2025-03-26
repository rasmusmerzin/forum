import { Component, inject, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Post } from "./post";
import { PostService } from "./post.service";
import { SpinnerComponent } from "../spinner/spinner.component";
import { HeaderComponent } from "./header/header.component";
import { PostCardComponent } from "./post-card/post-card.component";

@Component({
  selector: "app-post",
  imports: [SpinnerComponent, HeaderComponent, PostCardComponent],
  templateUrl: "./post.component.html",
  styleUrl: "./post.component.scss",
})
export class PostComponent implements OnInit {
  route = inject(ActivatedRoute);
  postService = inject(PostService);

  loading = true;
  post?: Post;

  async ngOnInit() {
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
}
