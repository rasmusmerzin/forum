import { Component, inject, OnDestroy, OnInit } from "@angular/core";
import { ThemeService } from "../../theme/theme.service";
import { AuthenticationService } from "../../authentication/authentication.service";

@Component({
  selector: "app-home-header",
  imports: [],
  templateUrl: "./header.component.html",
  styleUrl: "./header.component.scss",
})
export class HeaderComponent implements OnInit, OnDestroy {
  authenticationService = inject(AuthenticationService);
  themeService = inject(ThemeService);
  themeSymbol?: symbol;
  loggedIn = false;

  ngOnInit() {
    this.themeSymbol = this.themeService.registerBarColor(
      this.themeService.getPrimaryColor(),
    );
    this.loggedIn = this.authenticationService.isLoggedIn();
  }

  ngOnDestroy() {
    this.themeService.unregisterBarColor(this.themeSymbol!);
  }
}
