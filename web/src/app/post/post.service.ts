import { inject, Injectable } from "@angular/core";
import { API_URL } from "../app.properties";
import { Post } from "./post";
import { AuthenticationService } from "../authentication/authentication.service";

@Injectable({
  providedIn: "root",
})
export class PostService {
  url = new URL("/post/", API_URL);
  authenticationService = inject(AuthenticationService);

  async createPost(content: string): Promise<Post> {
    const url = new URL("/post", this.url);
    const response = await fetch(url, {
      method: "POST",
      headers: this.authenticationService.headers({
        "Content-Type": "application/json",
      }),
      body: JSON.stringify({ content }),
    });
    if (!response.ok)
      throw new Error((await response.text()) || "Failed to create post");
    return response.json();
  }

  async deletePost(id: string): Promise<void> {
    const url = new URL(id, this.url);
    const response = await fetch(url, {
      method: "DELETE",
      headers: this.authenticationService.headers(),
    });
    if (!response.ok)
      throw new Error((await response.text()) || "Failed to delete post");
  }

  async fetchPost(id: string): Promise<Post> {
    const url = new URL(id, this.url);
    const response = await fetch(url);
    if (!response.ok) throw new Error(await response.text());
    return response.json();
  }

  async fetchNewPosts(before?: string | Date): Promise<Post[]> {
    let url = new URL("list/new", this.url).href;
    if (before) url += `?before=${new Date(before).toISOString()}`;
    const response = await fetch(url);
    if (!response.ok) throw new Error(await response.text());
    return response.json();
  }

  async fetchUserPosts(
    username: string,
    before?: string | Date,
  ): Promise<Post[]> {
    let url = new URL(`list/user/${username}`, this.url).href;
    if (before) url += `?before=${new Date(before).toISOString()}`;
    const response = await fetch(url);
    if (!response.ok) throw new Error(await response.text());
    return response.json();
  }
}
