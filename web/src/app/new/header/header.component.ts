import { Component, EventEmitter, Input, Output } from "@angular/core";
import { SpinnerComponent } from "../../spinner/spinner.component";

@Component({
  selector: "app-new-header",
  imports: [SpinnerComponent],
  templateUrl: "./header.component.html",
  styleUrl: "./header.component.scss",
})
export class HeaderComponent {
  @Input()
  loading = false;
  @Input()
  preview = false;
  @Output()
  postClickEvent = new EventEmitter();
  @Output()
  previewClickEvent = new EventEmitter();

  onBackClick() {
    history.back();
  }
}
