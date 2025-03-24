import { signal } from "@angular/core";

export type HomeView = "hot" | "new";

export const homeView = signal<HomeView>("hot");
