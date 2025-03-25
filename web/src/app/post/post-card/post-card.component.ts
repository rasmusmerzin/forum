import { Component, Input } from "@angular/core";

@Component({
  selector: "app-post-card",
  imports: [],
  templateUrl: "./post-card.component.html",
  styleUrl: "./post-card.component.scss",
})
export class PostCardComponent {
  @Input()
  username = "";
  @Input()
  content = "";
}
