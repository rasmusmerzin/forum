import { EventEmitter, Injectable, signal } from "@angular/core";
import { jwtDecode } from "jwt-decode";

@Injectable({
  providedIn: "root",
})
export class AuthenticationService {
  jwt = signal<string>("");
  loggedInEvent = new EventEmitter<boolean | null>();

  constructor() {
    const jwt = sessionStorage.getItem("jwt") || localStorage.getItem("jwt");
    if (jwt) this.jwt.set(jwt);
  }

  setJwt(jwt: string, rememberMe = false) {
    this.jwt.set(jwt);
    if (rememberMe) localStorage.setItem("jwt", jwt);
    else sessionStorage.setItem("jwt", jwt);
  }

  getUsername() {
    const jwt = this.jwt();
    if (!jwt) return "";
    const { sub } = jwtDecode(jwt);
    return sub || "";
  }

  headers(init: Record<string, string> = {}): Record<string, string> {
    const jwt = this.jwt();
    const headers: Record<string, string> = { ...init };
    if (jwt) headers["Authorization"] = `Bearer ${jwt}`;
    return headers;
  }

  logout(): void {
    this.jwt.set("");
    localStorage.removeItem("jwt");
  }

  checkLogin() {
    const jwt = this.jwt();
    if (!jwt) return this.loggedInEvent.emit(false);
    const claims = jwtDecode(jwt);
    const valid = !claims.exp || claims.exp * 1000 > Date.now();
    if (!valid) this.logout();
    this.loggedInEvent.emit(valid);
  }

  hideLogin() {
    this.loggedInEvent.emit(null);
  }
}
