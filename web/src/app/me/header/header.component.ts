import { Component, inject, OnDestroy, OnInit } from "@angular/core";
import { ThemeService } from "../../theme/theme.service";
import { THEME_COLOR } from "../../app.properties";
import { AccountService } from "../../account/account.service";
import { Router } from "@angular/router";
import { SpinnerComponent } from "../../spinner/spinner.component";
import { AuthenticationService } from "../../authentication/authentication.service";

@Component({
  selector: "app-me-header",
  imports: [SpinnerComponent],
  templateUrl: "./header.component.html",
  styleUrl: "./header.component.scss",
})
export class HeaderComponent implements OnInit, OnDestroy {
  username = "";
  fullname = "";
  bio = "";

  router = inject(Router);
  authenticationService = inject(AuthenticationService);
  accountService = inject(AccountService);
  themeService = inject(ThemeService);
  themeSymbol?: symbol;
  loading = false;

  async ngOnInit() {
    this.themeSymbol = this.themeService.registerBarColor(THEME_COLOR);
    this.username = this.authenticationService.getUsername();
    if (!this.username) return;
    try {
      this.loading = true;
      const account = await this.accountService.fetchAccount(this.username);
      this.fullname = `${account.firstName} ${account.lastName}`;
      this.bio = account.bio;
    } catch (error: any) {
      console.error(error);
    } finally {
      this.loading = false;
    }
  }

  ngOnDestroy() {
    this.themeService.unregisterBarColor(this.themeSymbol!);
  }

  logout() {
    this.accountService.logout();
    // TODO: toast
    this.router.navigate(["/home"]);
  }
}
