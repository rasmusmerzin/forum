import { inject, Injectable } from "@angular/core";
import { API_URL } from "../app.properties";
import { AuthenticationService } from "../authentication/authentication.service";

@Injectable({
  providedIn: "root",
})
export class FavoriteService {
  url = new URL("/favorite/", API_URL);
  authenticationService = inject(AuthenticationService);

  async favoritePost(id: string): Promise<void> {
    const url = new URL(`post/${id}`, this.url);
    const response = await fetch(url, {
      method: "POST",
      headers: this.authenticationService.headers(),
    });
    if (!response.ok)
      throw new Error((await response.text()) || "Failed to favorite post");
  }

  async unfavoritePost(id: string): Promise<void> {
    const url = new URL(`post/${id}`, this.url);
    const response = await fetch(url, {
      method: "DELETE",
      headers: this.authenticationService.headers(),
    });
    if (!response.ok)
      throw new Error((await response.text()) || "Failed to unfavorite post");
  }
}
