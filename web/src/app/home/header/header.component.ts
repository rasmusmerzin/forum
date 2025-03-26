import {
  Component,
  HostBinding,
  inject,
  OnDestroy,
  OnInit,
} from "@angular/core";
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

  height = 48;
  @HostBinding("style.top")
  top = `-${this.height}px`;
  @HostBinding("style.box-shadow")
  shadow = "";
  scrollY = scrollY;
  control = new AbortController();

  ngOnInit() {
    this.activateBar();
    this.loggedIn = this.authenticationService.isLoggedIn();
    addEventListener("scroll", this.onScroll.bind(this), {
      passive: true,
      signal: this.control.signal,
    });
  }

  ngOnDestroy() {
    this.deactivateBar();
    this.control.abort();
  }

  onScroll() {
    if (Math.abs(scrollY - this.scrollY) < 4) return;
    if (scrollY < this.scrollY) {
      this.top = "0";
      this.shadow = "";
      this.activateBar();
    } else if (scrollY > this.scrollY) {
      this.top = `-${this.height}px`;
      if (this.scrollY > this.height) {
        this.shadow = "none";
        this.deactivateBar();
      }
    }
    this.scrollY = scrollY;
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
