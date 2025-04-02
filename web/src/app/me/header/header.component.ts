import { Component, inject, OnDestroy, OnInit } from "@angular/core";
import { ThemeService } from "../../theme/theme.service";
import { AccountService } from "../../account/account.service";
import { Router, RouterLink } from "@angular/router";
import { SpinnerComponent } from "../../spinner/spinner.component";
import { AuthenticationService } from "../../authentication/authentication.service";
import { Account } from "../../account/account";
import { HintService } from "../../hint/hint.service";

@Component({
  selector: "app-me-header",
  imports: [RouterLink, SpinnerComponent],
  templateUrl: "./header.component.html",
  styleUrl: "./header.component.scss",
})
export class HeaderComponent implements OnInit, OnDestroy {
  router = inject(Router);
  authenticationService = inject(AuthenticationService);
  accountService = inject(AccountService);
  themeService = inject(ThemeService);
  hintService = inject(HintService);

  themeSymbol?: symbol;
  loading = false;
  control = new AbortController();
  colorHeight = 120;
  username = "";
  account?: Account;

  get fullName(): string {
    return `${this.account?.firstName || ""} ${this.account?.lastName || ""}`;
  }
  get bio(): string {
    return this.account?.bio || "";
  }
  get email(): string {
    return this.account?.email || "";
  }
  get emailVerified(): boolean {
    return this.account?.emailVerified || false;
  }

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

  logout() {
    if (!confirm("Are you sure you want to log out?")) return;
    this.authenticationService.logout();
    this.router.navigate(["/home"], { replaceUrl: true });
    setTimeout(() => this.hintService.showHint("Logged out", 3000));
  }

  async loadProfile() {
    this.username = this.authenticationService.getUsername();
    if (!this.username) return;
    try {
      this.loading = true;
      this.account = await this.accountService.fetchAccount(this.username);
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

  unimplemented() {
    alert("Unimplemented");
  }
}
