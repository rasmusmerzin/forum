import { EventEmitter, inject, Injectable } from "@angular/core";
import { AccountService } from "../account/account.service";

@Injectable({
  providedIn: "root",
})
export class AuthenticationService {
  accountService = inject(AccountService);
  loggedInEvent = new EventEmitter<boolean | null>();

  checkLogin() {
    this.loggedInEvent.emit(!!this.accountService.jwt());
  }

  hideLogin() {
    this.loggedInEvent.emit(null);
  }
}
