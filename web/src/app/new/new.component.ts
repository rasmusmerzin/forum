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

const { virtualKeyboard } = navigator as any;

@Component({
  selector: "app-new",
  imports: [HeaderComponent],
  templateUrl: "./new.component.html",
  styleUrl: "./new.component.scss",
})
export class NewComponent implements AfterViewInit, OnDestroy {
  authenticationService = inject(AuthenticationService);

  @ViewChild("textarea")
  textarea?: ElementRef<HTMLTextAreaElement | null>;

  ngAfterViewInit(): void {
    setTimeout(() => this.authenticationService.checkLogin());
    this.textarea?.nativeElement?.focus();
    this.resizeTextarea();
    addEventListener("resize", this.resizeTextarea);
    if (virtualKeyboard) {
      virtualKeyboard.overlaysContent = true;
      virtualKeyboard.addEventListener("geometrychange", this.resizeTextarea);
    }
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

  resizeTextarea = async () => {
    const { nativeElement } = this.textarea || {};
    if (!nativeElement) return;
    nativeElement.style.height = "auto";
    const { scrollHeight } = nativeElement;
    const minHeight = 18 * 6;
    const maxHeight =
      innerHeight - 48 - virtualKeyboard?.boundingRect.height || 0;
    const newHeight = Math.max(
      minHeight,
      Math.min(scrollHeight + 4, maxHeight),
    );
    nativeElement.style.height = newHeight + "px";
  };
}
