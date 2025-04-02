import { inject, Injectable } from "@angular/core";
import { API_URL } from "../app.properties";
import { AuthenticationService } from "../authentication/authentication.service";
import {
  BehaviorSubject,
  combineLatest,
  distinctUntilChanged,
  interval,
  map,
} from "rxjs";

@Injectable({
  providedIn: "root",
})
export class EmailService {
  private url = new URL("/email/", API_URL);
  private emailCooldown = 30 * 1000;
  private authenticationService = inject(AuthenticationService);

  lastVerificationEmailSent$ = new BehaviorSubject<number>(0);
  verificationEmailCooldown$ = combineLatest([
    this.lastVerificationEmailSent$,
    interval(100),
  ]).pipe(
    map(([lastSent]) =>
      Math.max(0, lastSent + this.emailCooldown - Date.now()),
    ),
    distinctUntilChanged(),
  );

  async requestVerificationEmail(): Promise<void> {
    const url = new URL("verify", this.url);
    const headers = this.authenticationService.headers();
    const response = await fetch(url, { headers });
    if (!response.ok)
      throw new Error(
        (await response.text()) || "Failed to request verification email",
      );
    this.lastVerificationEmailSent$.next(Date.now());
  }

  async verifyEmail(id: string): Promise<void> {
    const url = new URL(`verify/${id}`, this.url);
    const response = await fetch(url, { method: "POST" });
    if (!response.ok)
      throw new Error(
        (await response.text()) || "Failed to verify email address",
      );
  }
}
