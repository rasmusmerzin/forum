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
import { AuthorizationService } from "../authorization.service";

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
  authorizationService = inject(AuthorizationService);

  username = "";
  password = "";
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
      await this.accountService.login(this.username, this.password);
    } catch (error: any) {
      this.error = error.message || "Unknown error";
    } finally {
      this.loading = false;
      this.authorizationService.checkLogin();
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
