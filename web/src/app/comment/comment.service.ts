import { inject, Injectable } from "@angular/core";
import { API_URL } from "../app.properties";
import { AuthenticationService } from "../authentication/authentication.service";
import { Comment } from "./comment";

@Injectable({
  providedIn: "root",
})
export class CommentService {
  private url = new URL("/comment/", API_URL);
  private authenticationService = inject(AuthenticationService);

  async createComment(postId: string, content: string): Promise<Comment> {
    const url = new URL("/comment", this.url);
    const response = await fetch(url, {
      method: "POST",
      headers: this.authenticationService.headers({
        "Content-Type": "application/json",
      }),
      body: JSON.stringify({ postId, content }),
    });
    if (!response.ok)
      throw new Error((await response.text()) || "Failed to create comment");
    return response.json();
  }

  async deleteComment(id: string): Promise<void> {
    const url = new URL(id, this.url);
    const response = await fetch(url, {
      method: "DELETE",
      headers: this.authenticationService.headers(),
    });
    if (!response.ok)
      throw new Error((await response.text()) || "Failed to delete comment");
  }

  async fetchPostComments(postId: string, after?: string): Promise<Comment[]> {
    let url = new URL(`list/post/${postId}`, this.url).href;
    if (after) url += `?after=${after}`;
    const response = await fetch(url, {
      headers: this.authenticationService.headers(),
    });
    if (!response.ok) throw new Error(await response.text());
    return response.json();
  }

  async fetchUserComments(
    username: string,
    before?: string,
  ): Promise<Comment[]> {
    let url = new URL(`list/user/${username}`, this.url).href;
    if (before) url += `?before=${before}`;
    const response = await fetch(url, {
      headers: this.authenticationService.headers(),
    });
    if (!response.ok) throw new Error(await response.text());
    return response.json();
  }
}
