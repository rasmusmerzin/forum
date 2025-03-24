import {
  Component,
  EventEmitter,
  HostListener,
  inject,
  Output,
} from "@angular/core";
import { FormsModule } from "@angular/forms";
import { SpinnerComponent } from "../../spinner/spinner.component";
import { AccountService } from "../../account/account.service";
import { AuthenticationService } from "../authentication.service";

@Component({
  selector: "app-login",
  imports: [FormsModule, SpinnerComponent],
  templateUrl: "./login.component.html",
  styleUrl: "./login.component.scss",
})
export class LoginComponent {
  @Output()
  signUpClickEvent = new EventEmitter<void>();

  accountService = inject(AccountService);
  authenticationService = inject(AuthenticationService);

  username = "";
  password = "";
  rememberMe = false;
  loading = false;
  error = "";

  @HostListener("click", ["$event"])
  onHostClick(event: MouseEvent) {
    event.stopPropagation();
  }

  close() {
    history.back();
  }

  async login() {
    if (!this.validate()) return;
    try {
      this.loading = true;
      await this.accountService.login(
        this.username,
        this.password,
        this.rememberMe,
      );
      location.reload();
    } catch (error: any) {
      this.error = error.message || "Unknown error";
    } finally {
      this.loading = false;
      this.authenticationService.checkLogin();
    }
  }

  validate(): boolean {
    this.error = "";
    if (!this.username) {
      this.error = "Username is required";
      return false;
    }
    if (!this.password) {
      this.error = "Password is required";
      return false;
    }
    return true;
  }

  unimplemented() {
    alert("Unimplemented");
  }
}
