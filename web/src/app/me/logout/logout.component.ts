import {
  Component,
  HostBinding,
  HostListener,
  inject,
  OnDestroy,
  OnInit,
} from "@angular/core";
import { Router } from "@angular/router";
import { AccountService } from "../../account/account.service";
import { ThemeService } from "../../theme/theme.service";

@Component({
  selector: "app-logout",
  imports: [],
  templateUrl: "./logout.component.html",
  styleUrl: "./logout.component.scss",
})
export class LogoutComponent implements OnInit, OnDestroy {
  accountService = inject(AccountService);
  router = inject(Router);

  @HostBinding("class.removed")
  removed = false;

  themeService = inject(ThemeService);
  themeSymbol?: symbol;

  @HostListener("click")
  cancel() {
    if (this.removed) return;
    this.removed = true;
    setTimeout(() => history.back(), 300);
  }

  ngOnInit() {
    addEventListener("keydown", this.onKeydown);
    this.themeSymbol = this.themeService.registerBarColor("#666");
  }

  ngOnDestroy() {
    removeEventListener("keydown", this.onKeydown);
    this.themeService.unregisterBarColor(this.themeSymbol!);
  }

  logout() {
    this.accountService.logout();
    this.router.navigate(["/home"]);
  }

  onKeydown = (event: KeyboardEvent) => event.key === "Escape" && this.cancel();
}
