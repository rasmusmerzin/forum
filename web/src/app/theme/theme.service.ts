import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class ThemeService {
  barColorMeta: HTMLMetaElement;
  defaultBarColor: string;
  barColorStack: [symbol, string][] = [];

  constructor() {
    this.barColorMeta = document.querySelector('meta[name="theme-color"]')!;
    this.defaultBarColor = this.barColorMeta.content;
  }

  getPrimaryColor(): string {
    const style = getComputedStyle(document.documentElement);
    return style.getPropertyValue("--primary");
  }

  registerBarColor(theme: string): symbol {
    const symbol = Symbol();
    this.barColorStack.push([symbol, theme]);
    this.syncBarColor();
    return symbol;
  }

  unregisterBarColor(symbol: symbol): void {
    this.barColorStack = this.barColorStack.filter(([s]) => s !== symbol);
    this.syncBarColor();
  }

  private syncBarColor(): void {
    if (this.barColorStack.length) {
      const [_, theme] = this.barColorStack[this.barColorStack.length - 1];
      this.barColorMeta.content = theme;
    } else this.barColorMeta.content = this.defaultBarColor;
  }
}
