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
import { HintService } from "../../hint/hint.service";
import { sanitizeUsername } from "../../username";

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
  hintService = inject(HintService);

  username = "";
  password = "";
  password2 = "";
  loading = false;
  error = "";
  passwordVisible = false;
  password2Visible = false;

  @HostListener("click", ["$event"])
  onHostClick(event: MouseEvent) {
    event.stopPropagation();
  }

  onUsernameInput() {
    setTimeout(() => (this.username = sanitizeUsername(this.username)));
  }

  close() {
    history.back();
  }

  async register() {
    if (!this.validate()) return;
    try {
      this.loading = true;
      const account = await this.accountService
        .fetchAccount(this.username)
        .catch(() => null);
      if (account) this.error = "Username already exists";
      else {
        await this.accountService.register(this.username, this.password);
        this.loginClickEvent.emit();
        this.hintService.showHint("Account created successfully", 4000);
      }
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
    if (this.password.length < 8) {
      this.error = "Password must be at least 8 characters";
      return false;
    }
    return true;
  }
}
