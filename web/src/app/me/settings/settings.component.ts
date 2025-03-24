import { Component, inject, OnInit } from "@angular/core";
import { HeaderComponent } from "./header/header.component";
import { AccountService } from "../../account/account.service";
import { AuthenticationService } from "../../authentication/authentication.service";
import { FormsModule } from "@angular/forms";
import { SpinnerComponent } from "../../spinner/spinner.component";
import { Router } from "@angular/router";
import { AccountUpdate } from "../../account/account";

@Component({
  selector: "app-settings",
  imports: [FormsModule, HeaderComponent, SpinnerComponent],
  templateUrl: "./settings.component.html",
  styleUrl: "./settings.component.scss",
})
export class SettingsComponent implements OnInit {
  router = inject(Router);
  accountService = inject(AccountService);
  authenticationService = inject(AuthenticationService);

  username = "";
  firstName = "";
  lastName = "";
  bio = "";
  email = "";
  loading = false;
  saveLoading = false;

  async ngOnInit() {
    this.username = this.authenticationService.getUsername();
    if (!this.username) return history.back();
    try {
      this.loading = true;
      const account = await this.accountService.fetchAccount(this.username);
      this.firstName = account.firstName;
      this.lastName = account.lastName;
      this.bio = account.bio;
      this.email = account.email;
    } catch (error: any) {
      console.error(error);
    } finally {
      this.loading = false;
    }
  }

  async save() {
    if (this.loading) return;
    try {
      this.saveLoading = true;
      const update: AccountUpdate = {
        firstName: this.firstName,
        lastName: this.lastName,
        bio: this.bio,
        email: this.email,
      };
      await this.accountService.update(update);
      this.router.navigate(["/me"]);
    } catch (error: any) {
      console.error(error);
    } finally {
      this.saveLoading = false;
    }
  }
}
