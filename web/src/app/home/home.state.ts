import { signal } from "@angular/core";

export type HomeView = "following" | "popular" | "latest";

export const homeView = signal<HomeView>("popular");
