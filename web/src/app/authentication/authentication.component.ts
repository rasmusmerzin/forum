import {
  Component,
  HostBinding,
  HostListener,
  inject,
  OnDestroy,
  OnInit,
} from "@angular/core";
import { LoginComponent } from "./login/login.component";
import { RegisterComponent } from "./register/register.component";
import { ThemeService } from "../theme/theme.service";

export type AuthenticationView = "login" | "register" | "forgot";

@Component({
  selector: "app-authentication",
  imports: [LoginComponent, RegisterComponent],
  templateUrl: "./authentication.component.html",
  styleUrl: "./authentication.component.scss",
})
export class AuthenticationComponent implements OnInit, OnDestroy {
  @HostBinding("class.removed")
  removed = false;
  @HostBinding("class")
  view: AuthenticationView = "login";

  themeService = inject(ThemeService);
  themeSymbol?: symbol;

  ngOnInit() {
    addEventListener("popstate", this.remove);
    addEventListener("keydown", this.onKeydown);
    this.themeSymbol = this.themeService.registerBarColor("#e4eaed");
  }

  ngOnDestroy() {
    removeEventListener("popstate", this.remove);
    removeEventListener("keydown", this.onKeydown);
    this.themeService.unregisterBarColor(this.themeSymbol!);
  }

  @HostListener("click")
  onHostClick() {
    history.back();
  }

  remove = () => (this.removed = true);

  onKeydown = (event: KeyboardEvent) =>
    event.key === "Escape" && history.back();
}
