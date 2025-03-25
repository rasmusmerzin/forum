import { Component, EventEmitter, Input, Output } from "@angular/core";
import { SpinnerComponent } from "../../../spinner/spinner.component";

@Component({
  selector: "app-edit-header",
  imports: [SpinnerComponent],
  templateUrl: "./header.component.html",
  styleUrl: "./header.component.scss",
})
export class HeaderComponent {
  @Input()
  saveLoading = false;
  @Output()
  saveClickEvent = new EventEmitter<void>();

  onBackClick() {
    history.back();
  }
}
