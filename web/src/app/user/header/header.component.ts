import {
  Component,
  HostBinding,
  inject,
  OnDestroy,
  OnInit,
} from "@angular/core";
import { ThemeService } from "../../theme/theme.service";

@Component({
  selector: "app-user-header",
  imports: [],
  templateUrl: "./header.component.html",
  styleUrl: "./header.component.scss",
})
export class HeaderComponent implements OnInit, OnDestroy {
  themeService = inject(ThemeService);
  themeSymbol?: symbol;

  height = 48;
  colorHeight = 120;
  @HostBinding("style.top")
  top = `-${this.height}px`;
  scrollY = scrollY;
  control = new AbortController();

  onBackClick() {
    history.back();
  }

  ngOnInit() {
    this.activateBar();
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
      this.activateBar();
    } else if (scrollY > this.scrollY) {
      this.top = `-${this.height}px`;
      if (this.scrollY > this.colorHeight) this.deactivateBar();
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
