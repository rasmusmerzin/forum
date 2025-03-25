import { Component } from "@angular/core";

@Component({
  selector: "app-post-header",
  imports: [],
  templateUrl: "./header.component.html",
  styleUrl: "./header.component.scss",
})
export class HeaderComponent {
  onBackClick() {
    history.back();
  }
}
