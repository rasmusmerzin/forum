import { Component, inject, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { EmailService } from "../email/email.service";
import { SpinnerComponent } from "../spinner/spinner.component";

@Component({
  selector: "app-verify",
  imports: [SpinnerComponent],
  templateUrl: "./verify.component.html",
  styleUrl: "./verify.component.scss",
})
export class VerifyComponent implements OnInit {
  activatedRoute = inject(ActivatedRoute);
  emailService = inject(EmailService);
  router = inject(Router);

  id = this.activatedRoute.snapshot.params["id"];
  title = "Verifying email";
  loading = true;
  error = "";

  async ngOnInit() {
    try {
      this.loading = true;
      await this.emailService.verifyEmail(this.id);
      this.title = "Verification complete!";
    } catch (error: any) {
      this.error = error.message;
      this.title = "Verification failed";
    } finally {
      this.loading = false;
    }
  }

  continue() {
    this.router.navigate(["/"], { replaceUrl: true });
  }
}
