import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class ThemeService {
  private defaultBarColor = "";
  private barColorStack: [symbol, string][] = [];

  getPrimaryColor(): string {
    const style = getComputedStyle(document.documentElement);
    return style.getPropertyValue("--primary");
  }

  getPrimaryForegroundColor(): string {
    const style = getComputedStyle(document.documentElement);
    return style.getPropertyValue("--primary-foreground");
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
    const meta = this.getBarColorMeta();
    if (this.barColorStack.length) {
      const [_, theme] = this.barColorStack[this.barColorStack.length - 1];
      meta.content = theme;
    } else meta.content = this.defaultBarColor;
  }

  private getBarColorMeta(): HTMLMetaElement {
    const meta = document.querySelector(
      'head > meta[name="theme-color"]',
    ) as HTMLMetaElement;
    if (!this.defaultBarColor) this.defaultBarColor = meta.content;
    return meta;
  }
}
