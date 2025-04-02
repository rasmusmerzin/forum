import { Component, inject, OnDestroy, OnInit } from "@angular/core";
import { HeaderComponent } from "./header/header.component";
import { AuthenticationService } from "../../authentication/authentication.service";
import { AccountService } from "../../account/account.service";
import { Account } from "../../account/account";
import { EmailService } from "../../email/email.service";
import { Subscription } from "rxjs";
import { SpinnerComponent } from "../../spinner/spinner.component";
import { HintService } from "../../hint/hint.service";

@Component({
  selector: "app-me-verify",
  imports: [HeaderComponent, SpinnerComponent],
  templateUrl: "./verify.component.html",
  styleUrl: "./verify.component.scss",
})
export class VerifyComponent implements OnInit, OnDestroy {
  authenticationService = inject(AuthenticationService);
  accountService = inject(AccountService);
  emailService = inject(EmailService);
  hintService = inject(HintService);

  account?: Account;
  loading = false;
  countdownSeconds = 0;
  subscription = new Subscription();

  get email(): string {
    return this.account?.email || "";
  }

  ngOnInit() {
    this.loadProfile();
    this.subscription.add(
      this.emailService.verificationEmailCooldown$.subscribe((countdown) => {
        this.countdownSeconds = Math.ceil(countdown / 1000);
        this.loading = countdown > 0;
      }),
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  async loadProfile() {
    const username = this.authenticationService.getUsername();
    if (!username) return;
    this.account = await this.accountService.fetchAccount(username);
  }

  async sendEmail() {
    try {
      this.loading = true;
      await this.emailService.requestVerificationEmail();
      this.hintService.showHint("Verification email sent", 4000);
    } catch (error: any) {
      this.loading = false;
      alert(error.message);
    }
  }
}
