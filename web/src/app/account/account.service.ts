import { Injectable, inject } from "@angular/core";
import { API_URL } from "../app.properties";
import { Account, AccountUpdate } from "./account";
import { AuthenticationService } from "../authentication/authentication.service";

@Injectable({
  providedIn: "root",
})
export class AccountService {
  private url = new URL("/account/", API_URL);
  private authenticationService = inject(AuthenticationService);

  async update(update: AccountUpdate): Promise<void> {
    const url = new URL("/account", this.url);
    const response = await fetch(url, {
      method: "PATCH",
      headers: this.authenticationService.headers({
        "Content-Type": "application/json",
      }),
      body: JSON.stringify(update),
    });
    if (!response.ok)
      throw new Error((await response.text()) || "Update failed");
  }

  async register(username: string, password: string): Promise<void> {
    const url = new URL("register", this.url);
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });
    if (!response.ok)
      throw new Error((await response.text()) || "Registration failed");
  }

  async login(
    username: string,
    password: string,
    rememberMe = false,
  ): Promise<string> {
    const url = new URL("login", this.url);
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password, rememberMe }),
    });
    if (!response.ok)
      throw new Error((await response.text()) || "Login failed");
    const jwt = await response.text();
    this.authenticationService.setJwt(jwt, rememberMe);
    return jwt;
  }

  async fetchAccount(username = ""): Promise<Account> {
    const url = new URL(username || "/account", this.url);
    const response = await fetch(url, {
      headers: this.authenticationService.headers(),
    });
    if (!response.ok) throw new Error(await response.text());
    return response.json();
  }
}
