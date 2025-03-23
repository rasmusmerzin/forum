import { Injectable, signal } from "@angular/core";
import { API_URL } from "../app.properties";
import { Account } from "./account";

@Injectable({
  providedIn: "root",
})
export class AccountService {
  url = new URL("/account", API_URL);
  jwt = signal<string>("");

  constructor() {
    const jwt = localStorage.getItem("jwt");
    if (jwt) this.jwt.set(jwt);
  }

  async register(username: string, password: string): Promise<void> {
    const url = new URL("/register", this.url);
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });
    if (!response.ok) throw new Error(await response.text());
  }

  async login(username: string, password: string): Promise<string> {
    const url = new URL("/login", this.url);
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });
    if (!response.ok) throw new Error(await response.text());
    const jwt = await response.text();
    this.jwt.set(jwt);
    localStorage.setItem("jwt", jwt);
    return jwt;
  }

  async fetchAccount(username = ""): Promise<Account> {
    const url = new URL(`/${username}`, this.url);
    const response = await fetch(url, { headers: this.headers() });
    if (!response.ok) throw new Error(await response.text());
    return response.json();
  }

  logout(): void {
    this.jwt.set("");
    localStorage.removeItem("jwt");
  }

  headers(init: Record<string, string> = {}): Record<string, string> {
    const jwt = this.jwt();
    const headers: Record<string, string> = { ...init };
    if (jwt) headers["Authorization"] = `Bearer ${jwt}`;
    return headers;
  }
}
