import { Component, EventEmitter, HostListener, Output } from "@angular/core";
import { FormsModule } from "@angular/forms";

@Component({
  selector: "app-register",
  imports: [FormsModule],
  templateUrl: "./register.component.html",
  styleUrl: "./register.component.scss",
})
export class RegisterComponent {
  @Output()
  loginClickEvent = new EventEmitter<void>();

  username = "";
  password = "";
  password2 = "";

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
