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

export type AuthorizationView = "login" | "register" | "forgot";

@Component({
  selector: "app-authorization",
  imports: [LoginComponent, RegisterComponent],
  templateUrl: "./authorization.component.html",
  styleUrl: "./authorization.component.scss",
})
export class AuthorizationComponent implements OnInit, OnDestroy {
  @HostBinding("class.removed")
  removed = false;
  @HostBinding("class")
  view: AuthorizationView = "login";

  themeService = inject(ThemeService);
  themeSymbol?: symbol;

  ngOnInit() {
    addEventListener("popstate", this.remove);
    addEventListener("keydown", this.onKeydown);
    this.themeSymbol = this.themeService.registerBarColor("#777");
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
