import { isDevMode } from "@angular/core";

export const API_URL = isDevMode()
  ? "http://localhost:8080"
  : "https://merzin-forum.fly.dev";

export const THEME_COLOR = "#08f";
