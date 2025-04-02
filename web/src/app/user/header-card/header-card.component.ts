import { Component, inject, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { SpinnerComponent } from "../../spinner/spinner.component";
import { Account } from "../../account/account";
import { AccountService } from "../../account/account.service";

@Component({
  selector: "app-user-header-card",
  imports: [SpinnerComponent],
  templateUrl: "./header-card.component.html",
  styleUrl: "./header-card.component.scss",
})
export class HeaderCardComponent implements OnInit {
  route = inject(ActivatedRoute);
  accountService = inject(AccountService);
  username = this.route.snapshot.params["username"];
  loading = true;
  account?: Account;

  get fullName(): string {
    return `${this.account?.firstName || ""} ${this.account?.lastName || ""}`;
  }
  get bio(): string {
    return this.account?.bio || "";
  }
  get email(): string {
    return this.account?.email || "";
  }
  get emailVerified(): boolean {
    return this.account?.emailVerified || false;
  }

  ngOnInit() {
    this.loadProfile();
  }

  async loadProfile() {
    try {
      this.loading = true;
      this.account = await this.accountService.fetchAccount(this.username);
    } catch (error: any) {
      console.error(error);
    } finally {
      this.loading = false;
    }
  }
}
