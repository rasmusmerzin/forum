import { Component, Input, model } from "@angular/core";

@Component({
  selector: "app-tabs",
  imports: [],
  templateUrl: "./tabs.component.html",
  styleUrl: "./tabs.component.scss",
})
export class TabsComponent {
  @Input()
  tabs = <string[]>[];
  selected = model("");

  select(tab: string) {
    this.selected.set(tab);
  }
}
