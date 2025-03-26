import {
  Component,
  EventEmitter,
  HostListener,
  inject,
  Output,
} from "@angular/core";
import { FormsModule } from "@angular/forms";
import { AccountService } from "../../account/account.service";
import { SpinnerComponent } from "../../spinner/spinner.component";

@Component({
  selector: "app-register",
  imports: [FormsModule, SpinnerComponent],
  templateUrl: "./register.component.html",
  styleUrl: "./register.component.scss",
})
export class RegisterComponent {
  @Output()
  loginClickEvent = new EventEmitter<void>();

  accountService = inject(AccountService);

  username = "";
  password = "";
  password2 = "";
  loading = false;
  error = "";

  @HostListener("click", ["$event"])
  onHostClick(event: MouseEvent) {
    event.stopPropagation();
  }

  onUsernameInput() {
    setTimeout(
      () =>
        (this.username = this.username
          .split("")
          .filter((c) => /[A-Za-z0-9_]/.test(c))
          .join("")
          .toLowerCase()),
    );
  }

  close() {
    history.back();
  }

  async register() {
    if (!this.validate()) return;
    try {
      this.loading = true;
      await this.accountService.register(this.username, this.password);
      // TODO: toast
      this.loginClickEvent.emit();
    } catch (error: any) {
      this.error = error.message || "Unknown error";
    } finally {
      this.loading = false;
    }
  }

  validate() {
    this.error = "";
    if (!this.username) {
      this.error = "Username is required";
      return false;
    }
    if (!this.password) {
      this.error = "Password is required";
      return false;
    }
    if (this.password !== this.password2) {
      this.error = "Passwords do not match";
      return false;
    }
    return true;
  }

  unimplemented() {
    alert("Unimplemented");
  }
}
