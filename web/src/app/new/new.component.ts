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

const { virtualKeyboard } = navigator as any;

@Component({
  selector: "app-new",
  imports: [FormsModule, HeaderComponent],
  templateUrl: "./new.component.html",
  styleUrl: "./new.component.scss",
})
export class NewComponent implements AfterViewInit, OnDestroy {
  authenticationService = inject(AuthenticationService);

  @ViewChild("textarea")
  textarea?: ElementRef<HTMLElement | null>;
  @ViewChild("main")
  main?: ElementRef<HTMLElement | null>;

  content = "";
  preview = false;

  ngAfterViewInit(): void {
    this.resize();
    addEventListener("resize", this.resizeTextarea);
    setTimeout(() => {
      this.authenticationService.checkLogin();
      if (!this.authenticationService.getUsername()) return;
      this.textarea?.nativeElement?.focus();
      if (virtualKeyboard) {
        virtualKeyboard.overlaysContent = true;
        virtualKeyboard.addEventListener("geometrychange", this.resize);
      }
    });
  }

  ngOnDestroy(): void {
    this.authenticationService.hideLogin();
    removeEventListener("resize", this.resizeTextarea);
    if (virtualKeyboard) {
      virtualKeyboard.overlaysContent = false;
      virtualKeyboard.removeEventListener("geometrychange", this.resize);
    }
  }

  togglePreview() {
    this.preview = !this.preview;
    setTimeout(this.resizeTextarea);
  }

  resize = () => {
    this.resizeMain();
    this.resizeTextarea();
  };

  resizeMain() {
    const { nativeElement } = this.main || {};
    if (!nativeElement) return;
    const height = innerHeight - 48 - virtualKeyboard?.boundingRect.height || 0;
    nativeElement.style.height = height + "px";
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
