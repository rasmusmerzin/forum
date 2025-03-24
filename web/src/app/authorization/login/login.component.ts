import { Component, EventEmitter, HostListener, Output } from "@angular/core";
import { FormsModule } from "@angular/forms";

@Component({
  selector: "app-login",
  imports: [FormsModule],
  templateUrl: "./login.component.html",
  styleUrl: "./login.component.scss",
})
export class LoginComponent {
  @Output()
  signUpClickEvent = new EventEmitter<void>();

  username = "";
  password = "";

  @HostListener("click", ["$event"])
  onHostClick(event: MouseEvent) {
    event.stopPropagation();
  }

  close() {
    history.back();
  }

  unimplemented() {
    alert("Unimplemented");
  }
}
