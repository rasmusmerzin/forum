import { Component, EventEmitter, Input, model, Output } from "@angular/core";
import { SpinnerComponent } from "../../../spinner/spinner.component";

@Component({
  selector: "app-post-comment-header",
  imports: [SpinnerComponent],
  templateUrl: "./header.component.html",
  styleUrl: "./header.component.scss",
})
export class HeaderComponent {
  @Input()
  loading = false;
  @Output()
  commentClickEvent = new EventEmitter();
  @Output()
  previewClickEvent = new EventEmitter();

  preview = model(false);

  onBackClick() {
    history.back();
  }
}
