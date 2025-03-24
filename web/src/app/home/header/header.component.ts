import { Component, inject, OnDestroy, OnInit } from "@angular/core";
import { ThemeService } from "../../theme/theme.service";
import { THEME_COLOR } from "../../app.properties";
import { RouterLink, RouterModule } from "@angular/router";

@Component({
  selector: "app-home-header",
  imports: [RouterLink, RouterModule],
  templateUrl: "./header.component.html",
  styleUrl: "./header.component.scss",
})
export class HeaderComponent implements OnInit, OnDestroy {
  private themeService = inject(ThemeService);
  private themeSymbol?: symbol;

  ngOnInit() {
    this.themeSymbol = this.themeService.registerBarColor(THEME_COLOR);
  }

  ngOnDestroy() {
    this.themeService.unregisterBarColor(this.themeSymbol!);
  }
}
