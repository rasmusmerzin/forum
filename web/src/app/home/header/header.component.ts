import { Component, inject, OnDestroy, OnInit } from "@angular/core";
import { ThemeService } from "../../theme/theme.service";
import { THEME_COLOR } from "../../app.properties";
import { HomeView, homeView } from "../home.state";
import { AccountService } from "../../account/account.service";

@Component({
  selector: "app-home-header",
  imports: [],
  templateUrl: "./header.component.html",
  styleUrl: "./header.component.scss",
})
export class HeaderComponent implements OnInit, OnDestroy {
  selectedView: HomeView = "popular";
  accountService = inject(AccountService);
  themeService = inject(ThemeService);
  themeSymbol?: symbol;
  loggedIn = false;

  ngOnInit() {
    this.themeSymbol = this.themeService.registerBarColor(THEME_COLOR);
    this.selectedView = homeView();
    this.loggedIn = !!this.accountService.jwt();
  }

  ngOnDestroy() {
    this.themeService.unregisterBarColor(this.themeSymbol!);
  }

  onViewClick(view: HomeView) {
    homeView.set((this.selectedView = view));
  }
}
