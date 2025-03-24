import { Component, inject, OnDestroy, OnInit } from "@angular/core";
import { RouterOutlet } from "@angular/router";
import { Subscription } from "rxjs";
import { AuthorizationComponent } from "./authorization/authorization.component";
import { AuthorizationService } from "./authorization/authorization.service";

@Component({
  selector: "app-root",
  imports: [RouterOutlet, AuthorizationComponent],
  templateUrl: "./app.component.html",
  styleUrl: "./app.component.scss",
})
export class AppComponent implements OnInit, OnDestroy {
  authorizationService = inject(AuthorizationService);
  showAuthorization = false;
  subscription = new Subscription();

  ngOnInit() {
    this.subscription.add(
      this.authorizationService.loggedInEvent.subscribe(
        this.onLoggedInEvent.bind(this),
      ),
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  onLoggedInEvent(loggedIn: boolean | null) {
    const showLogin = loggedIn === false;
    if (this.showAuthorization && !showLogin)
      setTimeout(() => (this.showAuthorization = false), 300);
    else this.showAuthorization = showLogin;
  }
}
