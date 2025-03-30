import { Component, inject, OnDestroy, OnInit } from "@angular/core";
import { RouterOutlet } from "@angular/router";
import { Subscription } from "rxjs";
import { AuthenticationComponent } from "./authentication/authentication.component";
import { AuthenticationService } from "./authentication/authentication.service";
import { HintComponent } from "./hint/hint.component";

@Component({
  selector: "app-root",
  imports: [RouterOutlet, AuthenticationComponent, HintComponent],
  templateUrl: "./app.component.html",
  styleUrl: "./app.component.scss",
})
export class AppComponent implements OnInit, OnDestroy {
  authenticationService = inject(AuthenticationService);
  showAuthentication = false;
  subscription = new Subscription();

  ngOnInit() {
    this.subscription.add(
      this.authenticationService.loggedInEvent.subscribe(
        this.onLoggedInEvent.bind(this),
      ),
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  onLoggedInEvent(loggedIn: boolean | null) {
    const showLogin = loggedIn === false;
    if (this.showAuthentication && !showLogin)
      setTimeout(() => (this.showAuthentication = false), 300);
    else this.showAuthentication = showLogin;
  }
}
