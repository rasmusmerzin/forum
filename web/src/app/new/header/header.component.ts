import { Component, EventEmitter, model, Output } from "@angular/core";

@Component({
  selector: "app-new-header",
  imports: [],
  templateUrl: "./header.component.html",
  styleUrl: "./header.component.scss",
})
export class HeaderComponent {
  @Output()
  postClickEvent = new EventEmitter();
  @Output()
  previewClickEvent = new EventEmitter();

  preview = model(false);

  onBackClick() {
    history.back();
  }
}
