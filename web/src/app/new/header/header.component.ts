import { Component, EventEmitter, Output } from "@angular/core";

@Component({
  selector: "app-new-header",
  imports: [],
  templateUrl: "./header.component.html",
  styleUrl: "./header.component.scss",
})
export class HeaderComponent {
  @Output()
  postClickEvent = new EventEmitter();

  preview = false;

  onBackClick() {
    history.back();
  }

  onPostClick() {
    this.postClickEvent.emit();
  }

  onPreviewClick() {
    this.preview = !this.preview;
  }
}
