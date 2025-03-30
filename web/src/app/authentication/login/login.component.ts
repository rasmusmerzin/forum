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
import { BlankService } from "../../blank/blank.service";
import { HintService } from "../../hint/hint.service";

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
  blankService = inject(BlankService);
  hintService = inject(HintService);

  username = "";
  password = "";
  rememberMe = false;
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

  async login() {
    if (!this.validate()) return;
    try {
      this.loading = true;
      await this.accountService.login(
        this.username,
        this.password,
        this.rememberMe,
      );
      await this.blankService.refresh();
      this.hintService.showHint("Logged in", 3000);
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
