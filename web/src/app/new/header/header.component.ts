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

  onBackClick() {
    history.back();
  }

  onPostClick() {
    this.postClickEvent.emit();
  }
}
