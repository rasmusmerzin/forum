import {
  AfterViewInit,
  Component,
  ElementRef,
  inject,
  OnDestroy,
  ViewChild,
} from "@angular/core";
import { HeaderComponent } from "./header/header.component";
import { AuthenticationService } from "../authentication/authentication.service";
import { FormsModule } from "@angular/forms";
import { PostService } from "../post/post.service";
import { Router } from "@angular/router";
import { PostCardComponent } from "../post/post-card/post-card.component";

const { virtualKeyboard } = navigator as any;

@Component({
  selector: "app-new",
  imports: [FormsModule, HeaderComponent, PostCardComponent],
  templateUrl: "./new.component.html",
  styleUrl: "./new.component.scss",
})
export class NewComponent implements AfterViewInit, OnDestroy {
  authenticationService = inject(AuthenticationService);
  postService = inject(PostService);
  router = inject(Router);

  @ViewChild("textarea")
  textarea?: ElementRef<HTMLElement | null>;

  username = this.authenticationService.getUsername();
  content = "";
  preview = false;
  loading = false;

  async post() {
    if (!this.content.trim()) return;
    try {
      this.loading = true;
      const { id } = await this.postService.createPost(this.content);
      this.router.navigate(["/post", id], { replaceUrl: true });
    } catch (error: any) {
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
      innerHeight - 56 - virtualKeyboard?.boundingRect.height || 0;
    const newHeight = Math.max(
      minHeight,
      Math.min(scrollHeight + 4, maxHeight),
    );
    nativeElement.style.height = newHeight + "px";
  };
}
