import { Component, inject, Input, OnDestroy, OnInit } from "@angular/core";
import { ThemeService } from "../../theme/theme.service";
import { THEME_COLOR } from "../../app.properties";

@Component({
  selector: "app-me-header",
  imports: [],
  templateUrl: "./header.component.html",
  styleUrl: "./header.component.scss",
})
export class HeaderComponent implements OnInit, OnDestroy {
  @Input()
  username = "user";
  @Input()
  fullname = "";
  @Input()
  bio = "";

  themeService = inject(ThemeService);
  themeSymbol?: symbol;

  ngOnInit() {
    this.themeSymbol = this.themeService.registerBarColor(THEME_COLOR);
  }

  ngOnDestroy() {
    this.themeService.unregisterBarColor(this.themeSymbol!);
  }
}
