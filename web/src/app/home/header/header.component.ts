import { Component, inject, OnDestroy, OnInit } from "@angular/core";
import { ThemeService } from "../../theme/theme.service";
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
    this.themeSymbol = this.themeService.registerBarColor(
      this.themeService.getPrimaryColor(),
    );
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
