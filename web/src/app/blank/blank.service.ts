import { inject, Injectable } from "@angular/core";
import { Router } from "@angular/router";

@Injectable({
  providedIn: "root",
})
export class BlankService {
  router = inject(Router);

  async refresh() {
    const { pathname } = location;
    await this.router.navigate(["blank"], { replaceUrl: true });
    await this.router.navigateByUrl(pathname, { replaceUrl: true });
  }
}
