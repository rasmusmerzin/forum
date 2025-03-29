import { Component, inject } from "@angular/core";
import { HeaderComponent } from "./header/header.component";
import { ActivatedRoute } from "@angular/router";
import { HeaderCardComponent } from "./header-card/header-card.component";

@Component({
  selector: "app-user",
  imports: [HeaderComponent, HeaderCardComponent],
  templateUrl: "./user.component.html",
  styleUrl: "./user.component.scss",
})
export class UserComponent {
  route = inject(ActivatedRoute);
  username = this.route.snapshot.params["username"];
}
