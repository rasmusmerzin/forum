import { AfterContentInit, Component, inject, OnDestroy } from "@angular/core";
import { NavigationComponent } from "../navigation/navigation.component";
import { HeaderComponent } from "./header/header.component";
import { AuthenticationService } from "../authentication/authentication.service";

@Component({
  selector: "app-me",
  imports: [NavigationComponent, HeaderComponent],
  templateUrl: "./me.component.html",
  styleUrl: "./me.component.scss",
})
export class MeComponent implements AfterContentInit, OnDestroy {
  authenticationService = inject(AuthenticationService);

  ngAfterContentInit(): void {
    setTimeout(() => this.authenticationService.checkLogin());
  }

  ngOnDestroy(): void {
    this.authenticationService.hideLogin();
  }
}
