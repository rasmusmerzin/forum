import {
  AfterViewInit,
  Component,
  ElementRef,
  inject,
  OnDestroy,
  OnInit,
  ViewChild,
} from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Post } from "../post";
import { PostService } from "../post.service";
import { HeaderComponent } from "./header/header.component";
import { FormsModule } from "@angular/forms";
import { AuthenticationService } from "../../authentication/authentication.service";
import { Comment } from "../../comment/comment";
import { CommentCardComponent } from "../../comment/comment-card/comment-card.component";
import { CommentService } from "../../comment/comment.service";
import { HintService } from "../../hint/hint.service";

const { virtualKeyboard } = navigator as any;

@Component({
  selector: "app-post-comment",
  imports: [HeaderComponent, FormsModule, CommentCardComponent],
  templateUrl: "./post-comment.component.html",
  styleUrl: "./post-comment.component.scss",
})
export class PostCommentComponent implements OnInit, AfterViewInit, OnDestroy {
  route = inject(ActivatedRoute);
  authenticationService = inject(AuthenticationService);
  postService = inject(PostService);
  commentService = inject(CommentService);
  hintService = inject(HintService);

  @ViewChild("textarea")
  textarea?: ElementRef<HTMLElement | null>;

  post?: Post;
  content = "";
  username = this.authenticationService.getUsername();
  preview = false;
  loading = false;

  get comment(): Partial<Comment> {
    return {
      username: this.username,
      content: this.content,
    };
  }

  async ngOnInit() {
    const { id } = this.route.snapshot.params;
    this.post = await this.postService.fetchPost(id);
  }

  async createComment() {
    const { id } = this.route.snapshot.params;
    if (!this.content.trim()) {
      if (this.preview) this.togglePreview();
      setTimeout(() => this.textarea?.nativeElement?.focus());
      return;
    }
    try {
      this.loading = true;
      await this.commentService.createComment(id, this.content);
      history.back();
      this.hintService.showHint("Comment created", 3000);
    } catch (error) {
      console.error(error);
    } finally {
      this.loading = false;
    }
  }

  ngAfterViewInit(): void {
    this.resizeTextarea();
    addEventListener("resize", this.resizeTextarea);
    setTimeout(() => {
      this.authenticationService.checkLogin();
      if (!this.authenticationService.getUsername()) return;
      this.textarea?.nativeElement?.focus();
      if (virtualKeyboard) {
        virtualKeyboard.overlaysContent = true;
        virtualKeyboard.addEventListener("geometrychange", this.resizeTextarea);
      }
    });
  }

  ngOnDestroy(): void {
    this.authenticationService.hideLogin();
    removeEventListener("resize", this.resizeTextarea);
    if (virtualKeyboard) {
      virtualKeyboard.overlaysContent = false;
      virtualKeyboard.removeEventListener(
        "geometrychange",
        this.resizeTextarea,
      );
    }
  }

  togglePreview() {
    this.preview = !this.preview;
    if (!this.preview)
      setTimeout(() => {
        this.resizeTextarea();
        this.textarea?.nativeElement?.focus();
      });
  }

  resizeTextarea = () => {
    const { nativeElement } = this.textarea || {};
    if (!nativeElement) return;
    nativeElement.style.height = "auto";
    const { scrollHeight } = nativeElement;
    const minHeight = 18 * 6;
    const maxHeight =
      innerHeight - 88 - virtualKeyboard?.boundingRect.height || 0;
    const newHeight = Math.max(
      minHeight,
      Math.min(scrollHeight + 4, maxHeight),
    );
    nativeElement.style.height = newHeight + "px";
  };
}
