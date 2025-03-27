import { EventEmitter, Injectable } from "@angular/core";
import { jwtDecode } from "jwt-decode";

@Injectable({
  providedIn: "root",
})
export class AuthenticationService {
  jwt = "";
  loggedInEvent = new EventEmitter<boolean | null>();

  constructor() {
    const jwt = sessionStorage.getItem("jwt") || localStorage.getItem("jwt");
    if (jwt) this.jwt = jwt;
  }

  isLoggedIn() {
    return !!this.jwt;
  }

  setJwt(jwt: string, rememberMe = false) {
    this.jwt = jwt;
    if (rememberMe) localStorage.setItem("jwt", jwt);
    else sessionStorage.setItem("jwt", jwt);
  }

  getUsername() {
    if (!this.jwt) return "";
    const { sub } = jwtDecode(this.jwt);
    return sub || "";
  }

  headers(init: Record<string, string> = {}): Record<string, string> {
    const headers: Record<string, string> = { ...init };
    if (this.jwt) headers["Authorization"] = `Bearer ${this.jwt}`;
    return headers;
  }

  logout(): void {
    this.jwt = "";
    sessionStorage.removeItem("jwt");
    localStorage.removeItem("jwt");
  }

  checkLogin() {
    if (!this.jwt) return this.loggedInEvent.emit(false);
    const claims = jwtDecode(this.jwt);
    const valid = !claims.exp || claims.exp * 1000 > Date.now();
    if (!valid) this.logout();
    this.loggedInEvent.emit(valid);
  }

  hideLogin() {
    this.loggedInEvent.emit(null);
  }
}
