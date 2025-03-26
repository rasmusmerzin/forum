import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class DraftService {
  private content = "";

  constructor() {
    const draft = sessionStorage.getItem("draft");
    if (draft) this.content = draft;
  }

  getContent(): string {
    return this.content;
  }

  setContent(content: string): void {
    this.content = content;
    sessionStorage.setItem("draft", content);
  }

  clearContent(): void {
    this.content = "";
    sessionStorage.removeItem("draft");
  }
}
