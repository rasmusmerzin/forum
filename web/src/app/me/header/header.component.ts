import { Component, inject, OnDestroy, OnInit } from "@angular/core";
import { ThemeService } from "../../theme/theme.service";
import { AccountService } from "../../account/account.service";
import { RouterLink } from "@angular/router";
import { SpinnerComponent } from "../../spinner/spinner.component";
import { AuthenticationService } from "../../authentication/authentication.service";

@Component({
  selector: "app-me-header",
  imports: [RouterLink, SpinnerComponent],
  templateUrl: "./header.component.html",
  styleUrl: "./header.component.scss",
})
export class HeaderComponent implements OnInit, OnDestroy {
  username = "";
  fullname = "";
  bio = "";

  authenticationService = inject(AuthenticationService);
  accountService = inject(AccountService);
  themeService = inject(ThemeService);
  themeSymbol?: symbol;
  loading = false;
  control = new AbortController();
  colorHeight = 120;

  ngOnInit() {
    this.activateBar();
    this.loadProfile();
    addEventListener("scroll", this.onScroll.bind(this), {
      passive: true,
      signal: this.control.signal,
    });
  }

  ngOnDestroy() {
    this.deactivateBar();
    this.control.abort();
  }

  async loadProfile() {
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

  onScroll() {
    if (scrollY < this.colorHeight) this.activateBar();
    else this.deactivateBar();
  }

  activateBar() {
    if (this.themeSymbol) return;
    this.themeSymbol = this.themeService.registerBarColor(
      this.themeService.getPrimaryColor(),
    );
  }

  deactivateBar() {
    if (!this.themeSymbol) return;
    this.themeService.unregisterBarColor(this.themeSymbol!);
    this.themeSymbol = undefined;
  }
}
