import { EventEmitter, inject, Injectable } from "@angular/core";
import { AccountService } from "../account/account.service";
import { jwtDecode } from "jwt-decode";

@Injectable({
  providedIn: "root",
})
export class AuthenticationService {
  accountService = inject(AccountService);
  loggedInEvent = new EventEmitter<boolean | null>();

  getUsername() {
    const jwt = this.accountService.jwt();
    if (!jwt) return "";
    const { sub } = jwtDecode(jwt);
    return sub || "";
  }

  checkLogin() {
    const jwt = this.accountService.jwt();
    if (!jwt) return this.loggedInEvent.emit(false);
    const claims = jwtDecode(jwt);
    const valid = !claims.exp || claims.exp * 1000 > Date.now();
    if (!valid) this.accountService.logout();
    this.loggedInEvent.emit(valid);
  }

  hideLogin() {
    this.loggedInEvent.emit(null);
  }
}
