import { AfterContentInit, Component, inject, OnDestroy } from "@angular/core";
import { NavigationComponent } from "../navigation/navigation.component";
import { HeaderComponent } from "./header/header.component";
import { AuthorizationService } from "../authorization/authorization.service";

@Component({
  selector: "app-me",
  imports: [NavigationComponent, HeaderComponent],
  templateUrl: "./me.component.html",
  styleUrl: "./me.component.scss",
})
export class MeComponent implements AfterContentInit, OnDestroy {
  authorizationService = inject(AuthorizationService);

  ngAfterContentInit(): void {
    this.authorizationService.checkLogin();
  }

  ngOnDestroy(): void {
    this.authorizationService.hideLogin();
  }
}
