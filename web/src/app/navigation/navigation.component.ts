import { Component, HostBinding, inject, OnInit } from "@angular/core";
import { RouterLink, RouterModule } from "@angular/router";
import { ThemeService } from "../theme/theme.service";

@Component({
  selector: "app-navigation",
  imports: [RouterLink, RouterModule],
  templateUrl: "./navigation.component.html",
  styleUrl: "./navigation.component.scss",
})
export class NavigationComponent implements OnInit {
  themeService = inject(ThemeService);

  @HostBinding("class.light-primary")
  lightPrimary = false;

  ngOnInit() {
    this.lightPrimary =
      this.themeService.getPrimaryForegroundColor() === "#000";
  }
}
