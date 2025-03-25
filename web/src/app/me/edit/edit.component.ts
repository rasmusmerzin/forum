import { Component, inject, OnInit } from "@angular/core";
import { HeaderComponent } from "./header/header.component";
import { AccountService } from "../../account/account.service";
import { AuthenticationService } from "../../authentication/authentication.service";
import { FormsModule } from "@angular/forms";
import { SpinnerComponent } from "../../spinner/spinner.component";
import { AccountUpdate } from "../../account/account";

@Component({
  selector: "app-edit",
  imports: [FormsModule, HeaderComponent, SpinnerComponent],
  templateUrl: "./edit.component.html",
  styleUrl: "./edit.component.scss",
})
export class EditComponent implements OnInit {
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
      history.back();
    } catch (error: any) {
      console.error(error);
    } finally {
      this.saveLoading = false;
    }
  }
}
